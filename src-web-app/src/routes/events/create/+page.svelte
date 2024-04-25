<script lang="ts">
  import Layout from "../../banner-layout.svelte";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import EventBanner from "./eventbanner.svelte";

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

  const handleSubmit: SubmitFunction = () => {
    loading = true;
    return async () => {
      loading = false;
    };
  };
</script>

<Layout>
  <div class="p-7 h-auto">
    <!--Form Attributes-->
    <form class="form-widget flex-1 ml-[17%]" method="post" action="?/create" use:enhance={handleSubmit} bind:this={createEventForm}>
      <div class="flex flex-wrap -mx-3 mb-6">
        <a href="/events" style="margin-left: 10px; margin-top:15px;">
          <!-- Arrow that redirects to /events -->
          <svg width="20" height="17" viewBox="0 0 51 43" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M24.1251 42.4336C23.2836 42.4243 22.4765 42.0987 21.8646 41.5217L0.911133 21.1135L21.8646 0.705341C22.5076 0.308915 23.2685 0.147891 24.0172 0.249796C24.7659 0.351701 25.456 0.710211 25.9694 1.26403C26.4827 1.81785 26.7876 2.5326 26.8318 3.28607C26.876 4.03954 26.6568 4.78496 26.2117 5.39489L10.3011 21.1135L26.4726 36.8322C26.9461 37.2876 27.2708 37.8755 27.404 38.5185C27.5371 39.1616 27.4725 39.8298 27.2186 40.4356C26.9648 41.0413 26.5335 41.5563 25.9815 41.9128C25.4294 42.2694 24.7823 42.4509 24.1251 42.4336Z" fill="black"/>
            <path d="M47.5996 24.3699H9.25746C8.39275 24.3699 7.56346 24.0268 6.95202 23.4161C6.34057 22.8054 5.99707 21.977 5.99707 21.1133C5.99707 20.2496 6.34057 19.4213 6.95202 18.8105C7.56346 18.1998 8.39275 17.8567 9.25746 17.8567H47.5996C48.4643 17.8567 49.2936 18.1998 49.9051 18.8105C50.5165 19.4213 50.86 20.2496 50.86 21.1133C50.86 21.977 50.5165 22.8054 49.9051 23.4161C49.2936 24.0268 48.4643 24.3699 47.5996 24.3699V24.3699Z" fill="black"/>
            </svg>
            
        </a>
        <!--Header-->
        <h2 class="header-style px-5">Create Event</h2>
        <div class="w-full">
          <p class="w-[60%] block px-6 py-2 my-4 text-base italic text-gray-500">
            Create your event here. You will be able to invite participants, create teams, configure achievements, publish the event, and edit details on the event page.
          </p>
        </div>
        
        <form>
            <!-- Grid container for the first row with two columns -->
            <div class="grid grid-cols-3 gap-6 mb-6 ml-4">
                <!--Container for Event Name-->
                <div>
                    <label for="eventName" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Name</label>
                    <input type="text" id="eventName" name="eventName" value="{form?.eventName ?? eventName}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Event Name" required />
                </div>

                <!--Container for Event Type Dropdown-->
                <div>
                    <label for="eventType" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Type</label>
                    <select id="eventType" name="eventType" value="{form?.eventType ?? eventType}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                    <input type="date" id="startDate" name="startDate" value="{form?.startDate ?? startDate}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>

                <!--Container for End Date Input-->
                <div>
                    <label for="endDate" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                    <input type="date" id="endDate" name="endDate" value="{form?.endDate ?? endDate}" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
            </div>
        


        <!--Container for Event Description Input-->
          <div class="col-span-3  ml-4">
              <label for="eventDescription" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Event Description</label>
              <textarea id="eventDescription" name="eventDescription" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" rows="3" placeholder="Write details about the event here!" required></textarea>
          </div>

        </form>

        <!-- Container for Event Banner Uploading -->
        <div class="px-5 pt-4 md:w-3/4 my-0">
          <EventBanner
            {supabase}
            bind:url={eventBanner}
            size={10}
            on:upload={() => {
              createEventForm.requestSubmit();
            }}
          ></EventBanner>
        </div>
      </div>

      <div class="px-2">
        <input
          type="submit"
          class="btn bg-light-black text-white primary hover:bg-light-blackSelected appearance-none py-3 px-4 mb-3 "
          value={loading ? "Loading.." : "Create Event"}
          disabled={loading}
        />
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
</style>
