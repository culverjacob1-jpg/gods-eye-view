import { createHash, timingSafeEqual } from 'node:crypto';

export function createHostedGate(password) {
  if (typeof password !== 'string' || password.length < 20) {
    throw new Error('Set GEV_HTTP_PASSWORD to at least 20 characters before hosting.');
  }
  const expected = createHash('sha256').update(`gev:${password}`).digest();
  return (req, res, next) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (req.url === '/healthz' && ['GET', 'HEAD'].includes(req.method)) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
      return;
    }
    const header = String(req.headers.authorization || '');
    const supplied = header.startsWith('Basic ')
      ? Buffer.from(header.slice(6), 'base64').toString('utf8') : '';
    const actual = createHash('sha256').update(supplied).digest();
    if (!timingSafeEqual(actual, expected)) {
      res.writeHead(401, {
        'WWW-Authenticate': 'Basic realm="Gods Eye View", charset="UTF-8"',
        'Content-Type': 'text/plain',
      });
      res.end('Sign in to God\'s Eye View.');
      return;
    }
    next();
  };
}
