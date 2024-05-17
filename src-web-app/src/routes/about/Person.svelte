<script lang="ts">
  export let imgName: string;
  export let name: string;
</script>

<div class="flex flex-col items-center w-38">
  <img class="mask drop-shadow-2xl pointer-events-none mask-circle h-32 w-32" src="/about/{imgName}.jpg" alt={imgName} />
  <p class="text-2xl font-light mt-3 text-center">{name}</p>
</div>
