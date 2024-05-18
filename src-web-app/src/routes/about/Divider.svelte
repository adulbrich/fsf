<script lang="ts">
  import SVGComponents from "./SVGComponents.svelte";

</script>

<div class="flex w-full">
    <div class="grid h-20 card place-items-center">
        <div class="w-auto flex flex-row items-center my-8 mt-4">
            <a href="https://github.com/OregonStateUniversity/osu-fs" target="_blank" class="text-2xl mr-4 link link-hover">OSU FSF on Github</a>
            <a href="https://github.com/OregonStateUniversity/osu-fsf" target="_blank">
              <SVGComponents svgLabel="github-logo" width="49" height="48" />
            </a>
          </div>
    </div>
    <div class="divider divider-horizontal divider-neutral"></div>
    <div class="grid h-20 card place-items-center">
        <div class="w-auto flex flex-row items-center my-8 mt-4">
            <a href="https://osu-fsf-docs.vercel.app/reference/00welcome" target="_blank" class="text-2xl mr-4 link link-hover">Visit our docs</a>
            <a href="https://osu-fsf-docs.vercel.app/reference/00welcome" target="_blank">
              <SVGComponents svgLabel="starlight" width="49" height="48" />
            </a>
          </div>
    </div>
  </div>