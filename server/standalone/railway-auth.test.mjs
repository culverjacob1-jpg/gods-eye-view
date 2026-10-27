import test from 'node:test';
import assert from 'node:assert/strict';
import { createHostedGate } from '../../deploy/railway-auth.mjs';
const password = 'local-test-only-password-123';
function run(url, authorization, method = 'GET') {
  const result = { headers: {}, passed: false };
  const response = {
    setHeader(k, v) { result.headers[k] = v; },
    writeHead(status, headers) { result.status = status; Object.assign(result.headers, headers); },
    end(body) { result.body = body; },
  };
  createHostedGate(password)({url, method, headers: {authorization}}, response, () => result.passed = true);
  return result;
}
test('hosting refuses an absent or short password', () => {
  assert.throws(() => createHostedGate(undefined));
  assert.throws(() => createHostedGate('short'));
});
test('only the health endpoint is anonymous', () => {
  assert.equal(run('/healthz').status, 200);
  for (const path of ['/', '/api/military', '/healthz?x=1', '/healthz/']) assert.equal(run(path).status, 401);
  assert.equal(run('/healthz', undefined, 'POST').status, 401);
});
test('requires correct username and password for pages and API routes', () => {
  const auth = (s) => `Basic ${Buffer.from(s).toString('base64')}`;
  assert.equal(run('/', auth(`gev:${password}`)).passed, true);
  assert.equal(run('/api/military', auth(`gev:${password}`)).passed, true);
  for (const value of ['', 'Basic !!!', auth(`wrong:${password}`), auth('gev:wrong')]) assert.equal(run('/', value).status, 401);
});
