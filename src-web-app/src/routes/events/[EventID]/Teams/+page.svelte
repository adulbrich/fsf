<script lang="ts">
    export let data;
    import Layout from '../../../banner-layout.svelte';

    let searchQuery = '';

    function filterTeamsAndMembers() {
      const rows = document.querySelectorAll('.team-row');
      rows.forEach((row) => {
        const teamName = row.querySelector('.text-lg').innerText.toLowerCase();
        const teamMembers = Array.from(row.querySelectorAll('.hidden li')).map((member) =>
          member.innerText.toLowerCase()
        );

        const display =
          teamName.includes(searchQuery.toLowerCase()) ||
          teamMembers.some((memberName) => memberName.includes(searchQuery.toLowerCase()))
            ? 'table-row'
            : 'none';

        row.style.display = display;
      });
    }

    function toggleTeamMembers(teamID) {
      console.log("toggle team members on team id: " + teamID);
      const row = document.querySelector(`.team-row[data-id="${teamID}"]`);
      const teamMembers = row.querySelector('.hidden');

      // Check if the team members are visible
      const isExpanded = getComputedStyle(teamMembers).display !== 'none';

      if (isExpanded) {
          console.log("contains visible...");
          // If team members are visible, hide them
          teamMembers.style.display = 'none';
          row.style.borderBottom = '1px solid #e2e8f0';
          row.style.boxShadow = 'none';
      } else {
          console.log("contains hidden...");
          // If team members are hidden, show them
          teamMembers.style.display = 'table-row';
          row.style.borderBottom = 'none';
          row.style.boxShadow = '0px 8px 16px rgba(0, 0, 0, 0.1)';
      }
    }

</script>


<svelte:head>
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

    <title>
           Event | Top Teams & Participants
    </title>

    <style>
      .team-row {
        @apply transition-all ease-out bg-gray-100 rounded-lg;
    
        &:hover {
          @apply bg-gray-200;
        }
      }
    </style>

</svelte:head>


<Layout>

    <div class='container ml-[16%]'>

        <div class='max-w-screen-xl max-auto p-4 bg-white'>
            <span class='text-stone-950 self-center px-2 text-2xl font-semibold whitespace-nowrap'>{data.Event?.Name}</span>
          </div>

          <nav class='bg-white'>
            <div class='hidden w-full md:block md:w-auto' id='navbar-default'>
              <ul class='font-medium flex p-3'>
            
                <li>
                  <a href='/events/{data.Event?.EventID}' class='text-lg block py-1 px-3 dark:text-white md:text-black'>Overview</a>
                </li>

                <li>
                  <a href='/events/{data.Event?.EventID}/Teams' class='text-lg block py-1 px-3 dark:text-white md:text-black underline' aria-current="page">Teams</a>
                </li>

              </ul>
            </div>
          </nav>     

          <!--Teams -->
          <!--Table of teams where each row is a team and when you click on team the table expands downwards to show members-->
          <div class="max-w-full p-4 mx-auto">
            <!-- Search Bar -->
            <input
                type="text"
                placeholder="Search teams or participants..."
                class="w-full p-2 border border-gray-300 rounded-md mb-4"
                bind:value={searchQuery}
                on:input={() => filterTeamsAndMembers()}
            />

            <table class="table-auto w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead>
                    <tr class="bg-gray-200">
                        <th class="px-4 py-2">Team Name</th>
                    </tr>
                </thead>
                <tbody>
                  {#each data.Teams as team (team.TeamID)}
                    <tr class="border-b border-gray-300 team-row" data-id={team.TeamID} style="transition: all 0.3s ease-out;">
                      <td class="px-4 py-2 cursor-pointer" on:click={() => toggleTeamMembers(team.TeamID)}>
                        <div class="flex items-center justify-between">
                          <span class="text-lg">{team.Name}</span>
                          <i class="fa fa-chevron-down ml-2"></i>
                        </div>
                        <div class="hidden mt-2">
                              <ul class="list-none ml-8">
                                  {#each team.Profiles as member}
                                    <li>{member.Name}</li>
                                  {/each}
                              </ul>
                          </div>
                        </td>
                    </tr>
                    {/each}
                </tbody>
            </table>
          </div>             
    </div>

</Layout>