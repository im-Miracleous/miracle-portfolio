import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json({ limit: '100kb' }));

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const contactRateLimit = new Map();

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function isRateLimited(ip) {
  const now = Date.now();
  const entry = contactRateLimit.get(ip);

  if (!entry || now > entry.resetAt) {
    contactRateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  entry.count += 1;
  return false;
}

function createMailTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.replace(/\s+/g, '');

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/contact', async (req, res) => {
  const { name, email, message, website } = req.body ?? {};

  // Honeypot check: silently accept bot submissions without sending mail
  if (typeof website === 'string' && website.trim().length > 0) {
    return res.status(200).json({
      success: true,
      message: 'Thanks for reaching out! Your message has been received.',
    });
  }

  const clientIp = req.ip || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({
      success: false,
      message: 'Too many messages sent. Please wait a few minutes before trying again.',
    });
  }

  const errors = {};

  const trimmedName = typeof name === 'string' ? name.trim() : '';
  const trimmedEmail = typeof email === 'string' ? email.trim() : '';
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  if (trimmedName.length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  } else if (trimmedName.length > 100) {
    errors.name = 'Name must be 100 characters or fewer.';
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (trimmedMessage.length < 10) {
    errors.message = 'Please enter a message (at least 10 characters).';
  } else if (trimmedMessage.length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Please fix the highlighted fields.',
      errors,
    });
  }

  const transporter = createMailTransporter();
  if (!transporter) {
    console.warn('[contact:warn] SMTP_USER or SMTP_PASS is not configured.');
    return res.status(503).json({
      success: false,
      message: 'Email service is not configured yet. Please email me directly instead.',
    });
  }

  const submission = {
    id: `msg_${Date.now()}`,
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
    receivedAt: new Date().toISOString(),
  };

  const smtpUser = process.env.SMTP_USER.trim();
  const fromName = process.env.CONTACT_FROM_NAME?.trim() || 'Miracle Portfolio';
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || smtpUser;

  try {
    await transporter.sendMail({
      from: `"${fromName}" <${smtpUser}>`,
      to: toEmail,
      replyTo: `"${trimmedName.replaceAll('"', '')}" <${trimmedEmail}>`,
      subject: `[miracleous.my.id] New message from ${trimmedName}`,
      text: [
        `New contact message from your portfolio`,
        ``,
        `Name: ${trimmedName}`,
        `Email: ${trimmedEmail}`,
        `Received: ${submission.receivedAt}`,
        ``,
        `Message:`,
        trimmedMessage,
      ].join('\n'),
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; color: #18181b;">
          <h2 style="margin-bottom: 12px; font-size: 18px;">Inquiry</h2>
          <p style="margin: 4px 0;"><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
          <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(trimmedEmail)}">${escapeHtml(trimmedEmail)}</a></p>
          <p style="margin: 4px 0 16px;"><strong>Received:</strong> ${escapeHtml(submission.receivedAt)}</p>
          <div style="padding: 14px; border-radius: 8px; background: #f4f4f5; white-space: pre-wrap; line-height: 1.5;">${escapeHtml(trimmedMessage)}</div>
        </div>
      `,
    });

    console.log('[contact:sent]', JSON.stringify({ id: submission.id, email: submission.email, receivedAt: submission.receivedAt }));

    return res.status(200).json({
      success: true,
      message: 'Thanks for reaching out! Your message has been sent.',
      data: {
        id: submission.id,
        receivedAt: submission.receivedAt,
      },
    });
  } catch (error) {
    console.error('[contact:error]', error);
    return res.status(500).json({
      success: false,
      message: 'Unable to send message right now. Please try again later or copy my email directly.',
    });
  }
});

// Serve built React frontend in production if client/dist exists
const clientDistPath = path.resolve(__dirname, '..', 'client', 'dist');
if (fs.existsSync(clientDistPath)) {
  app.use(express.static(clientDistPath));
  app.get('/{*splat}', (req, res, next) => {
    if (req.path.startsWith('/api/')) {
      return next();
    }
    return res.sendFile(path.join(clientDistPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
