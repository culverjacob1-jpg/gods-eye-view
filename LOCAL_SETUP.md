# Your God's Eye View setup

This fork preserves Bilawal Sidhu's original project and attribution.
The exact upstream repository was verified directly in the description of
https://www.youtube.com/watch?v=PBThLgs2AZc on October 27, 2026.

- Upstream: https://github.com/bilawalsidhu/gods-eye-view
- Starting revision: `15de9d738c4a85be1a96726c6114181caef87eeb`
- Your fork: https://github.com/culverjacob1-jpg/gods-eye-view
- Hosted website: https://gods-eye-view-production-cd78.up.railway.app/
- Local website (when the launcher is running): http://127.0.0.1:4173/

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

Google photorealistic 3D and World Terrain are now connected through a
restricted public Cesium ion token on the hosted website. Voice and other
provider upgrades remain unconfigured.
The local launcher does not automatically reuse the desktop Codex sign-in for
voice. No provider credentials are committed. The restricted public Cesium token is
intentionally embedded in the hosted browser build.

## Railway deployment

The website is configured for public access at the user’s request:
https://gods-eye-view-production-cd78.up.railway.app/

Project dashboard:
https://railway.com/project/c655da1b-0838-4d3a-9de7-fe90865cd635

Deployment `72e49dc1-73e6-4d17-ace8-09adc738acb0` serves application revision
`87cf2b53`, with public access and the restricted Cesium credential configured.
Anonymous homepage, scripts and API access were verified after deployment. The repository was uploaded using Railway CLI; GitHub automatic
deployment is not connected. Later documentation commits do not change the
currently deployed application.

The website no longer requires a username or password. `GEV_PUBLIC_ACCESS=1`
explicitly enables anonymous access to the page and its provider endpoints.
Anyone with the URL can use the site and consume shared provider allowances.
The health route and response safety headers remain. Original provider-side
cross-site checks and credential restrictions are unchanged. Desktop Codex
credentials are not reused for voice.

To restore private hosting, unset `GEV_PUBLIC_ACCESS` or set it to `0` and
redeploy with a `GEV_HTTP_PASSWORD` of at least 20 characters. Authentication
remains the default when public access is not explicitly enabled.

The service's saved Railway settings explicitly select
`deploy/Dockerfile.railway`, `node deploy/start-railway.mjs`, and `/healthz`.
It runs one replica, capped at 0.5 GB RAM and 0.5 vCPU, with sleeping enabled.
The legacy `railway.json` is supplemental; Railway has announced support ending
December 1, 2026, so future deployment maintenance should migrate that file.

## Verified on October 27, 2026

- Railway deployment succeeded and `/healthz` returned HTTP 200.
- The initial private deployment required sign-in. The user later requested
  public access; anonymous homepage and script requests now return HTTP 200
  without an authentication challenge. An API validation request reached its
  handler without credentials. Five access-mode tests passed.
- Chrome tracked a live aircraft and showed nearby ADS-B flight contacts.
- The global OpenSky `/api/flights` request returned HTTP 502; server logs showed
  upstream timeouts. Nearby adsb.lol contacts still loaded. AIS vessels were
  unavailable, and terrain-height refreshes were incomplete. Availability of
  each upstream layer is independent of the website's health.
- Production build passed. Full test commands passed: 8,810 tests passed,
  2 skipped, 0 failed, including allocation probes and new authentication tests.
- Google 3D was subsequently configured and visually verified in Austin.
  Voice remains unconfigured.

## Cost and spending controls

Hosting was started after explicit approval of Railway metered usage. A rough
planning estimate for this app is **$2–$8 per month for light personal use**,
excluding existing services. This is not a measured monthly bill or a cap;
continuous active feeds, bandwidth, and usage patterns can change it.

The Pro workspace includes $20 of shared monthly usage. At setup, Railway
reported approximately $2.94 used for the October 21–November 21 period.
The live usage-limit API reported `usageLimit: null`: **no workspace compute
hard spending cap was set**. Existing billing settings were left unchanged.
Service CPU/RAM caps and sleeping reduce resource use but do not cap dollars.
Railway's workspace hard limit can stop all projects, including unrelated ones.
See https://docs.railway.com/pricing/cost-control for current control behavior.

The upstream server remains an exploratory development/preview server. Upstream cross-site and credential
protections remain intact; the hosted access gate is now explicitly public. Some key-bearing endpoints deliberately reject
reverse-proxy requests. Enabling paid providers remotely needs a separate
review of their quotas and upstream sharing constraints.

## Google 3D through Cesium Community

Connected and visually verified on October 27, 2026. The existing personal
`culverjacob1-jpg` account's Billing page confirms Community. Its UI lists
1,000 Google Photorealistic 3D Tiles sessions and 15 GiB streaming; the public
pricing page describes monthly allowances for eligible individual personal,
non-commercial use. No paid upgrade was added.
https://cesium.com/platform/cesium-ion/pricing/

A dedicated `Gods Eye View Railway` public token has only `assets:read` and
is restricted to asset 2275207 (Google 3D), asset 1 (World Terrain), and
`https://gods-eye-view-production-cd78.up.railway.app/`.
The default token was not reused. Bing imagery, Google Places and Street View
are outside this token's scope; the presence of a token can still expose Bing
buttons in the upstream UI even though their assets are not authorized.

Railway `CESIUM_ION_TOKEN` supplies the credential to the Docker build. Its
public value is intentionally in the browser bundle; no credential is in Git.
Server-only keys and the website password must never be build arguments.
Local `.local/cesium-ion.token` is ignored, private to the local user, and
excluded from deployment uploads. The local launcher does not automatically
use it; the token only permits the hosted website's referrer.

The authorized asset endpoints returned 200, an unrelated asset returned 404,
and a request without a referrer returned 403. The deployed site showed actual
textured 3D city geometry and Google Maps attribution in Austin. Health and
anonymous access checks passed; resource settings and idle sleeping are unchanged.
See the workspace's `outputs` folder for screenshots and sanitized evidence.

Direct Google Cloud keys remain absent. No direct Google billing or API was
activated. The dedicated empty project `gods-eye-view-512921` was previously
verified with billing disabled after its automatic billing link was removed.
Other account services remain unchanged.

Token guidance: https://cesium.com/learn/ion/cesium-ion-access-tokens/
Build guidance: https://docs.railway.com/builds/dockerfiles

## Licenses

Source code is MIT, copyright Bilawal Sidhu. Bundled data, imagery and models
retain separate terms, including noncommercial restrictions. See `LICENSE`,
`DATA_SOURCES.md` and the model/media attribution files before commercial use.
