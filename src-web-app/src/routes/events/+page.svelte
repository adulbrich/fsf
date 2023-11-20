<script lang="ts">
  import { goto } from '$app/navigation';

  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    goto('/');
  }
</script>

<svelte:head>
  <title>Events | DamFit</title>
</svelte:head>

<!-- Container -->
<div class="flex flex-col justify-center h-full max-w-md mx-auto">
  <h1>Welcome to SvelteKit</h1>
  <p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
  
  <p>This is the events page</p>
  <button class="rounded border bg-orange-300 px-2" on:click={() => handleSignOut()}>Logout</button>
</div>