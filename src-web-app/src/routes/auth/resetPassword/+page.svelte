<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { page } from '$app/stores';
    import { fade } from 'svelte/transition';
    import osuLogo from '$lib/images/OSU_horizontal_2C_O_over_B.png';
    import { afterNavigate, goto, invalidateAll } from '$app/navigation';
    import toast from 'svelte-french-toast';
    import { tick } from 'svelte';

    // Variables related to the auth form
    let email: string = '';
    let actionSubmitted: boolean = false;
    $: sendEmailDisabled = email === '' || actionSubmitted;

    // Page data and form data
    export let form;
    const { url } = $page;
    const { searchParams } = url;

    const token = searchParams.get('token');

    export let data;
    let { supabase } = data;
    $: ({ supabase } = data);

    // Auth form user
    let emailRef: HTMLInputElement | undefined;

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

        <!-- Forgot password form  -->
        <form
        class="flex flex-col gap-4 p-8"
        method="post"
        action="?/resetPassword"
        use:enhance
        >
            <!-- Prompt for NEW PASSWORD  -->
            <div class="flex flex-col gap-2">
                <label for="email" class="text-gray-500 font-medium text-sm"> NEW PASSWORD</label>
                <input
                name="new_password"
                autocomplete="new_password"
                class="ring-1 ring-black/10 rounded outline-none focus:ring-2 focus:ring-orange-400 transition-all ease-in-out px-3 h-10"
                />
            </div>

            <!-- Prompt for NEW PASSWORD confirmation  -->
            <div class="flex flex-col gap-2">
                <label for="email" class="text-gray-500 font-medium text-sm">CONFIRM PASSWORD</label>
                <input
                name="reconfirm_password"
                autocomplete="reconfirm_password"
                class="ring-1 ring-black/10 rounded outline-none focus:ring-2 focus:ring-orange-400 transition-all ease-in-out px-3 h-10"
                />
            </div>

            <!-- retrieve the token -->
            <!-- <input type="hidden" name="token" value={token} />
            {#if form?.errors?.token}
                <span class="text-red-500">{form?.errors?.token[0]}</span>
            {/if} -->

            <button type="submit" >Send</button>


            <!-- Send email button -->
           <!-- 
            <button
                class="flex justify-center items-center text-white disabled:text-gray-300 ring-1 ring-orange-400/75 disabled:ring-0 bg-orange-400 hover:bg-orange-500 disabled:bg-gray-100 transition-all ease-in-out disabled:cursor-not-allowed h-10 w-32 mt-4 rounded"
                disabled={sendEmailDisabled}
                >
                {#if actionSubmitted}
                <div class="absolute" in:fade={{ delay: 50 , duration: 50  }} out:fade={{ duration: 50 }}>
                    <svg class="animate-spin w-6 h-6 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                {:else}
                <span in:fade={{ delay: 50 , duration: 50  }} out:fade={{ duration: 50 }} class="absolute text-md font-bold">Reset Password</span>
                {/if}
            </button> 
        -->

        </form> 
        
        <!-- Verification for success/unsuccessful password change  -->
<!-- 
    {#if form && form.success === true }
        <div class="bg-green-300 p-2">
            <p>Your password was changed.</p>
        </div>
    {/if}

    {#if form && form.success === false }
        <div class="bg-red-300 p-2">
            <p>Could not change password.</p>
        </div>
    {/if} -->

    </div>
</div>