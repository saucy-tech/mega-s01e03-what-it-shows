The desk’s exported view assigns **33 unique reports from #4471** to the booking-v3 date hint problem.

Booking-v3 prints `MM/DD/YYYY` beneath the date field while the form reads the tenant’s day-first format. This differs from the shared parser problem and needs its own ticket.

The affected reports use channel `form` at alder.physio (12), copper.studio (11) and pale.harbour (10). Classification follows `causeOf` in `support-kb/src/lib/kb/causes.ts`, using the tenant directory, not intake’s browser-locale guess.

Count one report ID once: `uniqueById`, filter `mergedInto === 4471`, then `groupByCause`.
The full report IDs are in [evidence/hint-report-ids.txt](https://github.com/saucy-tech/mega-s01e03-what-it-shows/blob/main/evidence/hint-report-ids.txt), with reproducible counts in `evidence/report-groups.json` and `scripts/analyze.mjs`.

The live [engineering update](https://hq.mega.dev/challenges/what-it-shows), checked 2026-10-28, says #4471 closed on 2026-10-05: hint WON’T FIX because the booking-v3 form was retired. The hint was not corrected.

Signed kb page: [source](https://github.com/saucy-tech/mega-s01e03-what-it-shows/blob/main/support-kb/src/routes/kb/incidents/4471-split/%2Bpage.svx) · [rendered desk page](https://github.com/saucy-tech/mega-s01e03-what-it-shows/blob/main/support-kb/rendered/4471-split.html).
