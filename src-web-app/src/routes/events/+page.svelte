<!-- This .svelte file contains the content for the view events page, which is seen right after logging in -->
<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import Layout from '../banner-layout.svelte'
  export let data;
  import {fail, redirect } from '@sveltejs/kit'
  let { supabase } = data;
  $: ({ supabase } = data);
  let card_text = "Walktober is your chance to embrace the beauty of autumn while taking strides toward a healthier you. Join us in October for a month of enjoyable walks, scenic hikes, and the camaraderie of fellow...";
  let char_lim = 140;
  $: card_text = card_text.length > char_lim
    ? card_text.slice(0, char_lim) + '...'
    : card_text;
  
  
  

  interface Event {
    Name: string;
    Type: string;
    StartsAt: string;
    EndsAt: string;
    Status: string;
    Description: string;

  }
  interface RelevantEvents {
    pastEvents: Event[];
    ongoingEvent: Event | null;
    upcomingEvent: Event | null;
  }
  let relevantEvents : RelevantEvents = {
    pastEvents: [],
    ongoingEvent: null,
    upcomingEvent: null,
  };
  let events: Event[] = [];
  
  const fetchEvents = async () => {
    try {
      
      const { data, error } = await supabase.from('Events').select('*');
      if (error) throw error;
      events = data;
      console.log("events: ", events)

      
    } catch (error) {
      console.error('Error fetching events:', error as any);
    }
  };

  onMount(async () => {
    await fetchEvents();
    console.log("Events are fetched ");
    events.forEach(event => {
      console.log("Event status checking")
      determineEventStatus(event,event.StartsAt, event.EndsAt);
      console.log("Event status checked")
    });
    console.log("Relevant events: ", relevantEvents);

  });
  


  // This function takes in the start and end date of an event and determines if it is ongoing, upcoming, or past
  function determineEventStatus(event : Event, startDate: string, endDate: string) {
    const date = new Date();
    
    startDate = startDate.split('T')[0];
    endDate = endDate.split('T')[0];
    event.StartsAt = startDate;
    event.EndsAt = endDate;
    const startDateObj  = new Date(startDate);
    const endDateObj = new Date(endDate);
    console.log("Start date: ", startDateObj);
    console.log("End date: ", endDateObj);
    if (startDateObj <= date && endDateObj >= date) {
      relevantEvents.ongoingEvent = event;
      event.Status = "Ongoing";
    } else if (startDateObj > date) {
      relevantEvents.upcomingEvent = event;
      event.Status = "Upcoming";
    } else {
      relevantEvents.pastEvents.push(event);
      event.Status = "Past";
    }
  
    
    
  }

  
    
  
</script>

<svelte:head>
  <title>Events | DamFit</title>
</svelte:head>

<Layout>

<div class = "flex-1 ml-[16%]">
  <!-- Cotnainer for all entities to the right of the navbar -->
  <div class="flex flex-col w-[100%] h-[100%]">
    <!-- Top container that holds searchbar, "Events", search icon, and the create event button -->
    <div class="flex flex-row w-[90%] h-[10%] ml-[5%]">
      <p class = "flex event-word ml-[3%]" style="margin-top:36px">Events</p>
      <!-- Searchbar -->
      <form class = "relative ml-16">   
        <div class="absolute left-0 start-0 flex items-center ps-3" style="top: 48px;">
          <a href="/events/create">
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-top: 5px;">
              <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M18.9999 19L14.6499 14.65" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
        <!-- Text box -->
        <input type="search" 
          id="default-search" 
          class="mt-[9%] block p-2 ps-10 outline-none text-sm bg-white rounded-md border-black border" 
          style="width: 30rem; -webkit-appearance: none; -moz-appearance: none; appearance: none;"
          placeholder="Type to search for an event" 
          required>
      </form>
      <!-- Create Event button -->
      <a href="/events/create">
        <svg class = "mt-9 ml-4" width="100" height="50" viewBox="0 0 140 45" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="140" height="45" rx="22.5" fill="#D73F09"/>
          <path d="M24.4629 17.2842C23.7539 17.2842 23.1152 17.4072 22.5469 17.6533C21.9844 17.8936 21.5039 18.2451 21.1055 18.708C20.7129 19.165 20.4111 19.7188 20.2002 20.3691C19.9893 21.0195 19.8838 21.752 19.8838 22.5664C19.8838 23.6445 20.0508 24.582 20.3848 25.3789C20.7246 26.1699 21.2285 26.7822 21.8965 27.2158C22.5703 27.6494 23.4111 27.8662 24.4189 27.8662C24.9932 27.8662 25.5322 27.8193 26.0361 27.7256C26.5459 27.626 27.041 27.5029 27.5215 27.3564V28.6572C27.0527 28.833 26.5605 28.9619 26.0449 29.0439C25.5293 29.1318 24.917 29.1758 24.208 29.1758C22.9014 29.1758 21.8086 28.9062 20.9297 28.3672C20.0566 27.8223 19.4004 27.0547 18.9609 26.0645C18.5273 25.0742 18.3105 23.9053 18.3105 22.5576C18.3105 21.585 18.4453 20.6973 18.7148 19.8945C18.9902 19.0859 19.3887 18.3887 19.9102 17.8027C20.4375 17.2168 21.082 16.7656 21.8438 16.4492C22.6113 16.127 23.4902 15.9658 24.4805 15.9658C25.1309 15.9658 25.7578 16.0303 26.3613 16.1592C26.9648 16.2881 27.5098 16.4727 27.9961 16.7129L27.3984 17.9785C26.9883 17.791 26.5371 17.6299 26.0449 17.4951C25.5586 17.3545 25.0312 17.2842 24.4629 17.2842ZM34.4648 19.1914C34.6582 19.1914 34.8604 19.2031 35.0713 19.2266C35.2822 19.2441 35.4697 19.2705 35.6338 19.3057L35.4492 20.6592C35.291 20.6182 35.1152 20.5859 34.9219 20.5625C34.7285 20.5391 34.5469 20.5273 34.377 20.5273C33.9902 20.5273 33.624 20.6064 33.2783 20.7646C32.9385 20.917 32.6396 21.1396 32.3818 21.4326C32.124 21.7197 31.9219 22.0684 31.7754 22.4785C31.6289 22.8828 31.5557 23.334 31.5557 23.832V29H30.0879V19.3672H31.3008L31.459 21.1426H31.5205C31.7197 20.7852 31.96 20.46 32.2412 20.167C32.5225 19.8682 32.8477 19.6309 33.2168 19.4551C33.5918 19.2793 34.0078 19.1914 34.4648 19.1914ZM41.1621 19.1914C41.9824 19.1914 42.6855 19.373 43.2715 19.7363C43.8574 20.0996 44.3057 20.6094 44.6162 21.2656C44.9268 21.916 45.082 22.6777 45.082 23.5508V24.4561H38.4287C38.4463 25.5869 38.7275 26.4482 39.2725 27.04C39.8174 27.6318 40.585 27.9277 41.5752 27.9277C42.1846 27.9277 42.7236 27.8721 43.1924 27.7607C43.6611 27.6494 44.1475 27.4854 44.6514 27.2686V28.5518C44.165 28.7686 43.6816 28.9268 43.2012 29.0264C42.7266 29.126 42.1641 29.1758 41.5137 29.1758C40.5879 29.1758 39.7793 28.9883 39.0879 28.6133C38.4023 28.2324 37.8691 27.6758 37.4883 26.9434C37.1074 26.2109 36.917 25.3145 36.917 24.2539C36.917 23.2168 37.0898 22.3203 37.4355 21.5645C37.7871 20.8027 38.2793 20.2168 38.9121 19.8066C39.5508 19.3965 40.3008 19.1914 41.1621 19.1914ZM41.1445 20.3867C40.3652 20.3867 39.7441 20.6416 39.2812 21.1514C38.8184 21.6611 38.543 22.373 38.4551 23.2871H43.5527C43.5469 22.7129 43.4561 22.209 43.2803 21.7754C43.1104 21.3359 42.8496 20.9961 42.498 20.7559C42.1465 20.5098 41.6953 20.3867 41.1445 20.3867ZM51.1641 19.209C52.3125 19.209 53.165 19.4668 53.7217 19.9824C54.2783 20.498 54.5566 21.3213 54.5566 22.4521V29H53.4932L53.2119 27.5762H53.1416C52.8721 27.9277 52.5908 28.2236 52.2979 28.4639C52.0049 28.6982 51.665 28.877 51.2783 29C50.8975 29.1172 50.4287 29.1758 49.8721 29.1758C49.2861 29.1758 48.7646 29.0732 48.3076 28.8682C47.8564 28.6631 47.499 28.3525 47.2354 27.9365C46.9775 27.5205 46.8486 26.9932 46.8486 26.3545C46.8486 25.3936 47.2295 24.6553 47.9912 24.1396C48.7529 23.624 49.9131 23.3428 51.4717 23.2959L53.1328 23.2256V22.6367C53.1328 21.8047 52.9541 21.2217 52.5967 20.8877C52.2393 20.5537 51.7354 20.3867 51.085 20.3867C50.5811 20.3867 50.1006 20.46 49.6436 20.6064C49.1865 20.7529 48.7529 20.9258 48.3428 21.125L47.8945 20.0176C48.3281 19.7949 48.8262 19.6045 49.3887 19.4463C49.9512 19.2881 50.543 19.209 51.1641 19.209ZM53.1152 24.2539L51.6475 24.3154C50.4463 24.3623 49.5996 24.5586 49.1074 24.9043C48.6152 25.25 48.3691 25.7393 48.3691 26.3721C48.3691 26.9229 48.5361 27.3301 48.8701 27.5938C49.2041 27.8574 49.6465 27.9893 50.1973 27.9893C51.0527 27.9893 51.7529 27.752 52.2979 27.2773C52.8428 26.8027 53.1152 26.0908 53.1152 25.1416V24.2539ZM60.6738 27.9805C60.9141 27.9805 61.1602 27.96 61.4121 27.9189C61.6641 27.8779 61.8691 27.8281 62.0273 27.7695V28.9033C61.8574 28.9795 61.6201 29.0439 61.3154 29.0967C61.0166 29.1494 60.7236 29.1758 60.4365 29.1758C59.9268 29.1758 59.4639 29.0879 59.0479 28.9121C58.6318 28.7305 58.2979 28.4258 58.0459 27.998C57.7998 27.5703 57.6768 26.9785 57.6768 26.2227V20.5098H56.3057V19.7979L57.6855 19.2266L58.2656 17.1348H59.1445V19.3672H61.9658V20.5098H59.1445V26.1787C59.1445 26.7822 59.2822 27.2334 59.5576 27.5322C59.8389 27.8311 60.2109 27.9805 60.6738 27.9805ZM67.6875 19.1914C68.5078 19.1914 69.2109 19.373 69.7969 19.7363C70.3828 20.0996 70.8311 20.6094 71.1416 21.2656C71.4521 21.916 71.6074 22.6777 71.6074 23.5508V24.4561H64.9541C64.9717 25.5869 65.2529 26.4482 65.7979 27.04C66.3428 27.6318 67.1104 27.9277 68.1006 27.9277C68.71 27.9277 69.249 27.8721 69.7178 27.7607C70.1865 27.6494 70.6729 27.4854 71.1768 27.2686V28.5518C70.6904 28.7686 70.207 28.9268 69.7266 29.0264C69.252 29.126 68.6895 29.1758 68.0391 29.1758C67.1133 29.1758 66.3047 28.9883 65.6133 28.6133C64.9277 28.2324 64.3945 27.6758 64.0137 26.9434C63.6328 26.2109 63.4424 25.3145 63.4424 24.2539C63.4424 23.2168 63.6152 22.3203 63.9609 21.5645C64.3125 20.8027 64.8047 20.2168 65.4375 19.8066C66.0762 19.3965 66.8262 19.1914 67.6875 19.1914ZM67.6699 20.3867C66.8906 20.3867 66.2695 20.6416 65.8066 21.1514C65.3438 21.6611 65.0684 22.373 64.9805 23.2871H70.0781C70.0723 22.7129 69.9814 22.209 69.8057 21.7754C69.6357 21.3359 69.375 20.9961 69.0234 20.7559C68.6719 20.5098 68.2207 20.3867 67.6699 20.3867ZM86.1357 29H78.9814V16.1504H86.1357V17.4688H80.4756V21.626H85.8105V22.9268H80.4756V27.6816H86.1357V29ZM90.8818 29L87.2256 19.3672H88.79L90.9082 25.1943C91.0547 25.5928 91.2041 26.0322 91.3564 26.5127C91.5088 26.9932 91.6143 27.3799 91.6729 27.6729H91.7344C91.8047 27.3799 91.9219 26.9932 92.0859 26.5127C92.25 26.0264 92.3994 25.5869 92.5342 25.1943L94.6523 19.3672H96.2168L92.5518 29H90.8818ZM101.473 19.1914C102.293 19.1914 102.996 19.373 103.582 19.7363C104.168 20.0996 104.616 20.6094 104.927 21.2656C105.237 21.916 105.393 22.6777 105.393 23.5508V24.4561H98.7393C98.7568 25.5869 99.0381 26.4482 99.583 27.04C100.128 27.6318 100.896 27.9277 101.886 27.9277C102.495 27.9277 103.034 27.8721 103.503 27.7607C103.972 27.6494 104.458 27.4854 104.962 27.2686V28.5518C104.476 28.7686 103.992 28.9268 103.512 29.0264C103.037 29.126 102.475 29.1758 101.824 29.1758C100.898 29.1758 100.09 28.9883 99.3984 28.6133C98.7129 28.2324 98.1797 27.6758 97.7988 26.9434C97.418 26.2109 97.2275 25.3145 97.2275 24.2539C97.2275 23.2168 97.4004 22.3203 97.7461 21.5645C98.0977 20.8027 98.5898 20.2168 99.2227 19.8066C99.8613 19.3965 100.611 19.1914 101.473 19.1914ZM101.455 20.3867C100.676 20.3867 100.055 20.6416 99.5918 21.1514C99.1289 21.6611 98.8535 22.373 98.7656 23.2871H103.863C103.857 22.7129 103.767 22.209 103.591 21.7754C103.421 21.3359 103.16 20.9961 102.809 20.7559C102.457 20.5098 102.006 20.3867 101.455 20.3867ZM112.433 19.1914C113.575 19.1914 114.439 19.4727 115.025 20.0352C115.611 20.5918 115.904 21.4883 115.904 22.7246V29H114.463V22.8213C114.463 22.0186 114.278 21.418 113.909 21.0195C113.546 20.6211 112.986 20.4219 112.23 20.4219C111.164 20.4219 110.414 20.7236 109.98 21.3271C109.547 21.9307 109.33 22.8066 109.33 23.9551V29H107.871V19.3672H109.049L109.269 20.7559H109.348C109.553 20.416 109.813 20.1318 110.13 19.9033C110.446 19.6689 110.801 19.4932 111.193 19.376C111.586 19.2529 111.999 19.1914 112.433 19.1914ZM122.021 27.9805C122.262 27.9805 122.508 27.96 122.76 27.9189C123.012 27.8779 123.217 27.8281 123.375 27.7695V28.9033C123.205 28.9795 122.968 29.0439 122.663 29.0967C122.364 29.1494 122.071 29.1758 121.784 29.1758C121.274 29.1758 120.812 29.0879 120.396 28.9121C119.979 28.7305 119.646 28.4258 119.394 27.998C119.147 27.5703 119.024 26.9785 119.024 26.2227V20.5098H117.653V19.7979L119.033 19.2266L119.613 17.1348H120.492V19.3672H123.313V20.5098H120.492V26.1787C120.492 26.7822 120.63 27.2334 120.905 27.5322C121.187 27.8311 121.559 27.9805 122.021 27.9805Z" fill="white"/>
        </svg>
      </a>
      

    </div>
    <!-- Container that holds current, past, and previous events -->
    <div class="flex flex-row h-[80%] w-[90%] ml-[5%] mt-[1.3%]">

      <!-- Left container that holds the past and ongoing events -->
      <div class = "flex flex-col h-[100%] w-[50%]  ml-[0%]">
        <!-- Ongoing/Past events -->
        <div class = "flex flex-col w-[90%] ml-[5.9%] h-full">
          <!-- Ongoing events Label above card -->
          <p class = "inline-block max-w-full  px-0 py-4" style="font-size: 18px; font-weight:628;">Ongoing Events</p>
          <!-- Card container -->
          <div class="flex flex-row h-80 w-[100%] drop-shadow-xl flex-grow-0">
            <!-- Image for card -->
            <div class = "w-[40%] h-full flex-shrink-0">
              <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
            </div>
            <!-- Text section for card -->
            <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
              <p class = "pt-1 px-2 font-semibold">{relevantEvents.ongoingEvent?.Name}</p>
              <p class = "pt-1 px-2" style="font-size: 12px;">{relevantEvents.ongoingEvent?.StartsAt} to {relevantEvents.ongoingEvent?.EndsAt}</p>
              <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> {relevantEvents.ongoingEvent?.Description}</p>
            </div>
          </div>
        
          
          <!-- Past Events Label above card -->
          <p class = "inline-block max-w-full  pt-4 px-0" style="font-size: 18px; font-weight:628;">Past Events</p>
          <!-- Card container -->
          <div class="flex flex-row h-80 w-[100%] drop-shadow-xl flex-grow-0 pt-4">
            <!-- Image for card -->
            <div class = "w-[40%] flex-shrink-0 h-full">
              <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_3.jpg" alt="Scenery">
            </div>
            <!-- Text section for card -->
            <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
              <p class = "pt-1 px-2 font-semibold">Walktober 2023</p>
              <p class = "pt-1 px-2" style="font-size: 12px;">From 10/01/2023 to 10/31/2023</p>
              <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> {card_text}</p>
            </div>
          </div>
          <!-- Second card in past events -->
          <div class="flex flex-row h-80 w-[100%] drop-shadow-xl flex-grow-0 mt-2">
            <!-- Image for card -->
            <div class = "w-[40%] h-[100%] flex-shrink-0">
              <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_shot.jpg" alt="Scenery">
            </div>
            <!-- Text section for card -->
            <div class="flex flex-col h-[100%] w-[100%] card-border flex-grow-0 overflow-hidden">
              <p class = "pt-1 px-2 font-semibold">Walktober 2023</p>
              <p class = "pt-1 px-2" style="font-size: 12px;">From 10/01/2023 to 10/31/2023</p>
              <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> {card_text}</p>
            </div>
            
  
          </div>
        
        </div>
      </div>
      
      <!-- Right container that holds upcoming events  -->
      <div class="flex flex-col w-[50%] h-[100%]">
        <!-- Ongoing events container -->
        <div class = "flex flex-col w-[90%] h-[64.5%]  ml-[5.9%] flex-grow-0">
          <!-- Ongoing events Label above card -->
          <p class = "inline-block max-w-full  px-0 py-4" style="font-size: 18px; font-weight:628;">Upcoming Events</p>
          <!-- Card container -->
          <div class="flex flex-row h-80 w-[100%] drop-shadow-xl flex-grow-0">
            <!-- Image for card -->
            <div class = "w-[40%] flex-shrink-0 h-full">
              <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_4.jpg" alt="Scenery">
            </div>
            <!-- Text section for card -->
            <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
              <p class = "pt-1 px-2 font-semibold">Walktober 2023</p>
              <p class = "pt-1 px-2" style="font-size: 12px;">From 10/01/2023 to 10/31/2023</p>
              <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> {card_text}</p>
            </div>
          </div>
          <!-- Second card in ongoing events -->
          <div class="flex flex-row h-80 w-[100%] drop-shadow-xl flex-grow-0 mt-2">
            <!-- Image for card -->
            <div class = "w-[40%] h-full flex-shrink-0">
              <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_5.jpg" alt="Scenery">
            </div>
            <!-- Text section for card -->
            <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
              <p class = "pt-1 px-2 font-semibold">Walktober 2023</p>
              <p class = "pt-1 px-2" style="font-size: 12px;">From 10/01/2023 to 10/31/2023</p>
              <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> {card_text}</p>
            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  </div>
  




</div>
  
  
</Layout>


<style>
  .event-word {
    font-style: normal;
    font-weight: 628;
    font-size: 28px;
    line-height: 44px;

  }
  .card-border {

    box-sizing: border-box;
    background: #FFFFFF;
    border: 0.5px solid #c7c7cd;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;

  }
</style>