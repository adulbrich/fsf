<script lang="ts">
  import { goto } from '$app/navigation';

  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);

  let email: string = '';
  let password: string = '';
  let error: string = '';

  const handleSignUp = async () => {
    const response = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });

    if (response.error)
      error = response.error.message;
    else
      error = 'Check your email for a confirmation link';

  }

  const handleSignIn = async () => {
    const response = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (response.error)
      error = response.error.message;
    else
      goto('/');
  }

  const handleSignOut = async () => {
    const response = await supabase.auth.signOut();

    if (response.error)
      error = response.error.message;
    else
      goto('/');
  }
</script>

<div class="flex flex-col mx-auto gap-4 max-w-sm mt-12">
  <form on:submit="{handleSignUp}" class="flex flex-col gap-4">
    <p class="text-red-300">{error}</p>
    <label for="email">Email</label>
    <input name="email" bind:value="{email}" class="border rounded px-2" />
    <label for="password">Password</label>
    <input type="password" name="password" bind:value="{password}" class="border rounded px-2" />
    <button class="border rounded bg-orange-300 h-8 text-white">Sign up</button>
  </form>
  
  <button on:click="{handleSignIn}" class="border rounded bg-orange-300 h-8 text-white">Sign in</button>
  <button on:click="{handleSignOut}" class="border rounded bg-orange-300 h-8 text-white">Sign out</button>
</div>