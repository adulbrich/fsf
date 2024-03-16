<script lang='ts'>
    import Layout from "../banner-layout.svelte";
    import { goto } from '$app/navigation';
    export let data;
    let { supabase } = data;
    $: ({ supabase } = data);
    
    const handleSignOut = async () => {
    await supabase.auth.signOut();
    goto('/');
  }
</script>

<Layout>
    
    <button class="ml-[52%] rounded border bg-beaver-orange px-2 h-10 text-white" on:click={() => handleSignOut()}>Logout</button>
    
</Layout>