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
    <div class="flex flex-row w-[90%] h-[130px sm:h-[120px] md:h-[125px] lg:h-[130px] xl:h-[140px]" style="box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); border-radius: 10px; overflow: hidden;">

      <!-- Image for card -->
      <div style="width: 40%; height: 100%; flex-shrink: 0; overflow: hidden; border-top-left-radius: 10px; border-bottom-left-radius: 10px;">
          <img style="width: 100%; height: 100%; object-fit: cover; border-top-left-radius: 10px; border-bottom-left-radius: 10px;" loading="lazy" src="{ImagePath}" alt="Scenery">
      </div>

      <!-- Text section for card -->
      <div style="width: 60%; height: 100%; flex-grow: 0; overflow: hidden; background: #FFFFFF; border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
        <p class="pt-1 px-2 font-semibold" style="margin: 0;">{Name}</p>
        <p class="pt-1 px-2" style="font-size: 12px; margin: 0;">{StartsAt} to {EndsAt}</p>
        <p class="pt-2 px-2" style="font-size: 12px; display: -webkit-box; -webkit-line-clamp: 6; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; margin: 0;">{Description}</p>
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