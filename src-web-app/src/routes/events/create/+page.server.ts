import {fail, redirect } from '@sveltejs/kit'

export const load = async ({locals: {supabase, getSession }}: {locals: {supabase: any; getSession: () => Promise<any> }}) => {
    const session = await getSession()

    if(!session) {
        throw redirect(303, '/events')
    }

    const { data: event, error } = await supabase
     .from('event')
     .select(`event_name, event_type, event_start_date, event_end_date, event_description, event_banner`)
     .eq('id', session.user.id)
     .single()

    if (error) {
        console.error('Failed to fetch event:', error);
    } else {
        console.log('Event data successfully fetched');
    }

    return { session, event }
}

export const actions = {
    create: async ({
      request,
      locals: { supabase, getSession },
    }: {
      request: any; 
      locals: { supabase: any; getSession: () => Promise<any> };
    }) => {
      const formData = await request.formData();
      const eventName = formData.get('eventName') as string;
      const eventType = formData.get('eventType') as string;
      const startDate = formData.get('startDate') as string;
      const endDate = formData.get('endDate') as string;
      const eventDescription = formData.get('eventDescription') as string;
      const eventBanner = formData.get('eventBanner') as string;
  
      const session = await getSession();
  
      const { error } = await supabase.from('event').upsert({
        id: session?.user.id,
        event_name: eventName,
        event_type: eventType,
        event_start_date: startDate,
        event_end_date: endDate,
        event_description: eventDescription,
        event_banner: eventBanner,
        updated_at: new Date(),
      });
  
      if (error) {
        return fail(500, {
          eventName,
          eventType,
          startDate,
          endDate,
          eventDescription,
          eventBanner,
        });
      }
  
      return {
        eventName,
        eventType,
        startDate,
        endDate,
        eventDescription,
        eventBanner,
      };
    },
  };
