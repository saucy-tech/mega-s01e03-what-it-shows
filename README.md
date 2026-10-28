# S01E03 · what it shows

Fresh work for [MEGA.dev S01E03](https://hq.mega.dev/challenges/what-it-shows).
The support desk merged two date problems into #4471. This repo separates their reports and records the engineering outcomes.

- [Signed kb page (.svx)](support-kb/src/routes/kb/incidents/4471-split/+page.svx)
- [Rendered desk page (standalone HTML)](support-kb/rendered/4471-split.html) — download and open in a browser
- [Parser ticket](https://github.com/saucy-tech/mega-s01e03-what-it-shows/issues/1): 379 reports
- [Hint ticket](https://github.com/saucy-tech/mega-s01e03-what-it-shows/issues/2): 33 reports
- [Reproducible report groups and report IDs](evidence/report-groups.json)

## Sources and limits

`support-kb/src/` starts from the course’s supplied 2026-10-04 export.
Its accepted decisions, classification logic and data are preserved. The added page and `SplitSummary` component use the original logic.
The live engineering update, read on 2026-10-28, says #4471 closed on 2026-10-05:
parser fixed; hint won’t fix because booking-v3 retired.

The export has 427 rows and 412 unique report IDs. Repeated IDs have identical content.
The desk files five reports read as a one-day move under parser; they are included in 379.
The page’s counts and desk reference are rendered by components, not copied into static markup.

Export: `kb-export-267efc5e.zip`, 30,743 bytes, SHA-256 `267efc5ea61aca6efaaca842160ac4d0377d56bcbf5123e61c604d6ae99597f2`.

## Reproduce

Use Node.js 22.17 or newer:

```sh
cd support-kb
npm ci --ignore-scripts
npm run analyze
npm run build
```

The build prerenders the kb and writes `support-kb/rendered/4471-split.html` with CSS inlined.
Its signature is `Brandon`; `RenderStamp` derives the visible desk reference.
