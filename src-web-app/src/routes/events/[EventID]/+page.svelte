<script>
  import Layout from '../../banner-layout.svelte';
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

          <div class='max-w-screen-xl max-auto p-4 bg-white'>
            <span class='text-stone-950 self-center px-2 text-2xl font-semibold whitespace-nowrap'>{data.eventDetails.Name}</span>
          </div>

          <!-- Navbar -->
        
          <nav class='navbar'>
            <div class='hidden w-full md:block md:w-auto' id='navbar-default'>
              <ul class='font-medium flex p-3'>
                <li>
                  <a href='#' class='text-lg block py-1 px-3 dark:text-white md:text-black underline' aria-current="page">Overview</a>
                </li>
                <li>
                  <a href='{data.eventDetails?.EventID}/Teams' class='text-lg block py-1 px-3 dark:text-white md:text-black'>Teams</a>
                </li>
              </ul>
            </div>
          </nav>


          <!--Container for Left and Right Columns-->
          <div class='grid grid-cols-2 gap-4 p-4 py-8'>

           <!--Container for Left Side (Event Details)-->

            <div class=' text-center py-5'>
              <!--Event Title and Description-->
              <div >
                <h2 class='font-bold text-xl'>A little about {data.eventDetails?.Name}!</h2>
              </div>

              <p class='py-3 px-3 leading-loose'>{data.eventDetails.Description}</p>


                <!--Start and End Dates-->
               <div class='py-3 flex justify-around'>
                  <div>
                    <span class='font-bold py-3'>Start date</span>
                    <div class='py-3'>
                      {data.eventDetails?.StartsAt.slice(0,10)}
                    </div>
                  </div>

                  <div> 
                    <span class='font-bold py-3'>End date</span>
                    <div class='py-3'>
                      {data.eventDetails?.EndsAt.slice(0,10)}
                    </div>
                  </div>
               </div>


               <!--What are partipants collecting-->
               <div class='py-5'>

                <div>
                  <h2 class='font-bold'>What are partipants collecting?</h2>

                  <div class='py-3'>
                    <span class='font-semibold'>Leaves</span> <i class="fa fa-leaf fa-2x"></i></div>
                  </div>

               </div>


               <!--Daily Tiers-->
              <div class='py-9'>
                <h2 class='font-bold'>Daily Tiers</h2>

                <div class='py-3 flex justify-around'>

                  <div>3000 <i class="fa fa-leaf"></i></div>
                  <div>6000 <i class="fa fa-leaf"></i></div>
                  <div>12,000 <i class="fa fa-leaf"></i></div>

                </div>
              </div>


            </div>

            <!--Container for right side (Event Picture)-->
            <div class="flex justify-center items-center">
              <img class="object-cover w-80 h-80 md:w-110 md:h-110 rounded-full" src={data.testsigned?.signedUrl} />
            </div>

          </div>

       </div>

</Layout>