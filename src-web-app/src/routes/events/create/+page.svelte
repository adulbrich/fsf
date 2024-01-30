<script lang='ts'>
  import Layout from "../../banner-layout.svelte";
  import { enhance } from '$app/forms';
  import type { SubmitFunction } from '@sveltejs/kit';
  import toast from "svelte-french-toast";
  
  export let data;
  export let form;

  let { session, supabase, event } = data;
  $: ({ session, supabase, event } = data);

  // Error message toast
  $: if (form) {
    if (form.errorMessage)
      toast.error(form.errorMessage);
    else
      toast.success('Event created!');
  }

  let createEventForm: HTMLFormElement
  let loading = false
  let eventName: string = event?.event_name ?? '';
  let eventType: string = event?.event_type ?? '';
  let startDate: string = event?.event_start_date ?? '';
  let endDate: string = event?.event_end_date ?? '';
  let eventDescription: string = event?.event_description ?? '';

  const handleSubmit: SubmitFunction = () => {
		loading = true;
  	return async ({ update }) => {
			loading = false;

      // Update form variable so we can do stuff like display
      // an error message (if applicable).
      update();
		}
	}
</script>

  <Layout>
    <div class="p-7">

      <!--Form Attributes-->
        <form
         class="flex-1 ml-[16%]" 
         enctype="multipart/form-data"
         method="post"
         action="?/createEvent"
         use:enhance={handleSubmit}
         bind:this={createEventForm}>
         
          <div class="flex flex-wrap -mx-3 mb-6">
      
            <!--Header-->
            <h2 class="px-6 pt-5 text-4xl font-bold font-sans dark:text-black">Create Event</h2>
            <p class="px-6 py-2 my-4 text-lg text-gray-500">Create your event here. You will be able to invite participants, create teams, configure achievements, publish the event, and edit details on the event  page.</p>
      

            <!--Container for Event Name-->
            <div class=" md:w-1/4 px-5 mb-6 md:mb-0">
      
              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="eventName">
                Event Name
              </label>
              <input required name="eventName" id="eventName" value={form?.eventName ?? eventName} class="appearance-none block w-full bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"  type="text" placeholder="Event Name">

            </div>
      
            <!--Container for Event Type Dropdown-->
            <div class=" md:w-2/3 px-5 mb-6 md:mb-0">

              <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="eventType">
                Type
              </label>

              <div class="relative">
                <select required id="eventType" name="eventType" value={form?.eventType ?? eventType} class="block appearance-none w-1/4 bg-gray-200 border border-black-500 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                  <option>Steps</option>
                  <option>Distance</option>
                </select>

              </div>
            </div>
      
            <!--Container for Start Date Input-->
            <div class=" md:w-1/4 px-5 mb-6 md:mb-0">
              <label for="startDate" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Start Date
              </label>
              <input id="startDate" name="startDate" type="date" value={form?.startDate ?? startDate} required class="appearance-none block w-1/2 bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
            </div>
      
            <!--Container for End Date Input-->
            <div class=" md:w-1/4 px-5 mb-6 md:mb-0">
              <label for="endDate" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                End Date
              </label>
              <input type="date" id="endDate" name="endDate" value={form?.endDate ?? endDate} required class="appearance-none block w-1/2 bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-6 mb-3 leading-tight focus:outline-none focus:bg-white">
            </div>
            
            <!--Container for Event Description Input-->
            <div class="md:w-3/4 px-5 mb-0 md:mb-0">
              <label for="eventDescription" class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                Event Details
              </label>
              <textarea id="eventDescription" name="eventDescription" value={form?.eventDescription ?? eventDescription} required rows="4" class="block p-2.5 w-1/2 text-sm text-black bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 light:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write details about the event here!"></textarea>
            </div>

            <!-- Container for Event Banner Uploading -->
            <div class = "px-5 py-0 md:w-3/4 my-0">
              <label class="button  primary block" for="eventBanner">
                Click here to upload a banner!
              </label>
              <input
                style="position:absolute; visibility:hidden;"
                type="file"
                id="eventBanner"
                name="eventBanner"
                accept="image/*"
              />
            </div>
      
          </div>
      
        <div class='px-2'>
          <input
          type='submit'
          class="button primary appearance-none block bg-gray-200 text-gray-700 border border-black-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
          value={loading ? 'Loading..' : 'Create Event'}
          disabled={loading}>
        </div>
      
        </form>
      </div>
  </Layout>
  