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










<a href="/events/{eventID}/Overview">
    <div class="flex flex-row w-[90%] shadow-md h-[130px sm:h-[120px] md:h-[125px] lg:h-[130px] xl:h-[140px]" style="">
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

    </div>
</a>











<style>
  .event-card-container {
    display: flex;
    flex-direction: row;
    width: 90%;
    height: auto; /* Auto-adjust the card height based on content */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }

  .image-container {
    flex-basis: 40%;
    background-color: #EEE; /* Placeholder in case the image fails to load */
  }

  .event-image {
    display: block;
    width: 100%; /* Image will fill the container */
    height: auto; /* Height will be adjusted automatically to maintain the aspect ratio */
    object-fit: cover; /* This will ensure that the image covers the area without distortion */
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
    .card-border {
        box-sizing: border-box;
        background: #FFFFFF;
        border: 0.5px solid #c7c7cd;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }
</style>