import { defineConfig } from 'vite';
import standalone from '../server/standalone/vite.config.js';
import { createHostedGate } from './railway-auth.mjs';

export default defineConfig(async (context) => {
  // The hosted instance never borrows a desktop ChatGPT session.
  process.env.CODEX_AUTH_JSON = '/nonexistent/gev-no-voice-auth.json';
  const domain = process.env.RAILWAY_PUBLIC_DOMAIN;
  if (domain) process.env.GEV_ALLOWED_HOSTS = domain;
  const gate = createHostedGate(process.env.GEV_HTTP_PASSWORD);
  const config = await standalone(context);
  config.plugins.unshift({
    name: 'private-hosted-access',
    enforce: 'pre',
    configurePreviewServer(server) { server.middlewares.use(gate); },
  });
  return config;
});
