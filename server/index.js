import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '100kb' }));

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body ?? {};
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

  const submission = {
    id: `msg_${Date.now()}`,
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
    receivedAt: new Date().toISOString(),
  };

  console.log('[contact]', JSON.stringify(submission));

  return res.status(200).json({
    success: true,
    message: 'Thanks for reaching out! Your message has been received.',
    data: {
      id: submission.id,
      receivedAt: submission.receivedAt,
    },
  });
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
