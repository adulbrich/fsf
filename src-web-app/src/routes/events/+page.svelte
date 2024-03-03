<!-- This .svelte file contains the content for the view events page, which is seen right after logging in -->
<script lang="ts">
  import { onMount } from "svelte";
  import Layout from "../banner-layout.svelte";
  export let data;
  import Card from "./CategoryEventCard.svelte";
  import SearchBar from "./EventSearchBar.svelte";
  let { supabase } = data;
  $: ({ supabase } = data);

  // Blue print for the event object
  interface Event {
    Name: string;
    Type: string;
    StartsAt: string;
    EndsAt: string;
    Status: string;
    Description: string;
    Exists: boolean;
    EventID: string;
  }
  // Blue print for the relevant events object
  interface RelevantEvents {
    pastEvents: Event[];
    ongoingEvent: Event | null;
    upcomingEvent: Event | null;
  }

  // Blue print for the event name and ID object
  interface EventNameAndID {
    Name: string;
    ID: string;
  }
  // Object that holds the relevant events for the event page
  let relevantEvents: RelevantEvents = {
    pastEvents: [],
    ongoingEvent: null,
    upcomingEvent: null,
  };
  let eventNamesAndID: EventNameAndID[] = []; // Array that holds all the event names and IDs assocaite with the events
  let loading = true; // Boolean that determines if the page is still loading
  let events: Event[] = []; // Array that holds all of the event objects

  // Function that fetches all the events from the database.  Site will not load until this function is finished
  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase.from("Events").select("*"); // Selects all  rows from the Events table
      if (error) throw error;
      events = data;
      console.log("events: ", events);
    } catch (error) {
      console.error("Error fetching events:", error as any);
    } finally {
      loading = false; // Set loading to false after fetching the events
    }
  };

  // This runs after the component firt renders in the DOM
  onMount(async () => {
    await fetchEvents(); // Fetch all the events but wait for function to finish before continuing
    events.forEach((event) => {
      eventNamesAndID.push({ Name: event.Name, ID: event.EventID }); // Push the name and ID of each event to the eventNamesAndID array
    });
    // For each event, determine the status of the event, trim the description, and set the Exists property to true
    events.forEach((event) => {
      determineEventStatus(event, event.StartsAt, event.EndsAt); // Determine the status of each event based on dates
      event.Description = trimDescription(event.Description); // Trim the description of each event
      event.Exists = true;
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
  function determineEventStatus(event: Event, startDate: string, endDate: string) {
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
<Layout>
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
    <!-- Top container that holds searchbar, "Events", search icon, and the create event button -->
    <div class="flex justify-start ml-[18%]">
      <p class="flex event-word ml-[3%]" style="margin-top:25px">Events</p>
      <!-- Searchbar Container -->
      <form class="relative ml-20" style="margin-top: 13px;" autocomplete="off">
        <!-- Search Bar -->
        <SearchBar events={eventNamesAndID} />
      </form>
      <!-- Create Event button -->
      <a href="/events/create" style="margin-left: 60px; margin-top: 19px;">
        <button class="btn btn-sm font-normal h-9 font-sans bg-beaver-orange hover:bg-dark-orange text-white rounded-full" style="position: absolute; margin-top: 9px; margin-left: 8px">
          Create Event
        </button>
      </a>
    </div>

    <!-- Container for the events -->
    <div class="flex flex-row ml-[20.5%] w-[72%] h-[80%] custom-border mt-5">
      <!-- Left container for Ongoing and Past events -->
      <div class="flex flex-col w-[50%] custom-border">
        <!-- Container for ONGOING events -->
        <div class="flex flex-col w-auto custom-border h-fit pt-3">
          <p class="inline-block max-w-full px-0 pb-4" style="font-size: 18px; font-weight:628;">Ongoing Events</p>
          <Card
            existsTF={relevantEvents.ongoingEvent?.Exists}
            ImagePath="../../aerial_2.jpg"
            Name={relevantEvents.ongoingEvent?.Name}
            StartsAt={relevantEvents.ongoingEvent?.StartsAt}
            EndsAt={relevantEvents.ongoingEvent?.EndsAt}
            Description={relevantEvents?.ongoingEvent?.Description}
          />
        </div>

        <!-- Container for PAST events -->
        <div class="flex flex-col w-auto custom-border h-fit pt-5">
          <div class="flex flex-row w-[100%] pb-4">
            <p class="inline-block" style="font-size: 18px; font-weight:628;">Past Events</p>
            <a href="/events/pastEvents" style="margin-left: 10px;">
              <button class="btn btn-xs font-normal font-sans bg-light-black hover:bg-light-blackSelected text-white rounded-full">View All</button>
            </a>
          </div>

          <div class="pb-2">
            <Card
              existsTF={relevantEvents.pastEvents[0]?.Exists}
              ImagePath="../../aerial_4.jpg"
              Name={relevantEvents.pastEvents[0]?.Name}
              StartsAt={relevantEvents.pastEvents[0]?.StartsAt}
              EndsAt={relevantEvents.pastEvents[0]?.EndsAt}
              Description={relevantEvents.pastEvents[0]?.Description}
            />
          </div>
          {#if relevantEvents.pastEvents[1] !== null}
            <Card
              existsTF={relevantEvents.pastEvents[1]?.Exists}
              ImagePath="../../aerial_3.jpg"
              Name={relevantEvents.pastEvents[1]?.Name}
              StartsAt={relevantEvents.pastEvents[1]?.StartsAt}
              EndsAt={relevantEvents.pastEvents[1]?.EndsAt}
              Description={relevantEvents.pastEvents[1]?.Description}
            />
          {/if}
        </div>
      </div>

      <!-- Container for UPCOMING events -->
      <div class="flex ml-4 flex-col custom-border h-fit w-[50%] pt-3">
        <div class="flex flex-row w-[100%] pb-4">
          <p class="inline-block" style="font-size: 18px; font-weight:628;">Upcoming Events</p>
          <a href="/events/upcomingEvents" style="margin-left: 10px;">
            <button class="btn btn-xs font-normal font-sans bg-light-black hover:bg-light-blackSelected text-white rounded-full">View All</button>
          </a>
        </div>
        <Card
          existsTF={relevantEvents.upcomingEvent?.Exists}
          ImagePath="../../aerial_5.jpg"
          Name={relevantEvents.upcomingEvent?.Name}
          StartsAt={relevantEvents.upcomingEvent?.StartsAt}
          EndsAt={relevantEvents.upcomingEvent?.EndsAt}
          Description={relevantEvents?.upcomingEvent?.Description}
        />
      </div>
    </div>
  {/if}
</Layout>

<style>
  .event-word {
    font-style: normal;
    font-weight: 628;
    font-size: 28px;
    line-height: 44px;
  }
  *:focus {
    outline: none;
  }
  /* Class that adds border around container */
  .custom-border {
    border: 0px solid #c7c7cd;
  }
</style>
