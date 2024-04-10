<script lang="ts">
    export let data;
    import Layout from '../../../../banner-layout.svelte';

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
      }
  
      .team-row:hover {
        @apply bg-gray-200;
      }
  
      .hidden {
        display: none;
      }
    </style>

    
</svelte:head>


<Layout>
    <!--This container should keep eveythgint on the right of the vertical navbar-->
    <div class='container ml-[16%] w-auto'>

          <!--Teams -->
          <div class="max-w-full p-4 mx-auto">
            <!-- Search Bar -->
            <input
                type="text"
                placeholder="Search teams or participants..."
                class="w-full p-2 border border-gray-300 rounded-md mb-4"
                bind:value={searchQuery}
                on:input={() => filterTeamsAndMembers()}
            />

            <!--Table showing the teams and their members when you click on the team, should also show the teams members-->
            <table class="table-auto text-left w-full bg-white border border-gray-300 shadow-md rounded-lg">
              <!--Table Header-->
              <thead>
                  <tr class="bg-gray-200">
                      <th class="px-4 py-2">Team Name</th>

                      <th class='px-4 py-2'>Team Score</th>
                  </tr>
              </thead>
              <tbody>
                <!--Loop through each team-->
                {#each data.Teams as team (team.TeamID)}
                  <tr class="border border-gray-300 team-row w-full" data-id={team.TeamID} style="transition: all 0.3s ease-out;">

                    <td class="px-4 py-2 cursor-pointer" on:click={() => toggleTeamMembers(team.TeamID)}>

                      <!--Team Name and chevron to expand-->
                      <div class='w-full'>
                        <span class="text-lg">{team.Name}</span>
                        <i class="fa fa-chevron-down ml-2"></i>
                      </div>

                      <!--Hidden until chevron icon clicked-->
                      <div class="hidden mt-2">
                            <ul class="list-none ml-8">
                                {#each team.Profiles as member}
                                  <li>{member.Name}</li>
                                {/each}
                            </ul>
                        </div>

                    </td>

                    <!--Team Score-->
                    <td class="px-4 py-2">
                        {team.TeamStats.TotalScore}
                    </td>

                  </tr>
                  {/each}
              </tbody>
          </table>
          
    </div>

</Layout>