<script lang="ts">
    import Layout from "../banner-layout.svelte";
    import { goto } from '$app/navigation';
    import { v4 as uuidv4 } from "uuid"; // Generate UUID
    export let data;
    import { page } from "$app/stores";

    let { session, supabase } = data;
    $: ({ session, supabase } = data); // Listen to changes in supabase

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        goto('/');
    };

    console.log(supabase);

    // Define a type for the user data
    interface Profile {
        ProfileID: string;
        CreatedAt: string;
        UpdatedAt: string;
        Name: string;
        Role: "participant" | "admin" | "developer"; // Only allow "participant", "admin", or "developer"
        Organization: string;
    }

    // Define a type for organizations
    interface Organization {
        id: number;
        org_name: string;
    }

    let profiles: Profile[] = [];
    let orgName = "";
    let userName = "";
    let userRole: "participant" | "admin" | "developer" = "participant"; // Default role
    let errorMessage = "";
    let organizations: Organization[] = [];

    const fetchOrganizations = async () => {
        const { data: orgData, error } = await supabase.from("Organizations").select("*");
        if (error) {
            console.error("Error fetching organizations:", error);
        } else {
            organizations = orgData as Organization[];
        }
    };

    const fetchProfiles = async () => {
        const { data: profileData, error } = await supabase.from("Profiles").select("*");
        if (error) {
            console.error("Error fetching profiles:", error);
        } else {
            profiles = profileData as Profile[];
        }
    };

    const addProfile = async () => {
        errorMessage = "";

        if (!userName || !userRole || !orgName) {
            errorMessage = "All fields are required.";
            return;
        }

        // Check if the organization exists
        const organizationExists = organizations.some((org) => org.org_name.toLowerCase() === orgName.toLowerCase());
        if (!organizationExists) {
            errorMessage = "The organization does not exist.";
            return;
        }

        // Check if the profile name already exists
        const { data: existingProfile, error: profileCheckError } = await supabase
            .from("Profiles")
            .select("*")
            .eq("Name", userName);

        if (profileCheckError) {
            console.error("Error checking profile existence:", profileCheckError);
            return;
        }

        if (existingProfile && existingProfile.length > 0) {
            errorMessage = "A profile with this name already exists.";
            return;
        }

        const currentTimestamp = new Date().toISOString(); // Generate current timestamp in the desired format

        const newProfileID = uuidv4(); // Generate unique ID for ProfileID

        // Insert new profile into Profiles table
        const newProfile: Profile = {
            ProfileID: newProfileID,
            CreatedAt: currentTimestamp,
            UpdatedAt: currentTimestamp,
            Name: userName,
            Role: userRole,
            Organization: orgName,
        };

        const { error: insertError } = await supabase.from("Profiles").insert([newProfile]);
        if (insertError) {
            console.error("Error adding profile:", insertError);
            errorMessage = "Failed to add user.";
        } else {
            console.log("Profile added successfully");
            userName = "";
            userRole = "participant"; // Reset to default
            orgName = "";
            await fetchProfiles(); // Refresh profile list
        }
    };

    // Fetch organizations and profiles on component load
    fetchOrganizations();
    fetchProfiles();
</script>


<Layout>
    <div class="flex flex-col h-full justify-start mx-auto max-w-2xl">
        <!-- Form Section -->
        <div class="flex flex-col mt-10 mb-8">
            <p class="text-2xl font-bold mb-4 text-center">Add Profile</p>
            <form on:submit|preventDefault={addProfile} class="space-y-4">
                <div class="flex flex-col">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="userName">
                        Name
                    </label>
                    <input
                        id="userName"
                        type="text"
                        bind:value={userName}
                        placeholder="Enter user name"
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        required
                    />
                </div>
                <div class="flex flex-col">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="userRole">
                        Role
                    </label>
                    <select
                        id="userRole"
                        bind:value={userRole}
                        class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        required
                    >
                        <option value="participant">Participant</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div class="flex flex-col">
                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="orgName">
                        Organization
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
                {#if errorMessage}
                    <p class="text-red-500 text-sm">{errorMessage}</p>
                {/if}
                <button
                    type="submit"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Add Profile
                </button>
            </form>
        </div>

        <!-- Profiles List Section -->
        <div>
            <p class="text-xl font-bold mb-4">Profiles List</p>
            {#if profiles.length > 0}
                <ul class="space-y-4">
                    {#each profiles as profile}
                        <li class="p-4 border rounded bg-gray-50 shadow">
                            <p class="font-bold text-lg">{profile.Name}</p>
                            <p class="text-gray-700">Role: {profile.Role}</p>
                            <p class="text-gray-700">Organization: {profile.Organization}</p>
                            <p class="text-gray-500 text-sm">Created At: {profile.CreatedAt}</p>
                            <p class="text-gray-500 text-sm">Updated At: {profile.UpdatedAt}</p>
                        </li>
                    {/each}
                </ul>
            {:else}
                <p class="text-gray-500">No profiles found.</p>
            {/if}
        </div>
    </div>
</Layout>
