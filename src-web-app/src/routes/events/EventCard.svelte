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
<a href="/events/{EventID}/Overview" class="inline-flex h-32">
  <div class="ring-1 ring-black/10 rounded-lg shadow-md flex flex-column grow-0" class:mr-[10%]={index % 2 != 0} class:ml-[10%]={index % 2 == 0}>
    <!-- Event Banner  -->
    <div class="w-[40%] h-full">
      <img class="h-[100%] w-full" style="border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src={BannerURL} alt="No banner" on:error={(e) => e.target.src = '../../aerial_2.jpg'} />
    </div>

    <!-- Text section for card -->
    <div class="flex flex-col w-2/3 overflow-hidden h-full grow-0 shrink-0">
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
