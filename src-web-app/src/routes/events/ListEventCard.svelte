<!-- Card.svelte -->
<!-- This is the card component that will be used to display the events in the events page -->
<script lang="ts">
  // Props
  export let Name: string = "";
  export let StartsAt: string = "";
  export let EndsAt: string = "";
  export let Description: string = "";

  export let index = 1;
</script>

<div class="w-[37%] pt-1 h-[25%] custom-border drop-shadow-xl flex flex-column grow-0" class:mr-[10%]={index % 2 != 0} class:ml-[10%]={index % 2 == 0}>
  <!-- Event Banner  -->
  <div class="w-[40%] h-full">
    <img class="h-[100%] w-[100%]" style="border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery" />
  </div>

  <!-- Text section for card -->
  <div class="flex flex-col w-2/3 card-border overflow-hidden h-full grow-0 shrink-0">
    <p class="pt-1 px-2 font-semibold">{Name}</p>
    <p class="pt-1 px-2" style="font-size: 12px;">
      From {StartsAt} to {EndsAt}
    </p>
    <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;">
      {Description}
    </p>
  </div>
</div>

<style>
  .card-border {
    box-sizing: border-box;
    background: #ffffff;
    border: 0.5px solid #c7c7cd;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
</style>
