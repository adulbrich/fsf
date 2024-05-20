<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { page } from '$app/stores';
    import { fade } from 'svelte/transition';
    import osuLogo from '$lib/images/OSU_horizontal_2C_O_over_B.png';
    import { goto } from '$app/navigation';
    import toast from 'svelte-french-toast';
    export let data;
    let { supabase } = data;
    $: ({ supabase } = data);
    import { browser } from '$app/environment';

    // Variables related to the auth form
    let actionSubmitted: boolean = false;
    $: submittedNewPassword = false;

    // Page data and form data
    export let form;

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        setTimeout(() => {
            goto('/');
        }, 200);
    }
    
    $: if (form && browser) {
        if (form.success) {
            toast.success("Password Reset Successful!");
            submittedNewPassword = true;
            actionSubmitted = true;
            handleSignOut();
        }
        else {
            (Object.values(form.errors)).forEach((element: any) => {
                const errors = element as string[];
                toast.error(errors[0]);
            });
        }

    }


</script>

<svelte:head>
    <title>Forgot Password | DamFit</title>
</svelte:head>

<!-- Centered container -->
<div class="flex flex-col h-full justify-center mx-auto max-w-sm">
    <div class="shadow-lg rounded-md ring-1 ring-black/5 flex flex-col">

        <!-- Logo -->
        <div class="py-4 text-center px-4 border-b border-black/5 flex items-end justify-between">
          <img src={osuLogo} alt="University logo" class="w-1/2 select-none pointer-events-none" />
        </div>
    
        <!-- Title -->
        <div class="p-8 pb-0 text-xl font-semibold">
          DamFit | Forgot your password?
        </div>

        <p class="p-8 pb-0">
            Enter and re-confirm your new password.
        </p>

        <form
        class="flex flex-col gap-4 p-8"
        method="post"
        action="?/resetPassword"
        >
            <!-- Prompt for NEW PASSWORD  -->
            <div class="flex flex-col gap-2">
                <label for="new_password" class="text-gray-500 font-medium text-sm">NEW PASSWORD</label>
                <input
                name="new_password"
                autocomplete="off"
                type="password"
                disabled={actionSubmitted}
                class="ring-1 ring-black/10 rounded outline-none focus:ring-2 focus:ring-orange-400 transition-all ease-in-out px-3 h-10"
                />
            </div>

            <!-- Prompt for NEW PASSWORD confirmation  -->
            <div class="flex flex-col gap-2">
                <label for="reconfirm_password" class="text-gray-500 font-medium text-sm">CONFIRM PASSWORD</label>
                <input
                name="reconfirm_password"
                autocomplete="off"
                type="password"
                disabled={actionSubmitted}
                class="ring-1 ring-black/10 rounded outline-none focus:ring-2 focus:ring-orange-400 transition-all ease-in-out px-3 h-10"
                />
            </div>


            <!-- Send email button -->
            <button
                class="flex justify-center items-center text-white disabled:text-gray-300 ring-1 ring-orange-400/75 disabled:ring-0 bg-orange-400 hover:bg-orange-500 disabled:bg-gray-100 transition-all ease-in-out disabled:cursor-not-allowed h-10 w-32 mt-4 rounded"
                disabled={actionSubmitted}
                type="submit"
                >
                {#if actionSubmitted}
                <div class="absolute" in:fade={{ delay: 50 , duration: 50  }} out:fade={{ duration: 50 }}>
                    <svg class="animate-spin w-6 h-6 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                {:else}
                <span in:fade={{ delay: 50 , duration: 50  }} out:fade={{ duration: 50 }} class="absolute text-md">Reset Password</span>
                {/if}
            </button> 
        </form> 
    
    </div>
</div>