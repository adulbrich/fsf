<script>
       export let data;
       import Layout from '../../banner-layout.svelte';
</script>


<svelte:head>
       <title>
              Event | Top Teams & Participants
       </title>
</svelte:head>


<Layout>
       <div class='container flex-1 ml-[16%]'>

              <nav class="bg-white border-gray-200 dark:bg-gray-300">
                     <div class="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4">

                            <a href="/events" class="block py-2 px-3 text-black bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-orange-500">
                                   
                                   <h2 class= 'leading-none rounded tracking-tight text-gray-900 dark:text-white font-medium'>
                                          { data.event_data.Name }
                                   </h2>

                             </a>

                       <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                           <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                               <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                           </svg>
                       </button>

                       <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                         <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-300 md:dark:bg-gray-300 dark:border-gray-300">
                           <li>
                             <a href="#" class="block py-2 px-3 text-black rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-orange-500" aria-current="page">Overview</a>
                           </li>
                           <li>
                             <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Particpants</a>
                           </li>
                           <li>
                             <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Teams</a>
                           </li>
                           <li>
                             <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Acheivements</a>
                           </li>
                           <li>
                             <a href="#" class="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-orange-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Settings</a>
                           </li>
                         </ul>
                       </div>
                     </div>
                   </nav>


                <div class='container px-3'>
                  
                  <h2 class="mt-4 mb-2 text-lg font-semibold">Teams Registered</h2>
                  <ul class="max-w-md space-y-1 list-disc list-inside">
                    <ul>
                          {#each data.team_event_connection as team_in_event}
                            <li>{team_in_event.Name}</li>
                          {/each}
                        </ul>
                  </ul>

                 </div>
                                    
       </div>
</Layout>