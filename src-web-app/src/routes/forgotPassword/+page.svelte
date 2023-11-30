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
    <title>Forgot Password | DamFit</title>
</svelte:head>

<!-- Centered container -->
<div class="flex flex-col h-full justify-center mx-auto max-w-sm">

</div>