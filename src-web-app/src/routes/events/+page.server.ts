import type { Event } from "../../interfaces"; // Import the Event interface
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
  return { session, events, pastEvents, upcomingEvents, ongoingEvents};
};
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
