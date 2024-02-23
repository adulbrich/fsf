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
            <span class='dark:text-white self-center px-2 text-2xl font-semibold whitespace-nowrap'>{data.Event.Name} Participants</span>
          </div>

          <!--Navbar-->
          <nav class='bg-[#898A8D]'>
            <div class='hidden w-full md:block md:w-auto' id='navbar-default'>
              <ul class='font-medium flex p-3'>
            
                <li>
                  <a href='/events/{data.Event?.EventID}' class='block py-1 px-3 dark:text-white' aria-current="page">Overview</a>
                </li>

                <li>
                  <a href='/events/{data.Event?.EventID}/Teams' class='block py-1 px-3 dark:text-white md:hover:text-orange-500'>Teams</a>
                </li>

                <li>
                  <a href='#' class='block py-1 px-3 dark:text-white md:text-black underline' aria-current="page">Participants</a>
                </li>

                <li>
                  <a href='{data.Event?.EventID}/Achievments' class='block py-1 px-3 dark:text-white md:hover:text-orange-500'>Achievements</a>
                </li>

              </ul>
            </div>
          </nav>


          <div class='grid grid-cols-3 gap-4'>

            {#each data.Participants as team}


                {#each team.Profiles as participant}

                    <div class='relative flex flex-col mt-6 text-gray-700 bg-white shadow-xl bg-clip-border rounded-xl w-96'>
                        
                        <div class='p-10'>
                            <h5 class='block mb-2 text-xl antialiased font-semibold leading-snug tracking-normal'>{participant.Name}</h5>
                            <p>Joined {participant.CreatedAt.slice(0,10)}</p>

                        </div>

                    </div>

                {/each}
            {/each}

      </div>



    </div>

</Layout>