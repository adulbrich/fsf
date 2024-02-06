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
  //console.log(EventID);

  //create a session for the user
    const session = await getSession();

    //if some error in creation of session
    if(!session){
        throw redirect(303 , '/events');
    }

    //grab all the events
    const { data: event_data } = await supabase 
    .from('Events')
    .select('Name')
    .eq('EventID', EventID)
    .single()

    //grab all the teams associated with that event
    const { data: team_event_connection } = await supabase
    .from('Teams')
    .select('Name')
    .eq('BelongsToEventID', EventID)

  return { session , event_data, team_event_connection};
});