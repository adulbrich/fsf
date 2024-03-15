<script lang="ts">
  import {page} from '$app/stores';
  export let data;
  console.log("Current path: ", $page.url.pathname);
</script>

<div class="ml-[16%] w-auto h-[13%] eventTitle">
  <h1 class="ml-[2%] mt-[1%]">{data.Event?.Name}</h1>
  <div class="ml-[2%] w-auto flex flex-row h-[40%] mt-5">
    <a href="/events/{data.Event?.EventID}/Overview" class:navBarSelected={$page.url.pathname === `/events/${data.Event?.EventID}/Overview`} class="navBarLabel">Overview</a>
    <a href="/events/{data.Event?.EventID}/Teams" class:navBarSelected={$page.url.pathname === `/events/${data.Event?.EventID}/Teams`} class="navBarLabel ml-9 nav">Teams</a>
    <a href="/events/{data.Event?.EventID}/Stats" class:navBarSelected={$page.url.pathname=== `/events/${data.Event?.EventID}/Stats`} class="navBarLabel ml-9 nav">Stats</a>
  </div>
</div>
<slot />

<style>
  .eventTitle {
    font-size: 25px;
    font-weight: 600;
  }
  .navBarLabel {
    font-size: 18px;
    font-weight: 450;
  }
  .navBarSelected {
    font-size: 18px;
    font-weight: 600;
  }
</style>