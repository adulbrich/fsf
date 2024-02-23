import {fail, redirect } from '@sveltejs/kit'

/* 

Purpose of Page:

url = "event/[eventID]/teams"

displays the teams enlisted in the event specified by eventID

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

    //grab the event details
    const { data: Event } = await supabase
    .from('Events')
    .select('*')
    .eq('EventID', EventID)
    .single();

    //grab the teams that are enlisted in the event
    const { data: Teams } = await supabase 
    .from('Teams')
    .select('*')
    .eq('BelongsToEventID', EventID);
    
   // console.log(Event)
    //console.log(Teams);

    /*
    const {data: teamstats} = await supabase
    .from('TeamStats')
    .select('*')
    .eq('BelongsToEventID', EventID);

    console.log(teamstats);

    */

  
  return { session , Teams, Event};
});