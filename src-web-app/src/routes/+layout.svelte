<script lang="ts">
  import { fade } from "svelte/transition";
  import "../app.css";
  import { Toaster } from 'svelte-french-toast';

  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);

  // Pathname used for page transition key
  $: pathname = data.pathname;
</script>

<svelte:head>
  <title>Login | DamFit</title>
</svelte:head>
  
<!-- Top level container -->
<main>
  <!-- key is used for triggering page transitions -->
  {#key pathname}
    <div class="absolute h-screen min-h-screen w-full" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150, delay: 0 }}>
      <slot />
    </div>
  {/key}
</main>

<!-- svelte-french-toast -->
<Toaster position="top-right" toastOptions={{ className: 'svelte-toast-message' }} />