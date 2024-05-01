<!-- Card.svelte -->
<!-- This is the card component that will be used to display the events in the events page -->

<script lang="ts">
  import type { SBEvent } from "$lib/types/models";
  export let event: SBEvent | null = null;
</script>

{#if event}
  <!-- Clicking on this event card takes you to a detailed event view -->
  <a href="/events/{event.EventID}/Overview" class="inline-flex h-32">
    <div class="ring-1 ring-black/10 rounded-lg overflow-hidden shadow-md flex">
      <!-- Event Banner  -->
      <div class="basis-2/5 h-full">
        <img class="w-full h-full" src="../../aerial_2.jpg" alt="Scenery" />
      </div>

      <!-- Text section for card -->
      <div class="basis-3/5 flex flex-col">
        <p class="pt-1 px-2 font-semibold">{event.Name}</p>
        <p class="pt-1 px-2 text-xs">
          From {event.StartsAt} to {event.EndsAt}
        </p>
        <p class="pt-2 px-2 overflow-hidden text-sm">
          {event.Description}
        </p>
      </div>
    </div>
  </a>
{/if}
