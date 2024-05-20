import { fail, redirect } from "@sveltejs/kit";

export const load = async ({ locals: { supabase, getSession }, params }) => {
  const { EventID } = params;
  
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
  
  return { session, Event };
};
