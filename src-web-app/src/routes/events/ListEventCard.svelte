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
<a href="/events/id/{EventID}/Overview" class="inline-flex w-[80%] pt-1 h-[100%]">
  <div class="custom-border w-full drop-shadow-xl flex flex-column grow-0" class:mr-[10%]={index % 2 != 0} class:ml-[10%]={index % 2 == 0}>
    <!-- Event Banner  -->
    <div class="w-[40%] h-full">
      <img class="h-[100%] w-full" style="border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src={BannerURL} alt="No banner" on:error={(e) => e.target.src = '../../aerial_2.jpg'} />
    </div>

    <!-- Text section for card -->
    <div class="w-[60%] flex flex-col card-border overflow-hidden h-full grow-0 shrink-0">
      <p class="pt-1 px-2 font-semibold">{Name}</p>
      <p class="pt-1 px-2" style="font-size: 12px;">
        From {StartsAt} to {EndsAt}
      </p>
      <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;">
        {Description}
      </p>
    </div>
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