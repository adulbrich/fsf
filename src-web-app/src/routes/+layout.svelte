
<script lang="ts">
  import { fade } from "svelte/transition";
  import "../app.css";
  import { Toaster } from 'svelte-french-toast';
  import Sidebar from './Sidebar.svelte';

  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);

  // Pathname used for page transition key
  $: pathname = data.pathname;
</script>

<!-- Top level container -->
<main>
  <div class="drawer lg:drawer-open">
    <input id="drawer-id" type="checkbox" class="drawer-toggle" />
    <!-- Content -->
    <div class="drawer-content flex flex-col items-center justify-center">
      <!-- key is used for triggering page transitions -->
        {#key pathname}
        <div class="absolute h-screen min-h-screen container max-w-screen-lg" in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150, delay: 0 }}>
          <slot />
        </div>
      {/key}
    </div>
    <!-- Sidebar -->
    <div class="z-10 drawer-side">
      <label for="drawer-id" aria-label="close sidebar" class="drawer-overlay"></label> 
      <Sidebar />
    </div>
  </div>
</main>

<!-- svelte-french-toast -->
<Toaster position="top-right" toastOptions={{ className: 'svelte-toast-message' }} />