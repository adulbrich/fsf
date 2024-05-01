<!-- This .svelte file contains the content for the view events page, which is seen right after logging in -->
<script lang="ts">
  import { onMount } from "svelte";
  export let data;
  import Card from "./EventCard.svelte";
  import SearchBar from "./EventSearchBar.svelte";
  import type { RelevantEvents, SBEvent } from "$lib/types/models";
  let { supabase } = data;
  $: ({ supabase } = data);

  // Object that holds the relevant events for the event page
  let relevantEvents: RelevantEvents = {
    pastEvents: [],
    ongoingEvent: null,
    upcomingEvent: null,
  };

  let loading = true; // Boolean that determines if the page is still loading
  let events: SBEvent[] = []; // Array that holds all of the event objects

  // Function that fetches all the events from the database.  Site will not load until this function is finished
  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase.from("Events").select("*").returns<SBEvent[]>(); // Selects all  rows from the Events table
      if (error) console.error("Error fetching events:");
      events = data ?? [];
      console.log("events: ", events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      loading = false; // Set loading to false after fetching the events
    }
  };

  // This runs after the component firt renders in the DOM
  onMount(async () => {
    await fetchEvents(); // Fetch all the events but wait for function to finish before continuing
    // For each event, determine the status of the event, trim the description, and set the Exists property to true
    events.forEach((event) => {
      determineEventStatus(event, event.StartsAt, event.EndsAt); // Determine the status of each event based on dates
      event.Description = trimDescription(event.Description); // Trim the description of each event
    });

    console.log("Relevant events: ", relevantEvents);
  });
  
  // This function trims the description of an event to 140 characters
  function trimDescription(description: string) {
    if (description.length > 140) {
      return description.slice(0, 140) + "...";
    }
    return description;
  }

  // This function takes in the start and end date of an event and determines if it is ongoing, upcoming, or past
  function determineEventStatus(event: SBEvent, startDate: string, endDate: string) {
    const date = new Date(); // Get the current date

    startDate = startDate.split("T")[0]; // Split the date and time and only take the date
    endDate = endDate.split("T")[0];

    event.StartsAt = startDate;
    event.EndsAt = endDate;

    const startDateObj = new Date(startDate); // Convert the date string to a date object
    const endDateObj = new Date(endDate);

    if (startDateObj <= date && endDateObj >= date) {
      // If the start date is less than or equal to the current date and the end date is greater than or equal to the current date, then the event is ongoing
      relevantEvents.ongoingEvent = event;
      event.Status = "Ongoing";
    } else if (startDateObj > date) {
      // If the start date is greater than the current date, then the event is upcoming
      relevantEvents.upcomingEvent = event;
      event.Status = "Upcoming";
    } else {
      // If the start date is less than the current date and the end date is less than the current date, then the event is past
      relevantEvents.pastEvents.push(event);
      event.Status = "Past";
    }
  }
</script>

<svelte:head>
  <title>Events | DamFit</title>
</svelte:head>

<!-- If loading is true, then display the spinner -->
{#if loading}
  <div role="status">
    <svg
      aria-hidden="true"
      class="ml-[55%] mt-[10%] inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-beaver-orange"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
{:else}
  <div class="flex flex-col gap-8 container max-w-screen-lg">
    <!-- Top container that holds searchbar, "Events", search icon, and the create event button -->
    <div class="flex md:flex-row flex-col justify-start items-start gap-8 w-full">
      <p class="flex font-semibold text-2xl">Events</p>
      <!-- Searchbar Container -->
      <form autocomplete="off">
        <!-- Search Bar -->
        <SearchBar {events} />
      </form>
      <!-- Create Event button -->
      <a href="/events/create">
        <button class="btn btn-sm font-normal h-9 font-sans bg-beaver-orange hover:bg-dark-orange text-white rounded-full whitespace-nowrap">
          Create Event
        </button>
      </a>
    </div>
    <!-- Container for the events -->
    <div class="flex lg:flex-row flex-col lg:gap-8">
      <!-- Left container for Ongoing and Past events -->
      <div class="basis-1/2 flex flex-col gap-8">
        <!-- Container for ONGOING events -->
        <div class="flex flex-col gap-4">
          <p class="font-semibold">Ongoing Events</p>
          <Card
            event={relevantEvents.ongoingEvent}
          />
        </div>
        <!-- Container for PAST events -->
        <div class="flex flex-col gap-4">
          <div class="flex flex-row gap-4">
            <p class="font-semibold">Past Events</p>
            <a href="/events/pastEvents">
              <button class="btn btn-xs font-normal font-sans bg-light-black hover:bg-light-blackSelected text-white rounded-full">View All</button>
            </a>
          </div>
          <Card
            event={relevantEvents.pastEvents[0]}
          />
          {#if relevantEvents.pastEvents[1] !== null}
            <Card
              event={relevantEvents.pastEvents[1]}
            />
          {/if}
        </div>
      </div>
      <!-- Container for UPCOMING events -->
      <div class="flex basis-1/2 flex-col gap-4">
        <div class="flex flex-row gap-4">
          <p class="font-semibold">Upcoming Events</p>
          <a href="/events/upcomingEvents">
            <button class="btn btn-xs font-normal font-sans bg-light-black hover:bg-light-blackSelected text-white rounded-full">View All</button>
          </a>
        </div>
        <Card
          event={relevantEvents.upcomingEvent}
        />
      </div>
    </div>
  </div>
{/if}

<style>
  *:focus {
    outline: none;
  }
</style>
