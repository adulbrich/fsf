
<script lang="ts">
    import Layout from '../../banner-layout.svelte';
    
    import { getContext } from 'svelte';
    import { onMount } from 'svelte';
    import { page } from '$app/stores'
    import Card from '../Card.svelte';
    
    

  let events: Event[] = [];
  let index = 1;
  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);
  
  let pageNum = 1;

   // Blue print for the event object
   interface Event {
    Name: string;
    Type: string;
    StartsAt: string;
    EndsAt: string;
    Status: string;
    Description: string;

  }
  
  // Blue print for the relevant events object
  interface RelevantEvents {
    pastEvents: Event[];
    ongoingEvent: Event | null;
    upcomingEvent: Event | null;
  }
  // Object that holds the relevant events for the event page
  let relevantEvents : RelevantEvents = {
    pastEvents: [],
    ongoingEvent: null,
    upcomingEvent: null,
  };
  
  let pastEvents : Event[] = [];
  let loading = true; // Boolean that determines if the page is still loading
  
  // Function that fetches all the events from the database
  const fetchEvents = async () => {
    try {
      
      const { data, error } = await supabase.from('Events').select('*'); //Selects all  rows from the Events table
      if (error) throw error;
      events = data;
      console.log("events: ", events)

      
    } catch (error) {
      console.error('Error fetching events:', error as any);
    }finally {
      
    }
  };

  // thie runs after the component firt renders in the DOM
  onMount(async () => {
    await fetchEvents(); // Fetch all the events but wait for function to finish before continuing
    
    events.forEach(event => {
      determineEventStatus(event,event.StartsAt, event.EndsAt); // Determine the status of each event based on dates
      event.Description = trimDescription(event.Description); // Trim the description of each event
    });
    console.log("Relevant events: ", relevantEvents);
    console.log("Past events: ", pastEvents);
    console.log("Past events length: ", pastEvents.length);
    loading = false; // Set loading to false after fetching the events
  });
  // This function trims the description of an event to 140 characters
  function trimDescription(description: string) {
    if (description.length > 140) {
      return description.slice(0, 140) + "...";
    }
    return description;
  }

  // This function takes in the start and end date of an event and determines if it is ongoing, upcoming, or past
  function determineEventStatus(event : Event, startDate: string, endDate: string) {
    const date = new Date();
    
    startDate = startDate.split('T')[0]; // Split the date and time and only take the date
    endDate = endDate.split('T')[0];
    
    event.StartsAt = startDate;
    event.EndsAt = endDate;

    const startDateObj  = new Date(startDate); // Convert the date string to a date object
    const endDateObj = new Date(endDate);
    
    if (startDateObj <= date && endDateObj >= date) { // If the start date is less than or equal to the current date and the end date is greater than or equal to the current date, then the event is ongoing
      relevantEvents.ongoingEvent = event;
      event.Status = "Ongoing";
    } else if (startDateObj > date) { // If the start date is greater than the current date, then the event is upcoming
      relevantEvents.upcomingEvent = event;
      event.Status = "Upcoming";
    } else { // If the start date is less than the current date and the end date is less than the current date, then the event is past
      pastEvents.push(event);
      event.Status = "Past";
    }
  
    
    
  }






    
</script>



<svelte:head>
  <title>Events | DamFit</title>
</svelte:head>

<Layout>

  <div class="flex flex-row justify-between items-center ml-[16%] w-[20%] mt-3">
    <button style = "font-size: 10px" class="flex items-center bg-beaver-orange ml-[3%] mt-1 h-6 hover:bg-dark-black text-white py-2 px-4 rounded-full">
      <a href="/events" class="flex items-center text-white">
        Back
    </a>
    
    </button>
    <p class="mr-[45%] font-semibold text-lg pt-1">Past Events</p>
    
    
    
    </div>
  <!-- Container for Events -->
  {#if loading}
    <div role="status">
      <svg aria-hidden="true" class="ml-[55%] mt-[10%] inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-beaver-orange" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
      </svg>
      <span class="sr-only">Loading...</span>
      
    </div>
  {:else}
  <div class="container ml-[16%] w-auto h-[75%] mt-8 flex flex-wrap justify-between">
    
    {#if pastEvents.length > 0}
      {#each pastEvents as event, index (event.Name)}
      {#if index <= 8}
        
        <Card {...event} index = {index} />
        
      {/if}
      {/each}
     {:else}
      <p>No events found</p>
      {/if}
    
  </div>
  <!-- Container that holds page numbers-->
  <div class="flex justify-between ml-[47.85%] custom-border w-1/5" style="margin-bottom: 15px; margin-top: 34px">
    <div class=" mb-0 ml-20 w-10 h-10 bg-beaver-orange rounded-full flex items-center justify-center text-white">1</div>
    <div class=" mb-0 mx-1 w-10 h-10 bg-light-black rounded-full flex items-center justify-center text-white">2</div>
    <div class=" mb-0 mr-20 w-10 h-10 bg-light-black rounded-full flex items-center justify-center text-white">3</div>
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
    
    .custom-border {
      /* box-sizing: border-box;
      background: #FFFFFF; 
      border: 0.5px solid #c7c7cd;
      border-radius: 10px;  */
    }
    
  </style>
