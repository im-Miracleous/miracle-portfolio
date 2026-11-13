FROM node:22-alpine AS client-builder
WORKDIR /app/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY server/package*.json ./server/
RUN cd server && npm ci --omit=dev

COPY server/ ./server/
COPY --from=client-builder /app/client/dist ./client/dist

RUN chown -R node:node /app
USER node

EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + (process.env.PORT || 5000) + '/api/health').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "server/index.js"]
