<script>
  import Layout from '../../../banner-layout.svelte';
  export let data;
  

</script>


<svelte:head>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

       <title>
              Event | Top Teams & Participants
       </title>

       <style>
        /* Add your custom styles here */
        .navbar {
          background-color: white;
          color: black;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
    
        .event-picture {
          object-fit: cover;
          border-radius: 50%;
          width: 100%; /* Adjust the width as needed */
          height: 100%; /* Adjust the height as needed */
        }
      </style>
</svelte:head>



<Layout>

       <div class='container ml-[16%] w-auto'>

          <!-- Navbar -->
        
        

          <!--Container for Left and Right Columns-->
          <div class='grid grid-cols-2 gap-4 p-4 py-8'>

           <!--Container for Left Side (Event Details)-->

            <div class='text-left py-5'>
              <!--Event Title and Description-->
              <div >
                <h2 class='font-bold text-xl'>A little about: {data.eventDetails?.Name}!</h2>
              </div>

              <p class='py-3 px-3 leading-loose'>{data.eventDetails.Description}</p>

                <!--Start and End Dates-->
               <div class='py-1'>
                <span class='font-bold py-3 text-xl'>Date and Time</span>

               </div>
                <div class='py-1 leading-loose'>
                  <i class="fa fa-calendar fa-1x"></i>  {data.eventDetails?.StartsAt.slice(0,10)} -- {data.eventDetails?.EndsAt.slice(0,10)}
                </div>


               <!--What are partipants collecting-->
               <div class='py-5'>

                <div>
                  <h2 class='font-bold text-xl'>What to Expect</h2>

                  <div class='py-1'>
                    <span class='font-semi'>Daily {data.eventDetails?.Type} Progress Converts to Leaves</span> <i class="fa fa-leaf fa-2x"></i></div>
                  </div>

               </div>


               <!--Daily Tiers-->
              <div class='py-9'>
                <h2 class='font-bold text-xl'>Daily Tiers</h2>

                <div class='py-3'>

                  <div>Level 1 - 3000 <i class="fa fa-leaf"></i></div>
                  <div>Level 2 - 6000 <i class="fa fa-leaf"></i></div>
                  <div>Level 3 - 12,000 <i class="fa fa-leaf"></i></div>

                </div>
              </div>

              <button>Edit Event</button>
            </div>

            <!--Container for right side (Event Picture)-->
            <div class="flex justify-center items-center">
              <!-- <img class="object-cover w-80 h-80 md:w-110 md:h-110 rounded-full" src={data.testsigned?.signedUrl} /> -->
              <img class="object-cover w-80 h-80 md:w-110 md:h-110 rounded-full" src='http://placekitten.com/g/200/300' />
            </div>

          </div>

       </div>

</Layout>