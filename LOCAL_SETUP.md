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

Google photorealistic 3D, enhanced terrain, voice and various provider upgrades
require their own accounts or credentials. None were configured during setup.
The local launcher does not automatically reuse the desktop Codex sign-in for
voice. No provider credentials are committed or embedded in this build.

## Railway deployment

The password-protected website is deployed and healthy:
https://gods-eye-view-production-cd78.up.railway.app/

Project dashboard:
https://railway.com/project/c655da1b-0838-4d3a-9de7-fe90865cd635

Deployment `85eb334c-70a4-4568-a73e-dcf215ee5af4` serves application revision
`f670295c`, including the public map-provider build arguments. Health and
password-protection checks passed after deployment. The repository was uploaded using Railway CLI; GitHub automatic
deployment is not connected. Later documentation commits do not change the
currently deployed application.

The username is `gev`. The generated password was handed off in the private
local `outputs/Website access.txt` file outside this repository. It is also
stored in the ignored `.local/railway.password` file. It is not in GitHub.

The hosted server serves built assets and the original provider middleware
behind HTTP Basic authentication. The server refuses to start without a
`GEV_HTTP_PASSWORD` of at least 20 characters. Only the exact `/healthz` readiness
route is public. Railway supplies HTTPS and the allowed public hostname.
Desktop Codex credentials are not reused for voice.

The service's saved Railway settings explicitly select
`deploy/Dockerfile.railway`, `node deploy/start-railway.mjs`, and `/healthz`.
It runs one replica, capped at 0.5 GB RAM and 0.5 vCPU, with sleeping enabled.
The legacy `railway.json` is supplemental; Railway has announced support ending
December 1, 2026, so future deployment maintenance should migrate that file.

## Verified on October 27, 2026

- Railway deployment succeeded and `/healthz` returned HTTP 200.
- Homepage and flight API returned HTTP 401 without the password.
- Authenticated homepage returned HTTP 200; Chrome sign-in and imagery rendered.
- Chrome tracked a live aircraft and showed nearby ADS-B flight contacts.
- The global OpenSky `/api/flights` request returned HTTP 502; server logs showed
  upstream timeouts. Nearby adsb.lol contacts still loaded. AIS vessels were
  unavailable, and terrain-height refreshes were incomplete. Availability of
  each upstream layer is independent of the website's health.
- Production build passed. Full test commands passed: 8,810 tests passed,
  2 skipped, 0 failed, including allocation probes and new authentication tests.
- Google photorealistic 3D and voice have not been configured.

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

The upstream server remains an exploratory development/preview server. The
password protects this hosted instance; upstream cross-site and credential
protections remain intact. Some key-bearing endpoints deliberately reject
reverse-proxy requests. Enabling paid providers remotely needs a separate
review of their quotas and upstream sharing constraints.

## Connecting Google 3D

Google 3D remains unconfigured. For this personal project, the preferred next
step is Cesium ion Community: it includes 1,000 Google Photorealistic 3D root
tiles per month for eligible individual personal/non-commercial use. It also
has other quotas, including 15 GB streaming per month. No active Cesium browser
session was present; no new account, terms, token, or subscription was created.
See https://cesium.com/platform/cesium-ion/pricing/ for current eligibility.

After the user completes account/terms approval, use a public `assets:read`
token restricted to this website and the required assets. Set Railway
`CESIUM_ION_TOKEN`, then rebuild/redeploy. This route does not require enabling
direct Google Cloud billing. Google place search and Street View are separate.

The alternative direct integration needs Google Cloud billing, Map Tiles API
(`tile.googleapis.com`), and a browser API key restricted to that API and:
`https://gods-eye-view-production-cd78.up.railway.app/*`.
Do not reuse a server-only or unrelated project key. Set Railway
`GOOGLE_MAPS_API_KEY`, then rebuild/redeploy. Current Google pricing lists
1,000 free root requests/month, then $6 per 1,000 at the first paid tier;
allowances aggregate at billing-account level. A root session can support
three hours of rendering. New Google billing has not been approved.

The dedicated Dockerfile declares both public credentials as build arguments;
runtime-only variables cannot alter an already-built browser bundle. Provider
restrictions are necessary because these credentials are intentionally public.
Server-only keys and the website password must never be build arguments.
Dummy-marker builds verified both public values reach the browser bundle,
while a server-only Google marker does not.

On October 27, no relevant credentials were found in Railway, project dotenv
files, shell environment, or documented Google Maps Keychain entries. The
personal Jacob Culver Google account was verified. The new empty project
`gods-eye-view-512921` was automatically linked to existing billing when created;
that link was immediately removed. The Cloud console now explicitly shows
**Billing is disabled**. No Map Tiles API, API key, or workload was created.
Other projects were not changed. The detailed audit and proof are in the
workspace's local `outputs` folder, outside this repository.

Sources: https://developers.google.com/maps/documentation/tile/get-api-key,
https://developers.google.com/maps/documentation/tile/usage-and-billing,
https://developers.google.com/maps/billing-and-pricing/pricing,
https://docs.railway.com/builds/dockerfiles.

## Licenses

Source code is MIT, copyright Bilawal Sidhu. Bundled data, imagery and models
retain separate terms, including noncommercial restrictions. See `LICENSE`,
`DATA_SOURCES.md` and the model/media attribution files before commercial use.
