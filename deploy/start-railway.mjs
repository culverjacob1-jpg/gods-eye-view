import { preview } from 'vite';
import { fileURLToPath } from 'node:url';
const port = Number(process.env.PORT || 8080);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
const server = await preview({
  configFile: fileURLToPath(new URL('./railway.vite.config.mjs', import.meta.url)),
  preview: { host: process.env.GEV_BIND_HOST || '0.0.0.0', port, strictPort: true },
});
for (const signal of ['SIGTERM', 'SIGINT']) process.once(signal, () => server.httpServer.close(() => process.exit(0)));
