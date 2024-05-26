<script lang="ts">
    import { applyAction, enhance } from '$app/forms';
    import { fade } from 'svelte/transition';
    import osuLogo from '$lib/images/OSU_horizontal_2C_O_over_B.png';
    import toast from 'svelte-french-toast';
 
    // Variables related to the auth form
    let email: string = '';
    let actionSubmitted: boolean = false;

    // Page data and form data
    export let form;
    export let data;
    let { supabase } = data;
    $: ({ supabase } = data);

    // Auth form user
    let emailRef: HTMLInputElement | undefined;
    

    $: if (form) {
        if (form.success)
            toast.success("Check your email for a reset link!");
        else
            toast.error("There was an issue.");
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
        <div>
            
            <div class="p-8 pb-0 text-xl font-semibold">
                DamFit | Forgot your password?
            </div>
        </div>

        <p class="p-8 pb-0">
            To reset your password, please enter your e-mail address below. A password reset email will be sent to you.  
        </p>

        <!-- Forgot password form  -->
        <form
        class="flex flex-col gap-4 p-8"
        method="post"
        use:enhance={({ formData }) => {
            // Disable form submission for now
            actionSubmitted = true;
            
            return async ({ result }) => {
                await applyAction(result);
                setTimeout(() => actionSubmitted = false, 500);
            }

            }
        }>   <!-- Prompt for email to send reset link  -->
            <div class="flex flex-col gap-2">
                <label for="email" class="text-gray-500 font-medium text-sm">EMAIL</label>
                <input
                bind:this={emailRef}
                bind:value="{email}"
                disabled={actionSubmitted}
                name="email"
                autocomplete="email"
                class="ring-1 ring-black/10 rounded outline-none focus:ring-2 focus:ring-orange-400 transition-all ease-in-out px-3 h-10"
                />
            </div>


            <div class="flex">
                <a href="/" class="text-gray-500">Return to login page</a>
              </div>
        


            <!-- Send email button -->
            <button
                class="flex justify-center items-center text-white disabled:text-gray-300 ring-1 ring-orange-400/75 disabled:ring-0 bg-orange-400 hover:bg-orange-500 disabled:bg-gray-100 transition-all ease-in-out disabled:cursor-not-allowed h-10 w-32 mt-4 rounded"
                disabled={actionSubmitted}
                >
                <!-- Conditional that shows a spinner IF we are processing a sign in request -->
                {#if actionSubmitted}
                <div class="absolute" in:fade={{ delay: 10 , duration: 10  }} out:fade={{ duration: 10 }}>
                    <svg class="animate-spin w-6 h-6 text-orange-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
                {:else}
                <span in:fade={{ delay: 50 , duration: 50  }} out:fade={{ duration: 50 }} class="absolute text-md font-bold">SEND EMAIL</span>
                {/if}
            </button>
        </form> 

    </div>
</div>