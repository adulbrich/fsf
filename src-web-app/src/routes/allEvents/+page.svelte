<!-- This .svelte file contains the content for viewing all events.  It is accessed by clicking more in /events -->
<script lang="ts">
    import { goto } from '$app/navigation';
    import Layout from '../banner-layout.svelte'
    export let data;
    let { supabase } = data;
    $: ({ supabase } = data);
    let card_text = "";
    let char_lim = 140;
    $: card_text = card_text.length > char_lim
      ? card_text.slice(0, char_lim) + '...'
      : card_text;
    
    const handleSignOut = async () => {
      await supabase.auth.signOut();
      goto('/');
    }
  </script>
  
  <svelte:head>
    <title>Events | DamFit</title>
  </svelte:head>
  
  <Layout>
  
  <div class = "flex ml-[16%]">
    <!-- Cotnainer for all entities to the right of the navbar -->
    <div class="flex flex-col w-[100%] h-[100%]">
      <!-- Top container that holds searchbar, "Events", search icon, and the create event button -->
      <div class="flex flex-row w-[90%] h-[10%] custom-border">
        <!-- Back button and Type of event container-->
        <div class="flex flex-row mt-3 ml-8">
            <svg class= "mr-3" style = "margin-top:5.7px" width="60" height="30" viewBox="0 0 91 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 19.6951C0 8.81778 8.81778 0 19.6951 0H71.3049C82.1822 0 91 8.81778 91 19.6951C91 30.5724 82.1822 39.3901 71.3049 39.3901H19.6951C8.81778 39.3901 0 30.5724 0 19.6951Z" fill="#D73F09"/>
                <path d="M27.3943 12.8755H31.033C32.6385 12.8755 33.8455 13.1157 34.6541 13.5962C35.4627 14.0767 35.867 14.894 35.867 16.0483C35.867 16.5464 35.7703 16.9946 35.577 17.3931C35.3895 17.7856 35.1141 18.1108 34.7508 18.3687C34.3875 18.6265 33.9393 18.8052 33.4061 18.9048V18.9927C33.9686 19.0806 34.4666 19.2417 34.9002 19.4761C35.3338 19.7104 35.6736 20.0386 35.9197 20.4604C36.1658 20.8823 36.2889 21.4185 36.2889 22.0688C36.2889 22.8599 36.1043 23.5278 35.7352 24.0728C35.3719 24.6177 34.8563 25.0308 34.1883 25.312C33.5203 25.5874 32.7293 25.7251 31.8152 25.7251H27.3943V12.8755ZM28.8885 18.3862H31.3494C32.4686 18.3862 33.242 18.2017 33.6697 17.8325C34.1033 17.4634 34.3201 16.9243 34.3201 16.2153C34.3201 15.4829 34.0623 14.9556 33.5467 14.6333C33.0369 14.311 32.2225 14.1499 31.1033 14.1499H28.8885V18.3862ZM28.8885 19.6431V24.4507H31.5604C32.7029 24.4507 33.5115 24.228 33.9861 23.7827C34.4608 23.3315 34.6981 22.7251 34.6981 21.9634C34.6981 21.4771 34.5897 21.061 34.3729 20.7153C34.1619 20.3696 33.8162 20.106 33.3358 19.9243C32.8611 19.7368 32.2254 19.6431 31.4285 19.6431H28.8885ZM42.4149 15.9341C43.5633 15.9341 44.4158 16.1919 44.9725 16.7075C45.5291 17.2231 45.8074 18.0464 45.8074 19.1772V25.7251H44.744L44.4627 24.3013H44.3924C44.1229 24.6528 43.8416 24.9487 43.5486 25.189C43.2557 25.4233 42.9158 25.6021 42.5291 25.7251C42.1483 25.8423 41.6795 25.9009 41.1229 25.9009C40.5369 25.9009 40.0154 25.7983 39.5584 25.5933C39.1072 25.3882 38.7498 25.0776 38.4861 24.6616C38.2283 24.2456 38.0994 23.7183 38.0994 23.0796C38.0994 22.1187 38.4803 21.3804 39.242 20.8647C40.0037 20.3491 41.1639 20.0679 42.7225 20.021L44.3836 19.9507V19.3618C44.3836 18.5298 44.2049 17.9468 43.8475 17.6128C43.49 17.2788 42.9861 17.1118 42.3358 17.1118C41.8318 17.1118 41.3514 17.1851 40.8943 17.3315C40.4373 17.478 40.0037 17.6509 39.5936 17.8501L39.1453 16.7427C39.5789 16.52 40.077 16.3296 40.6395 16.1714C41.202 16.0132 41.7938 15.9341 42.4149 15.9341ZM44.366 20.979L42.8983 21.0405C41.6971 21.0874 40.8504 21.2837 40.3582 21.6294C39.866 21.9751 39.6199 22.4644 39.6199 23.0972C39.6199 23.6479 39.7869 24.0552 40.1209 24.3188C40.4549 24.5825 40.8973 24.7144 41.4481 24.7144C42.3035 24.7144 43.0037 24.4771 43.5486 24.0024C44.0936 23.5278 44.366 22.8159 44.366 21.8667V20.979ZM52.6717 25.9009C51.8045 25.9009 51.0399 25.7222 50.3777 25.3647C49.7156 25.0073 49.2 24.4624 48.8309 23.73C48.4617 22.9976 48.2772 22.0747 48.2772 20.9614C48.2772 19.7954 48.4705 18.8433 48.8572 18.105C49.2498 17.3608 49.7889 16.8101 50.4744 16.4526C51.16 16.0952 51.9393 15.9165 52.8123 15.9165C53.2928 15.9165 53.7557 15.9663 54.201 16.0659C54.6522 16.1597 55.0213 16.2798 55.3084 16.4263L54.869 17.6479C54.576 17.5308 54.2361 17.4253 53.8494 17.3315C53.4686 17.2378 53.1111 17.1909 52.7772 17.1909C52.1092 17.1909 51.5525 17.3345 51.1072 17.6216C50.6678 17.9087 50.3367 18.3306 50.1141 18.8872C49.8973 19.4438 49.7889 20.1294 49.7889 20.9438C49.7889 21.7231 49.8943 22.3882 50.1053 22.939C50.3221 23.4897 50.6414 23.9116 51.0633 24.2046C51.491 24.4917 52.0242 24.6353 52.6629 24.6353C53.1727 24.6353 53.6326 24.5825 54.0428 24.4771C54.4529 24.3657 54.825 24.2368 55.159 24.0903V25.3911C54.8367 25.5552 54.4764 25.6812 54.0779 25.769C53.6854 25.8569 53.2166 25.9009 52.6717 25.9009ZM58.8943 12.0493V19.1509C58.8943 19.3853 58.8856 19.6724 58.868 20.0122C58.8504 20.3462 58.8358 20.6421 58.824 20.8999H58.8856C59.0086 20.7476 59.1873 20.522 59.4217 20.2231C59.6619 19.9243 59.8641 19.6841 60.0281 19.5024L63.2274 16.0923H64.9412L61.0652 20.2056L65.2225 25.7251H63.4647L60.0633 21.1636L58.8943 22.2358V25.7251H57.4442V12.0493H58.8943Z" fill="white"/>
            </svg>
            <p class = "inline-block h-fit" style="font-size: 25px; font-weight:628;">Past Events</p>
        </div>
        
        
        

  
      </div>
      <!-- Container that holds current, past, and previous events -->
      <div class="flex flex-row h-[75%] w-[90%] ml-[5%] mt-[.5%] custom-border">
  
        <!-- Left container that holds the past and ongoing events -->
        <div class = "flex flex-col h-[90%] w-[50%]  ml-[0%] custom-border">
          <!-- Ongoing/Past events -->
          <div class = "flex flex-col w-[90%] ml-[5.9%] h-full">
            <!-- Ongoing events Label above card -->
            
            <!-- Card container -->
            <div class="flex flex-row h-80 w-[100%] drop-shadow-xl flex-grow-0 pt-2">
                <!-- Image for card -->
                <div class = "w-[40%] flex-shrink-0 h-full">
                  <img class="h-[100%] w-[100%]" style = "border-top-left-radius: 10px; border-bottom-left-radius: 10px;" src="../../aerial_3.jpg" alt="Scenery">
                </div>
                <!-- Text section for card -->
                <div class="flex flex-col h-full w-[100%] card-border flex-grow-0 overflow-hidden">
                  <p class = "pt-1 px-2 font-semibold">Walktober 2023</p>
                  <p class = "pt-1 px-2" style="font-size: 12px;">From 10/01/2023 to 10/31/2023</p>
                  <p class="pt-2 px-2 overflow-hidden whitespace-normal" style="font-size: 12px;"> {card_text}</p>
                </div>
              </div>
          
            
            <!-- Past Events Label above card -->
            
            <!-- Card container -->
            <div class="flex flex-row h-80 w-[100%] drop-shadow-xl flex-grow-0 pt-2">
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
        <!-- Left container that holds the past and ongoing events -->
        <div class = "flex flex-col h-[90%] w-[50%]  ml-[0%] custom-border">
            <!-- Ongoing/Past events -->
            <div class = "flex flex-col w-[90%] ml-[5.9%] h-full">
              <!-- Ongoing events Label above card -->
              
              <!-- Card container -->
              <div class="flex flex-row h-80 w-[100%] drop-shadow-xl flex-grow-0 pt-2">
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
            
              
              <!-- Past Events Label above card -->
              
              <!-- Card container -->
              <div class="flex flex-row h-80 w-[100%] drop-shadow-xl flex-grow-0 pt-2">
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
