The desk’s exported view assigns **379 unique reports from #4471** to the parser problem.

The shared parser reads dates month first for tenants who write day first. The day and month swap.
Classification follows `causeOf` in `support-kb/src/lib/kb/causes.ts`, using the report’s tenant locale and form channel, not `meta.intakeTag`.

Count one report ID once: `uniqueById`, filter `mergedInto === 4471`, then `groupByCause`.
The 379 include the five reports the desk read as a one-day move: R-41202, R-41209, R-41236, R-41344 and R-41620. They are footnoted in the desk view and remain filed under parser; do not subtract them or count them twice.

The full report IDs are in [evidence/parser-report-ids.txt](https://github.com/saucy-tech/mega-s01e03-what-it-shows/blob/main/evidence/parser-report-ids.txt), with reproducible counts in `evidence/report-groups.json` and `scripts/analyze.mjs`.

The live [engineering update](https://hq.mega.dev/challenges/what-it-shows), checked 2026-10-28, says #4471 closed on 2026-10-05: parser FIXED, `fix(dates): parse dd/mm for eu locales`.

Signed kb page: [source](https://github.com/saucy-tech/mega-s01e03-what-it-shows/blob/main/support-kb/src/routes/kb/incidents/4471-split/%2Bpage.svx) · [rendered desk page](https://github.com/saucy-tech/mega-s01e03-what-it-shows/blob/main/support-kb/rendered/4471-split.html).
