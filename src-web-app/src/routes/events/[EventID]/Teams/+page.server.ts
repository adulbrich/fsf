import { fail, redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession }, params }) => {
  const { EventID } = params;
  console.log(EventID);
  //console.log(EventID);

  //create a session for the user
  const session = await getSession();

  //if some error in creation of session
  if (!session) {
    throw redirect(303, "/events");
  }

  //grab the event details
  const { data: Event } = await supabase.from("Events").select("*").eq("EventID", EventID).single();

  //grab the teams that are enlisted in the event
  const { data: Teams } = await supabase
    .from("Teams")
    .select(
      `
    TeamID,
    CreatedAt,
    Name,
    Profiles (ProfileID, Name)`
    )
    .eq("BelongsToEventID", EventID);

    //grab the scores for each teams
    const { data: TeamStats } = await supabase
    .from("TeamStats")
    .select(`
      TeamID,
      TotalScore
    `)
    .eq('BelongsToEventID', EventID)

    //loop through the list of teams objects and add the team stats to each team obejct
    Teams.forEach((team) => {
      team.TeamStats = TeamStats.find((stats) => stats.TeamID === team.TeamID)
    })

    //sort the list of team objects by team score
    Teams.sort((a, b) => b.TeamStats.TotalScore - a.TeamStats.TotalScore)

    console.log(Teams)

  return { session, Teams, Event };
};
