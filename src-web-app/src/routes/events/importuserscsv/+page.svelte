<script lang="ts">
  import Layout from "../../banner-layout.svelte";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import toast from "svelte-french-toast";
  import exampleCSVImage from '$lib/images/userscsvformat.png';
  export let form;

  $: if (form) {
    if (form.errorMessage) toast.error(form.errorMessage);
    else toast.success("Users imported!");
  }

  let files: FileList;
  let importUsersForm: HTMLFormElement;
  let loading = false;

  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async ({ update }) => {
      loading = false;
      // Update form variable so we can do stuff like display
      // an error message (if applicable).
      update();
    };
  };
</script>

<Layout>
  <div class="p-7 h-auto">
    <!--Form Attributes-->
    <form class="flex flex-row ml-[17%]" enctype="multipart/form-data" method="post" action="?/importUsersFromCSV" use:enhance={handleSubmit} bind:this={importUsersForm}>
      <div class="flex flex-wrap w-[40%] -mx-3 mb-6">
        <a href="/events" style="margin-left: 10px; margin-top:15px;">
          <!-- Arrow that redirects to /events -->
          <svg width="20" height="17" viewBox="0 0 51 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M24.1251 42.4336C23.2836 42.4243 22.4765 42.0987 21.8646 41.5217L0.911133 21.1135L21.8646 0.705341C22.5076 0.308915 23.2685 0.147891 24.0172 0.249796C24.7659 0.351701 25.456 0.710211 25.9694 1.26403C26.4827 1.81785 26.7876 2.5326 26.8318 3.28607C26.876 4.03954 26.6568 4.78496 26.2117 5.39489L10.3011 21.1135L26.4726 36.8322C26.9461 37.2876 27.2708 37.8755 27.404 38.5185C27.5371 39.1616 27.4725 39.8298 27.2186 40.4356C26.9648 41.0413 26.5335 41.5563 25.9815 41.9128C25.4294 42.2694 24.7823 42.4509 24.1251 42.4336Z"
              fill="black"
            />
            <path
              d="M47.5996 24.3699H9.25746C8.39275 24.3699 7.56346 24.0268 6.95202 23.4161C6.34057 22.8054 5.99707 21.977 5.99707 21.1133C5.99707 20.2496 6.34057 19.4213 6.95202 18.8105C7.56346 18.1998 8.39275 17.8567 9.25746 17.8567H47.5996C48.4643 17.8567 49.2936 18.1998 49.9051 18.8105C50.5165 19.4213 50.86 20.2496 50.86 21.1133C50.86 21.977 50.5165 22.8054 49.9051 23.4161C49.2936 24.0268 48.4643 24.3699 47.5996 24.3699V24.3699Z"
              fill="black"
            />
          </svg>
        </a>
        <!--Header-->
        <h2 class="header-style px-5">Import Users</h2>
        <div class="w-full">
          <p class="w-[100%] block pl-6 py-2 my-4 text-base italic text-gray-500">
            Import users here using a csv file. Example format:<br>
                  * first line must be column names<br>
                  * Column order does not matter<br>
                  * No spaces between columns<br><br>
            Email Address,First Name,Last Name,Column1,Column2 <br>
            xxx@oregonstate.edu,Benny,Beaver,value1,value2
          </p>
        </div>
        <!-- Container for Both Import Users and Upload File button -->
        <div class="flex w-full flex-col h-auto ml-4">
          <!-- Container for csv file uploading -->
          <div class="mt-3 w-[25%] mb-3 my-0 btn primary bg-beaver-orange text-white hover:bg-dark-orange">
            <label class="button primary block" for="userscsv">Upload File</label>
            <input required style="position:absolute; visibility:hidden;" type="file" bind:files id="userscsv" name="userscsv" accept=".csv" />
          </div>
          {#if files && files[0]}
          <p>Uploded file: {files[0].name}</p>
          {:else}
          <p>Uploaded file: no file uploaded</p>
          {/if}

          <!-- Container for Import Users Button -->
          <div class=" pt-3">
            <input
              type="submit"
              class="btn bg-light-black text-white primary hover:bg-light-blackSelected appearance-none py-3 px-4 mb-3"
              value={loading ? "Loading.." : "Import Users"}
              disabled={loading}
            />
          </div>

          <!-- Container for displaying user creation data-->
          {#if form && form.userEmailsThatWereCreated && form.userEmailsThatWereCreated.length > 0}
            <p class="w-[100%] block pl-6 py-2 my-4 text-base">Created the following users:</p>
            {#each form.userEmailsThatWereCreated as email}
              <li>" {email}"</li>
            {/each}
          {/if}

          {#if form && form.userEmailsThatAlreadyExist && form.userEmailsThatAlreadyExist.length > 0}
            <p class="w-[100%] block pl-6 py-2 my-4 text-base">Users with the following emails already exist:</p>
            {#each form.userEmailsThatAlreadyExist as email}
              <li>"{email}""</li>
            {/each}
          {/if}

          {#if form && form.userEmailsThatCouldNotBeCreated && form.userEmailsThatCouldNotBeCreated.length > 0}
            <p class="w-[100%] block pl-6 py-2 my-4 text-base">Could not create the following users. Possibly wrong csv format:</p>
            {#each form.userEmailsThatCouldNotBeCreated as email}
              <li>"{email}""</li>
            {/each}
          {/if}
        </div>
      </div>
    </form>
  </div>
</Layout>

<style>
  .header-style {
    font-style: normal;
    font-weight: 628;
    font-size: 28px;
    line-height: 44px;
  }
  .black-border {
    border: 1px solid black;
  }
  .daily-tiers-text {
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 44px;
  }
</style>
