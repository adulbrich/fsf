import {fail, redirect } from '@sveltejs/kit'

/* 

Purpose of Page:

url = "event/[eventID].svelte"

where[eventID] is some selected event that the user wants to see:

  1) All of the teams
  2) All of the participants
  3) Other relevant information

*/

export const load = (async({locals: { supabase, getSession } , params }) => {
  
  const {EventID} = params;
  console.log(EventID);
  //console.log(EventID);

  //create a session for the user
    const session = await getSession();

    //if some error in creation of session
    if(!session){
        throw redirect(303 , '/events');
    }

  const {data: eventDetails} = await supabase 
  .from('Events')
  .select('*')
  .eq('EventID', EventID)
  .single();

  const { data: testsigned } = await supabase
  .storage
  .from('EventAssets')
  .createSignedUrl(`Banners/${EventID}`, 300)

  /*
  const { data: eventImage } = await supabase
  .storage
  .from('EventAssets/Banners')
  .getPublicUrl(EventID)
  */

  const { data: teamsWithMembers } = await supabase
  .from('Teams')
  .select(`
    TeamID,
    Name, 
    Profiles (ProfileID, Name)`)
  .eq('BelongsToEventID', EventID);
  
  return { session ,eventDetails, teamsWithMembers, testsigned};
});