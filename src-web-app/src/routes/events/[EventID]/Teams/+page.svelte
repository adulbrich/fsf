<script>
    export let data;
    import Layout from '../../../banner-layout.svelte';
</script>


<svelte:head>
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

    <title>
           Event | Top Teams & Participants
    </title>
</svelte:head>

<style type="text/css">
.fa{
color: 
#D73F09
}
</style>

<Layout>

    <div class='container ml-[16%]'>

        <div class='max-w-screen-xl max-auto p-4 bg-[#898A8D]'>
            <span class='dark:text-white self-center px-2 text-2xl font-semibold whitespace-nowrap'>{data.Event?.Name}</span>
          </div>

          <nav class='bg-[#898A8D]'>
            <div class='hidden w-full md:block md:w-auto' id='navbar-default'>
              <ul class='font-medium flex p-3'>
            
                <li>
                  <a href='/events/{data.Event?.EventID}' class='block py-1 px-3 dark:text-white md:hover:text-orange-500'>Overview</a>
                </li>

                <li>
                  <a href='/events/{data.Event?.EventID}/Teams' class='block py-1 px-3 dark:text-white md:text-black underline' aria-current="page">Teams</a>
                </li>

                <li>
                  <a href='/events/{data.Event?.EventID}/Participants' class='block py-1 px-3 dark:text-white md:hover:text-orange-500'>Participants</a>
                </li>

                <li>
                  <a href='#' class='block py-1 px-3 dark:text-white md:hover:text-orange-500'>Achievements</a>
                </li>

              </ul>
            </div>
          </nav>     
          
          <!--Teams -->

          <div class='grid grid-cols-3 gap-4'>

                {#each data.Teams as team}
                    <div class='relative flex flex-col mt-6 text-gray-700 bg-white shadow-xl bg-clip-border rounded-xl w-96'>
                         <div class='p-6'>
                             <h5 class='block mb-2 text-xl antialiased font-semibold leading-snug tracking-normal'>{team.Name}</h5>
                             <p>Established {team.CreatedAt.slice(0,10)}</p>
                             <div class='py-3'>
                               <a href="/events/{data.Event?.EventID}/Teams/{team.TeamID}" class="align-middle select-none font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 bg-gradient-to-tl from-[#F59E0B] to-[#D73F09] hover:shadow-md hover:shadow-[#D73F09] bg-[#D73F09] rounded-xl mt-4">View Members</a>
                              </div>
                           </div>
                    </div>
                {/each}

          </div>

           
            
            
    </div>

</Layout>