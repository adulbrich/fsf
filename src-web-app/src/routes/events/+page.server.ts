import type { Event } from "../../interfaces"; // Import the Event interface
import type { SupabaseClient } from '@supabase/supabase-js';

let events: Event[] = [];
let pastEvents: Event[] = []; 
let upcomingEvents: Event[] = [];
let ongoingEvents: Event[] = [];
export const load = async ({ locals: { supabase, getSession }, params }) => {
  const session = await getSession();
  try {
    const { data, error } = await supabase.from("Events").select("*"); //Selects all  rows from the Events table
    if (error) throw error;
    events = data; // This caused me an intellisense error, but it works fine
    // Fetch the banner for each event
    for (let event of events) {
      const imagePath = "Banners/" + event.EventID;
      const { data: bannerData, error: bannerError } = await supabase.storage.from("EventAssets").download(imagePath);
      if (bannerError) {
        console.error(`Error fetching banner for event ${event.EventID}:`, bannerError);
        continue;
      }
      if (bannerData instanceof Blob) {
        console.log(`Successfully fetched banner for event ${event.EventID}`);
        const arrayBuffer = await bannerData.arrayBuffer();
        event.BannerBuffer = Array.from(new Uint8Array(arrayBuffer));
      } else {
        console.error(`Unexpected banner data type for event ${event.EventID}:`, bannerData);
      }
    }
  } catch (error) {
    console.error("Error fetching events:", error as any);
  } finally {
    // Filter the events based on the category
    events.forEach((event) => {
      if (determineEventStatus(event, event.StartsAt, event.EndsAt) === 'Past') {
        pastEvents.push(event); // Add the event to the relevantEvents array if it is relevant to the category

      }else if (determineEventStatus(event, event.StartsAt, event.EndsAt) === 'Upcoming') {
        upcomingEvents.push(event); // Add the event to the relevantEvents array if it is relevant to the category
      }else if(determineEventStatus(event, event.StartsAt, event.EndsAt) === 'Ongoing'){
        ongoingEvents.push(event);
      }
      
    });
    
  }
  return { session, events, pastEvents, upcomingEvents, ongoingEvents,};
};

async function fetchBannerForEvent(eventId: string, supabase: SupabaseClient): Promise<Uint8Array | null> {
  const imagePath = "Banners/" + eventId;
  const { data: bannerData, error: bannerError } = await supabase.storage.from("EventAssets").download(imagePath);
  if (bannerError) {
    console.error(`Error fetching banner for event ${eventId}:`, bannerError);
    return null;
  }
  if (bannerData instanceof Blob) {
    console.log(`Successfully fetched banner for event ${eventId}`);
    const arrayBuffer = await bannerData.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } else {
    console.error(`Unexpected banner data type for event ${eventId}:`, bannerData);
    return null;
  }
}
// Function to determine if the event is Upcoming, Ongoing or Past
function determineEventStatus(event: Event, startDate: string, endDate: string) {
  const date = new Date(); // Get the current date

  startDate = startDate.split("T")[0]; // Split the date and time and only take the date
  endDate = endDate.split("T")[0];

  event.StartsAt = startDate;
  event.EndsAt = endDate;

  const startDateObj = new Date(startDate); // Convert the date string to a date object
  const endDateObj = new Date(endDate);

  // if the end date is less than the current date, the event is Past
  if (endDateObj < date) {
    return "Past";
  } else if (startDateObj > date) {
    return "Upcoming";
  }else if(startDateObj <= date && endDateObj >= date){
    return "Ongoing";
  }
}
