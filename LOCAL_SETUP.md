# Your God's Eye View setup

This fork preserves Bilawal Sidhu's original project and attribution.
The exact upstream repository was verified directly in the description of
https://www.youtube.com/watch?v=PBThLgs2AZc on October 27, 2026.

- Upstream: https://github.com/bilawalsidhu/gods-eye-view
- Starting revision: `15de9d738c4a85be1a96726c6114181caef87eeb`
- Your fork: https://github.com/culverjacob1-jpg/gods-eye-view
- Local website: http://127.0.0.1:4173/

## Start on this Mac

Double-click **Start God’s Eye View.command** in this folder. Keep its Terminal
window open while using the website. Press Control-C in that window to stop it.
The launcher uses the checkout-local Node 24 runtime and binds only to this Mac.
If the port is already occupied, it stops rather than moving to another port.

A Node 24.22.1 Apple Silicon runtime was downloaded from nodejs.org and verified
against its published SHA-256 checksum. It lives in `.local/node/`, excluded
from Git and container uploads. Dependencies are installed in `node_modules/`.
On another computer, install the supported Node version documented upstream,
then run `npm ci` and `npm run dev`.

## Available without provider keys

The keyless satellite-imagery globe and USGS earthquake markers were visually
verified in the browser. The app includes public aircraft, satellite, weather,
camera, radio and other sources, but individual sources can be delayed, limited,
or unavailable. Treat each layer's status as the authority for that session.
FIRMS active fires showed unavailable during the initial browser check.

Google photorealistic 3D, enhanced terrain, voice and various provider upgrades
require their own accounts or credentials. None were configured during setup.
The local launcher does not automatically reuse the desktop Codex sign-in for
voice. No provider credentials are committed or embedded in this build.

## Railway preparation

Railway is a suitable persistent Node host for the project's server-side feeds.
A static-only host would omit those routes. `railway.json` selects the dedicated
container recipe and `/healthz` readiness endpoint. The hosted server serves
built assets with the original provider middleware, behind HTTP Basic auth.

Before deployment, set a long random `GEV_HTTP_PASSWORD` (at least 20 characters)
as a Railway secret. The username is `gev`. The server refuses to start without
this password. Railway supplies `PORT` and `RAILWAY_PUBLIC_DOMAIN`; the latter
is used as the exact allowed hostname. Deploy behind Railway's HTTPS endpoint.
Do not set `GEV_BIND_HOST` on Railway; it exists only for local verification.

An empty Railway project/service has been prepared, with no active deployment:
https://railway.com/project/c655da1b-0838-4d3a-9de7-fe90865cd635

Hosting consumes metered CPU, RAM and egress. The existing account is Pro, with
$20 included monthly usage; the account showed $2.94 used on October 27, 2026.
This is shared with existing projects and is not a guarantee of zero additional
charges. No billed workload was started during initial preparation.
Railway's hard spending limit is workspace-wide and can stop unrelated services,
so no account-wide limit was changed.

The upstream server remains an exploratory development/preview server. The
password gate protects the entire hosted instance; upstream cross-site and
credential protections remain intact. Some key-bearing endpoints deliberately
reject reverse-proxy requests. Enabling paid providers remotely needs a separate
review of their quotas and upstream sharing constraints.

## Licenses

Source code is MIT, copyright Bilawal Sidhu. Bundled data, imagery and models
retain separate terms, including noncommercial restrictions. See `LICENSE`,
`DATA_SOURCES.md` and the model/media attribution files before commercial use.
