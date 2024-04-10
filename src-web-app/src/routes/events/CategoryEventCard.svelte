<script lang="ts">
    // Props
    export let Name: string = '';
    export let StartsAt: string = '';
    export let EndsAt: string = '';
    export let Description: string = '';
    export let ImagePath: string = '';
    export let existsTF = false;
    export let eventID: string = '';
</script>
    

<!-- Card for the events in the category page.  clicking on a card takes you to a detailed event view -->
<a href="/events/id/{eventID}/Overview">
    <div class="flex flex-row w-[90%] drop-shadow-xl h-[130px sm:h-[120px] md:h-[125px] lg:h-[130px] xl:h-[140px]" style="">
    <!-- Image for card -->
    <div class = "w-[40%] h-full flex-shrink-0">
      <img class="aspect-w-9 aspect-h-5 h-[100%] w-[100%]" loading="lazy" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="{ImagePath}" alt="Scenery">
    </div>
    {#if existsTF}
    <!-- Text section for card -->
    <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
      <p class = "pt-1 px-2 font-semibold">{Name}</p>
      <p class = "pt-1 px-2" style="font-size: 12px;">{StartsAt} to {EndsAt}</p>
      <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> {Description}</p>
    </div>

    {:else}
    <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
      <p class = "pt-1 px-2 font-semibold">Empty</p>
    </div>
    {/if}
  </div>
</a>

<style>
    .card-border {
        box-sizing: border-box;
        background: #FFFFFF;
        border: 0.5px solid #c7c7cd;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
</style>