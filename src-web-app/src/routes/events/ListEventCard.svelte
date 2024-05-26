<!-- Card.svelte -->
<!-- This is the card component that will be used to display the events in the events page -->

<script lang="ts">
  import BannerLayout from "../banner-layout.svelte";

  // Props
  export let Name: string = "";
  export let StartsAt: string = "";
  export let EndsAt: string = "";
  export let Description: string = "";
  export let EventID: string = ""; 
  export let BannerURL: string = "";
  export let index = 1;
</script>
<!-- Clicking on this event card takes you to a detailed event view -->
<!-- Card for the events in the category page.  clicking on a card takes you to a detailed event view -->
<a href="/events/id/{EventID}/Overview" class="flex flex-row drop-shadow-xl w-full">
  <!-- Image for card -->
  <div class = "w-[40%] h-full flex-shrink-0">
    <img class="aspect-w-9 aspect-h-5 h-[100%] w-[100%]" loading="lazy" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="{BannerURL}" alt="{BannerURL}">
  </div>
  <!-- Text section for card -->
  <div class="flex flex-col h-full w-full card-border flex-grow-0 overflow-hidden">
    <p class = "pt-1 px-2 font-semibold">{Name}</p>
    <p class = "pt-1 px-2" style="font-size: 12px;">{StartsAt} to {EndsAt}</p>
    <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> {Description}</p>
  </div>
</a>


<style>
  .card-border {
    box-sizing: border-box;
    background: #ffffff;
    border: 0.5px solid #c7c7cd;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>
