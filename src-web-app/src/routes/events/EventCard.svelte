<!-- Card.svelte -->
<!-- This is the card component that will be used to display the events in the events page -->

<script lang="ts">
  import type { SBEvent } from "$lib/types/models";

  export let index = 1;

  export let event: SBEvent | null = null;
</script>

{#if event}
  <!-- Clicking on this event card takes you to a detailed event view -->
  <a href="/events/{event.EventID}/Overview" class="inline-flex h-32">
    <div class="ring-1 ring-black/10 rounded-lg shadow-md flex flex-column grow-0" class:mr-[10%]={index % 2 != 0} class:ml-[10%]={index % 2 == 0}>
      <!-- Event Banner  -->
      <div class="w-[40%] h-full">
        <img class="h-[100%] w-[100%]" style="border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery" />
      </div>

      <!-- Text section for card -->
      <div class="flex flex-col w-2/3 overflow-hidden h-full grow-0 shrink-0">
        <p class="pt-1 px-2 font-semibold">{event.Name}</p>
        <p class="pt-1 px-2" style="font-size: 12px;">
          From {event.StartsAt} to {event.EndsAt}
        </p>
        <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;">
          {event.Description}
        </p>
      </div>
    </div>
  </a>
{/if}
