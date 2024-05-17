<script lang="ts">
  export let imgName: string;
  export let name: string;
</script>

<div class="flex flex-col items-center aspect-w-2 aspect-h-2">
  <img class="mask pointer-events-none drop-shadow-2xl mask-circle h-32 w-32" src="/about/{imgName}.jpg" alt={imgName} />
  <p class="text-2xl font-light mt-3">{name}</p>
</div>
