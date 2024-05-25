import type { Event } from "../../../../interfaces"; // Import the Event interface

export const load = async ({ locals: { supabase, getSession }, params }) => {
  let events: Event[] = [];
  let relevantEvents: Event[] = []; // Array to store the events that are relevant to the category.  Category is determined by the URL parameter
  const session = await getSession();
  const category = params.EventCategory; // Get the category from the URL parameter
  try {
    const { data, error } = await supabase.from("Events").select("*"); //Selects all  rows from the Events table
    
    if (error) throw error;
    events = data; // This caused me an intellisense error, but it works fine

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
      if (determineEventStatus(event, event.StartsAt, event.EndsAt) === category) {
        relevantEvents.push(event); // Add the event to the relevantEvents array if it is relevant to the category
      }
    });
  }
  return { session, events, relevantEvents, category };
};
// Function to determine if the event is Upcoming or Past
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
  }
}
