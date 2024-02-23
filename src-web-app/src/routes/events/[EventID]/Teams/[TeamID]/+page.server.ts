import {fail, redirect } from '@sveltejs/kit'



export const load = (async({locals: { supabase, getSession } , params }) => {
  

  const {EventID} = params.EventID;
  const {TeamID} = params.TeamID;

  //console.log(EventID);

  //create a session for the user
    const session = await getSession();

    //if some error in creation of session
    if(!session){
        throw redirect(303 , '/events');
    }


    //grab the teams that are enlisted in the event
    const { data: Team} = await supabase 
    .from('Teams')
    .select('*')
    .eq('TeamID', TeamID);

    //grab the event details
    const { data: Event } = await supabase
    .from('Events')
    .select('*')
    .eq('EventID', EventID)
    .single();
    
   // console.log(Event)
    //console.log(Teams);

    /*
    const {data: teamstats} = await supabase
    .from('TeamStats')
    .select('*')
    .eq('BelongsToEventID', EventID);

    console.log(teamstats);

    */

    //console.log(Event)
    //console.log(Team);
  
  return { session , Team, Event};
});