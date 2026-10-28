import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { groupByCause, uniqueById, readAs } from '../support-kb/src/lib/kb/causes.ts';

const data = new URL('../support-kb/src/lib/data/', import.meta.url);
const read = async path => JSON.parse(await readFile(new URL(path, data), 'utf8'));
const reports = await read('reports-4471.json');
const notes = await read('desk-notes.json');
const tenants = await Promise.all((await readdir(new URL('tenants/', data))).filter(p => p.endsWith('.json')).map(p => read(`tenants/${p}`)));
const tenantByHandle = new Map(tenants.map(t => [t.handle, t]));
const unique = uniqueById(reports).filter(r => r.mergedInto === 4471);
const unknown = unique.filter(r => !tenantByHandle.has(r.tenant));
if (unknown.length) throw new Error('Reports with missing tenants: ' + unknown.map(r => r.id));
const duplicates = reports.filter((r,i) => reports.findIndex(x => x.id === r.id) !== i);
if (duplicates.some(r => reports.filter(x => x.id === r.id).some(x => JSON.stringify(x) !== JSON.stringify(r)))) throw new Error('Conflicting duplicate IDs');
const result = {
  source: 'support-kb/src/lib/data/reports-4471.json',
  grain: 'one unique report id merged into #4471',
  exported: '2026-10-04',
  rawRows: reports.length,
  uniqueReports: unique.length,
  identicalDuplicateRows: duplicates.length,
  missingTenants: unknown.length,
  groups: groupByCause(unique, r => tenantByHandle.get(r.tenant)).map(g => ({
    cause: g.cause, count: g.reports.length, taggedAs: g.taggedAs,
    oneDayMove: readAs(g, notes.oneDayMove),
    byTenant: Object.fromEntries(tenants.map(t => [t.handle, g.reports.filter(r => r.tenant === t.handle).length]).filter(([,n]) => n)),
    reportIds: g.reports.map(r => r.id).sort()
  }))
};
if (result.groups.reduce((n,g) => n+g.count,0) !== unique.length) throw new Error('Groups do not reconcile');
const out = new URL('../evidence/', import.meta.url);
await mkdir(out, { recursive: true });
await writeFile(new URL('report-groups.json',out), JSON.stringify(result,null,2)+'\n');
for (const group of result.groups) await writeFile(new URL(`${group.cause}-report-ids.txt`,out),group.reportIds.join('\n')+'\n');
console.log(JSON.stringify({...result,groups:result.groups.map(({reportIds,...g})=>g)},null,2));
