<script lang="ts">
  
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import EventBanner from "./eventbanner.svelte";
  import { goto } from '$app/navigation';

  export let data;
  export let form: {
    eventName?: string;
    eventType?: string;
    startDate?: string;
    endDate?: string;
    eventDescription?: string;
    eventBanner?: string;
  } = {};

  let { session, supabase, event } = data;
  $: ({ session, supabase, event } = data);

  let createEventForm: HTMLFormElement;
  let loading = false;
  let eventName: string = event?.event_name ?? "";
  let eventType: string = event?.event_type ?? "Walk (steps)";
  let startDate: string = event?.event_start_date ?? "";
  let endDate: string = event?.event_end_date ?? "";
  let eventDescription: string = event?.event_description ?? "";
  let eventBanner: string = event?.event_banner ?? "";


  
  export let eventDetails = {
    Description: data.Event?.Description,
    EventName: data.Event?.Name,
    EventType: data.Event?.Type,
    // edit it to html format, so we can pre-populate the form
    EventStartDate: data.Event?.StartsAt ? data.Event?.StartsAt.split('T')[0] : '', 
    EventEndDate: data.Event?.EndsAt ? data.Event?.EndsAt.split('T')[0] : '',
    EventID: data.Event?.EventID
  };

  const handleSubmit: SubmitFunction = async () => {
    loading = true;
    await updateEventDetails();
    loading = false;  const handleSubmit: SubmitFunction = async () => {
      loading = true;
      await updateEventDetails();
      loading = false;
    };
    goto('/events');
  };

  const updateEventDetails = async () => {
      loading = true;

      const { data: updatedData, error } = await supabase
        .from('Events')
        .update({
          Name: eventDetails.EventName,
          Type: eventDetails.EventType,
          StartsAt: eventDetails.EventStartDate,
          EndsAt: eventDetails.EventEndDate,
          Description: eventDetails.Description
        })
        .eq('EventID', eventDetails.EventID);

      if (error) {
        console.error('Error updating event:', error);
        alert('Failed to update event.');
      } else {
        console.log('Event updated successfully:', updatedData);
      }
      loading = false;
  };


  
</script>

  <div class="h-screen bg-light-black fixed top-0 left-0 p-2" style="width: 16%">
      <!--Logo and Faculty Fitness Text-->
      <img class="h-auto w-auto p-2" src="../../../../OSU_Logo.png" alt="OSU Logo">
      <p class="text-white mt-1 ml-3 font-bold p-4">Faculty Staff Fitness</p>
      <div class="flex-1 flex flex-col h-full space-y-1">
          <!-- Home Link, add 'active' class based on the current route -->
          <a href="/events" class="pt-2 pb-2 flex items-center active">
              <img class="h-[50%] max-w-[50%]  ml-8" src="../../../../home_icon.png" alt="home icon" >
              <p class="text-white mx-3 mr-12 ">Home</p>
          </a>

      </div>
  </div>

  <div class="p-7 h-auto">
    <!--Form Attributes-->
    <form class="form-widget flex-1 ml-[17%]" method="post" action="?/create" use:enhance={handleSubmit} bind:this={createEventForm}>
      <div class="flex flex-wrap -mx-3 mb-6">
        <a href="/events" style="margin-left: 10px; margin-top:15px;">
            
        </a>
        <!--Header-->
        <div class="w-full">

        </div>
        
        <form>
            <!-- Grid container for the first row with two columns -->
            <div class="grid grid-cols-3 gap-6 mb-6 ml-4">
                <!--Container for Event Name-->
              <div>
                <label for="eventName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Name</label>
                <input type="text" id="eventName" name="eventName"
                  bind:value={eventDetails.EventName}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Event Name" required />
              </div>

                <!--Container for Event Type Dropdown-->
              <div>
                <label for="eventType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Type</label>
                <select id="eventType" name="eventType" bind:value={eventDetails.eventType}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option>Walk (Steps)</option>
                  <option>Run (Distance)</option>
                </select>
              </div>
            </div>

            <!-- Grid container for the second row with two columns -->
            <div class="grid grid-cols-3 gap-6 mb-6  ml-4">
                <!--Container for Start Date Input-->
                <div>
                    <label for="startDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                    <input type="date" id="startDate" name="startDate" bind:value={eventDetails.EventStartDate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <!--Container for End Date Input-->
                <div>
                    <label for="endDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                    <input type="date" id="endDate" name="endDate" bind:value={eventDetails.EventEndDate} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
            </div>
        


        <!--Container for Event Description Input-->
          <div class="col-span-3  ml-4">
              <label for="eventDescription" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Description</label>
              <textarea id="eventDescription" name="eventDescription" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" rows="3"
                bind:value={eventDetails.Description}
                placeholder="Write details about the event here!" required></textarea>
          </div>

        </form>
      </div>

      <div class="px-2">
        <input
          type="submit"
          class="btn  text-white primary hover:bg-dark-orange bg-beaver-orange appearance-none py-3 px-4 mb-3 "
          value={loading ? "Loading.." : "Edit"}
          disabled={loading}
        />
      </div>
    </form>
  </div>


<style>

.header-style {
    font-style: normal;
    font-weight: 628;
    font-size: 28px;
    line-height: 44px;
  }
  .active {
    background-color: #4A708B; /* Softer blue */
    border-radius: 5px;
    color: white; /* Ensuring text is easily readable */
  }
  .flex.items-center {
    display: flex;
    align-items: center; /* Vertically aligns the items in the center */
    justify-content: center; /* Horizontally centers the content */
    text-align: center; 

  }
  @media (max-width: 768px) {
    .bg-light-black {
        display: none;
    }
  }
</style>
