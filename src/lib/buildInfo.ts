// Human-readable "last changed" marker shown in the header on every page so
// it's obvious at a glance whether you're looking at a stale deploy or the
// latest one - added 2026-07-03 after a real mixup where code changes were
// correct on disk but nothing had been deployed yet, and there was no way
// to visually tell from the live site.
//
// FALLBACK_BUILD_TIME is bumped by hand whenever a change ships from Cowork
// or a local edit. If NEXT_PUBLIC_BUILD_TIME is set at build time, that wins
// automatically - to fully automate this, add to package.json's build
// script (cross-platform, works in bash or Antigravity's shell):
//   "build": "node -e \"console.log('NEXT_PUBLIC_BUILD_TIME=' + new Date().toISOString())\" > .env.build && next build"
// (left as a manual value for now rather than touching the build script
// site-unseen - see mvp-beta-plan.md)
const FALLBACK_BUILD_TIME = "2026-07-03 2:00 PM CT";

export const BUILD_TIME = process.env.NEXT_PUBLIC_BUILD_TIME || FALLBACK_BUILD_TIME;
