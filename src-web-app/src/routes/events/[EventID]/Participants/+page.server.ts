import {fail, redirect } from '@sveltejs/kit'



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

  const {data: Event} = await supabase 
  .from('Events')
  .select('*')
  .eq('EventID', EventID)
  .single();

  const { data: Participants } = await supabase
  .from('Teams')
  .select(`
    TeamID,
    Name, 
    Profiles (ProfileID, Name, CreatedAt)`)
  .eq('BelongsToEventID', EventID);

  //console.log(Participants);


  
  return { session , Event , Participants };
});