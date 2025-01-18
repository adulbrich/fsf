<script lang="ts">
    import Layout from "../banner-layout.svelte";
    import { goto } from '$app/navigation';
    export let data;
    import { page } from "$app/stores";

    let { session, supabase } = data;
    $: ({ session, supabase } = data); // Listen to changes in supabase

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        goto('/');
    };

    console.log(supabase);

    let orgName = "";
    let orgDescription = "";
    let organizations = [];

    const fetchOrganizations = async () => {
        const { data: orgData, error } = await supabase
            .from("Organizations")
            .select("*");

        if (error) {
            console.error("Error fetching organizations:", error);
        } else {
            organizations = orgData;
        }
    };

    const addOrganization = async () => {
        if (!orgName || !orgDescription) {
            console.error("Please fill in all fields.");
            return;
        }

        const { data: insertData, error: insertError } = await supabase
            .from("Organizations")
            .insert([{ org_name: orgName, description: orgDescription }]);

        if (insertError) {
            console.error("Error adding organization:", insertError);
        } else {
            console.log("Organization added successfully:", insertData);
            orgName = "";
            orgDescription = "";
            await fetchOrganizations(); // Refresh the list after adding
        }
    };

    // Fetch organizations on component load
    fetchOrganizations();
</script>

<Layout>
    <div class="flex flex-col h-full justify-start mx-auto max-w-2xl">
        <!-- Form Section -->
        <div class="flex flex-col mt-10 mb-8">
            <p class="text-2xl font-bold mb-4 text-center">Add Organization</p>
            <form 
                on:submit|preventDefault={addOrganization} 
                class="space-y-4"
            >
                <div class="flex flex-col">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="orgName">
                        Organization Name
                    </label>
                    <input
                        id="orgName"
                        type="text"
                        bind:value={orgName}
                        placeholder="Enter organization name"
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        required
                    />
                </div>
                <div class="flex flex-col">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="orgDescription">
                        Description
                    </label>
                    <textarea
                        id="orgDescription"
                        bind:value={orgDescription}
                        placeholder="Enter organization description"
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Organization
                </button>
            </form>
        </div>

        <!-- Organizations List Section -->
        <div>
            <p class="text-xl font-bold mb-4">Organizations List</p>
            {#if organizations.length > 0}
                <ul class="space-y-4">
                    {#each organizations as org}
                        <li class="p-4 border rounded bg-gray-50 shadow">
                            <p class="font-bold text-lg">{org.org_name}</p>
                            <p class="text-gray-700">{org.description}</p>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p class="text-gray-500">No organizations found.</p>
            {/if}
        </div>
    </div>
</Layout>
