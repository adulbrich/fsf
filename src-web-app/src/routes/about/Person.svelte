<script lang="ts">
  export let imgName: string;
  export let name: string;
</script>

<div class="flex flex-col gap-4 items-center w-36">
  <img class="pointer-events-none rounded-full aspect-square drop-shadow-xl h-32 w-32" src="/about/{imgName}.jpg" alt={imgName} />
  <p class="text-2xl font-light text-center">{name}</p>
</div>
