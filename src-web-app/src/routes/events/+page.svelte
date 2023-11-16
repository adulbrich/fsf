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

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<p>This is the events page</p>
<button class="rounded border bg-orange-300 px-2" on:click={() => handleSignOut()}>Logout</button>