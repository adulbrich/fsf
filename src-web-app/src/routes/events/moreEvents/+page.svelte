

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

    <div class = "flex flex-row ml-[16%] h-[100%]">
    <!-- Cotnainer for all entities to the right of the navbar -->
        
    <div class="flex flex-col w-[100%] h-[100%] mt-[5%]">
      <!-- Top container that holds searchbar, "Events", search icon, and the create event button -->
      
      
      <div class="flex flex-row h-[75%] w-[90%] ml-[5%] mt-[.5%] custom-border">
  
        <!-- Left container that holds the past and ongoing events -->
        <div class = "flex flex-col h-[90%] w-[50%]  ml-[0%] custom-border">
          <!-- Ongoing/Past events -->
          <div class = "flex flex-col w-[90%] ml-[5.9%] h-full">
            <!-- Ongoing events Label above card -->
            
            <!-- Card container -->
            <div class="flex flex-row w-[100%] drop-shadow-xl pt-3" style="height: 146px">
                <!-- Image for card -->
                <div class = "w-[40%] h-full flex-shrink-0">
                  <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
                </div>
                
                <!-- Text section for card -->
                <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
                  <p class = "pt-1 px-2 font-semibold">Walktober</p>
                  <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
                  <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
                </div>
                
              </div>
          
            
            <!-- Past Events Label above card -->
            
            <!-- Card container -->
            <div class="flex flex-row w-[100%] drop-shadow-xl pt-3" style="height: 146px">
                <!-- Image for card -->
                <div class = "w-[40%] h-full flex-shrink-0">
                  <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
                </div>
                
                <!-- Text section for card -->
                <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
                  <p class = "pt-1 px-2 font-semibold">Walktober</p>
                  <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
                  <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
                </div>
                
              </div>
            <!-- Second card in past events -->
            <div class="flex flex-row w-[100%] drop-shadow-xl pt-3" style="height: 146px">
                <!-- Image for card -->
                <div class = "w-[40%] h-full flex-shrink-0">
                  <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
                </div>
                
                <!-- Text section for card -->
                <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
                  <p class = "pt-1 px-2 font-semibold">Walktober</p>
                  <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
                  <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
                </div>
                
              </div>
           
            
          
          </div>
        </div>
        <!-- Left container that holds the past and ongoing events -->
        <div class = "flex flex-col h-[90%] w-[50%]  ml-[0%] custom-border">
            <!-- Ongoing/Past events -->
            <div class = "flex flex-col w-[90%] ml-[5.9%] h-full">
              <!-- Ongoing events Label above card -->
              
              <!-- Card container -->
              <div class="flex flex-row w-[100%] drop-shadow-xl pt-3" style="height: 146px">
                <!-- Image for card -->
                <div class = "w-[40%] h-full flex-shrink-0">
                  <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
                </div>
                
                <!-- Text section for card -->
                <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
                  <p class = "pt-1 px-2 font-semibold">Walktober</p>
                  <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
                  <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
                </div>
                
              </div>
            
              
              <!-- Past Events Label above card -->
              
              <!-- Card container -->
              <div class="flex flex-row w-[100%] drop-shadow-xl pt-3" style="height: 146px">
                <!-- Image for card -->
                <div class = "w-[40%] h-full flex-shrink-0">
                  <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
                </div>
                
                <!-- Text section for card -->
                <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
                  <p class = "pt-1 px-2 font-semibold">Walktober</p>
                  <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
                  <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
                </div>
                
              </div>
              
              <!-- Second card in past events -->
              <div class="flex flex-row w-[100%] drop-shadow-xl pt-3" style="height: 146px">
                <!-- Image for card -->
                <div class = "w-[40%] h-full flex-shrink-0">
                  <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_2.jpg" alt="Scenery">
                </div>
                
                <!-- Text section for card -->
                <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
                  <p class = "pt-1 px-2 font-semibold">Walktober</p>
                  <p class = "pt-1 px-2" style="font-size: 12px;">From the to now</p>
                  <p class="pt-2 px-2 overflow-hidden" style="font-size: 12px;"> This is a description</p>
                </div>
                
              </div>
             
              
            
            </div>
          </div>
        
    
        
      </div>
      <!-- Container that holds page numbers-->
    <div class="flex flex-row ml-[45%] custom-border" style="margin-bottom: 15px; margin-top: 20px">
        <div class="mb-0 mx-1 w-10 h-10 bg-beaver-orange rounded-full flex items-center justify-center text-white">1</div>
        <div class="mb-0 mx-1 w-10 h-10 bg-light-black rounded-full flex items-center justify-center text-white">2</div>
        <div class=" mb-0 mx-1 w-10 h-10 bg-light-black rounded-full flex items-center justify-center text-white">3</div>
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