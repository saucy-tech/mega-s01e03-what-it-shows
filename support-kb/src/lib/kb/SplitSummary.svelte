<script lang="ts">
  import reports from '#lib/data/reports-4471.json';
  import notes from '#lib/data/desk-notes.json';
  import { groupByCause, readAs, uniqueById, type Report } from '#lib/kb/causes';
  import { tenantOf } from '#lib/kb/locales';

  const merged = uniqueById(reports as Report[]).filter(r => r.mergedInto === 4471);
  const groups = groupByCause(merged, tenantOf);
  const tickets = {
    parser: { number: 1, outcome: 'Fixed: parse dd/mm for EU locales' },
    hint: { number: 2, outcome: "Won’t fix: booking-v3 form retired" }
  };
</script>

<p><strong>{merged.length}</strong> unique reports; <strong>{groups.length}</strong> causes. The export contains {reports.length - merged.length} repeated rows with identical report IDs and content.</p>

<table>
  <caption>Reports filed under #4471, classified by the desk’s exported logic</caption>
  <thead><tr><th scope="col">Problem</th><th scope="col">Reports</th><th scope="col">Ticket</th><th scope="col">Engineering outcome</th></tr></thead>
  <tbody>
    {#each groups as group (group.cause)}
      {#if group.cause !== 'unplaced'}
        {@const ticket = tickets[group.cause]}
        <tr>
          <th scope="row">{group.cause}</th>
          <td>{group.reports.length}</td>
          <td><a href={`https://github.com/saucy-tech/mega-s01e03-what-it-shows/issues/${ticket.number}`}>#{ticket.number}</a></td>
          <td>{ticket.outcome}</td>
        </tr>
      {/if}
    {/each}
  </tbody>
</table>

{#each groups as group (group.cause)}
  {@const moved = readAs(group, notes.oneDayMove)}
  {#if moved}
    <p>{moved} reports read as a one-day move. The desk files them under <code>{group.cause}</code> by tenant; they are included in that count, not added to it.</p>
    <p class="ids">{group.reports.filter(r => notes.oneDayMove.includes(r.id)).map(r => r.id).sort().join(', ')}</p>
  {/if}
{/each}

<style>
  caption { text-align: left; font-weight: 600; margin-bottom: 0.5rem; }
  .ids { font: 0.85rem var(--mono); overflow-wrap: anywhere; color: var(--muted); }
</style>
