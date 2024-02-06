

<script lang="ts">
    import Layout from '../../banner-layout.svelte';
    
    import { getContext } from 'svelte';
    import { onMount } from 'svelte';
    import { page } from '$app/stores'
    
  interface Event {
    Name: string;
    Type: string;
    StartsAt: string;
    EndsAt: string;
    Status: string;
    Description: string;

  }


  let events: Event[] = [];
  



    
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
    <h1 class="event-word mr-36">Events</h1>
    
    
    </div>
  <!-- Container for Events -->
  <div class="container ml-[16%] w-auto h-[75%] mt-8 flex flex-wrap justify-between">
    
    <!-- ROW 1 COL 1 -->
    <div class="w-1/3 pt-1 custom-border ml-36 drop-shadow-xl flex flex-column 1/8">
      <div class = "w-[40%] h-full">
        <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
      </div>
      
      <!-- Text section for card -->
      <div class="flex flex-col w-2/3 card-border overflow-hidden h-full">
        <p class = "pt-1 px-2 font-semibold">Walktober</p>
        <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
        <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
      </div>
    </div>
    
    <!-- ROW 1 COL 2 -->
    <div class="w-1/3 pt-1 custom-border mr-36 drop-shadow-xl flex flex-column 1/8">
      <div class = "w-[40%] h-full">
        <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
      </div>
      
      <!-- Text section for card -->
      <div class="flex flex-col w-2/3 card-border overflow-hidden h-full">
        <p class = "pt-1 px-2 font-semibold">Walktober</p>
        <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
        <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
      </div>
    </div>
  
    <!-- ROW 2 COL 1 -->
    <div class="w-1/3 pt-1 custom-border ml-36 drop-shadow-xl flex flex-column 1/8">
      <div class = "w-[40%] h-full">
        <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
      </div>
      
      <!-- Text section for card -->
      <div class="flex flex-col w-2/3 card-border overflow-hidden h-full">
        <p class = "pt-1 px-2 font-semibold">Walktober</p>
        <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
        <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
      </div>
    </div>
    
    <!-- ROW 2 COL 2 -->
    <div class="w-1/3 custom-border pt-1 mr-36 drop-shadow-xl flex flex-column 1/8">
      <div class = "w-[40%] h-full">
        <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
      </div>
      
      <!-- Text section for card -->
      <div class="flex flex-col w-2/3 card-border overflow-hidden h-full">
        <p class = "pt-1 px-2 font-semibold">Walktober</p>
        <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
        <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
      </div>
    </div>
  
    <!-- ROW 3 COL 1 -->
    <div class="w-1/3 custom-border pt-1 ml-36 drop-shadow-xl flex flex-column 1/8">
      <div class = "w-[40%] h-full">
        <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
      </div>
      
      <!-- Text section for card -->
      <div class="flex flex-col pt-1 w-2/3 card-border overflow-hidden h-full">
        <p class = "pt-1 px-2 font-semibold">Walktober</p>
        <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
        <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
      </div>
    </div>
    <!-- ROW 3 COL 2 -->
    <div class="w-1/3 pt-1 custom-border mr-36 drop-shadow-xl flex flex-column 1/8">
      <div class = "w-[40%] h-full">
        <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
      </div>
      
      <!-- Text section for card -->
      <div class="flex flex-col w-2/3 card-border overflow-hidden h-full">
        <p class = "pt-1 px-2 font-semibold">Walktober</p>
        <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
        <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
      </div>
    </div>

    <!-- ROW 4 COL 2 -->
    <div class="w-1/3 pt-1 custom-border ml-36 drop-shadow-xl flex flex-column 1/8">
      <div class = "w-[40%] h-full">
        <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
      </div>
      
      <!-- Text section for card -->
      <div class="flex flex-col w-2/3 card-border overflow-hidden h-full">
        <p class = "pt-1 px-2 font-semibold">Walktober</p>
        <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
        <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
      </div>
    </div>
    <!-- ROW 4 COL 2 -->
    <div class="w-1/3 pt-1 custom-border mr-36 drop-shadow-xl flex flex-column 1/8">
      <div class = "w-[40%] h-full">
        <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
      </div>
      
      <!-- Text section for card -->
      <div class="flex flex-col w-2/3 card-border overflow-hidden h-full">
        <p class = "pt-1 px-2 font-semibold">Walktober</p>
        <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
        <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
      </div>
    </div>
  </div>
 
    
    
    
      
  
  <!-- Container that holds page numbers-->
  <div class="flex justify-between ml-[47.85%] custom-border w-1/5" style="margin-bottom: 15px; margin-top: 20px">
    <div class="mb-0 ml-20 w-10 h-10 bg-beaver-orange rounded-full flex items-center justify-center text-white">1</div>
    <div class="mb-0 mx-1 w-10 h-10 bg-light-black rounded-full flex items-center justify-center text-white">2</div>
    <div class=" mb-0 mr-20 w-10 h-10 bg-light-black rounded-full flex items-center justify-center text-white">3</div>
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
    .custom-border {
      /* box-sizing: border-box;
      background: #FFFFFF; 
      border: 0.5px solid #c7c7cd;
      border-radius: 10px;  */
    }
    
  </style>