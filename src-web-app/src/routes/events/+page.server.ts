import type { Event } from "../../interfaces"; // Import the Event interface
let events: Event[] = [];
let pastEvents: Event[] = [];
let upcomingEvents: Event[] = [];
let ongoingEvents: Event[] = [];
export const load = async ({ locals: { supabase, getSession }, params }) => {
  const session = await getSession();
  try {
    const { data, error } = await supabase.from("Events").select("*");
    if (error) throw error;
    events = data;
    let pastCount = 0,
      upcomingCount = 0,
      ongoingCount = 0;
    for (let event of events) {
      const eventStatus = determineEventStatus(event, event.StartsAt, event.EndsAt);
      if ((eventStatus === "Past" && pastCount >= 2) || (eventStatus === "Upcoming" && upcomingCount >= 2) || (eventStatus === "Ongoing" && ongoingCount >= 1)) {
        continue;
      }

      const imagePath = "Banners/" + event.EventID;
      const { data: bannerData, error: bannerError} = await supabase.storage.from("EventAssets").getPublicUrl(imagePath);
      if (bannerError)
        continue;
      event.BannerURL = bannerData.publicUrl;

      if (eventStatus === "Past") {
        pastEvents.push(event);
        pastCount++;
      } else if (eventStatus === "Upcoming") {
        upcomingEvents.push(event);
        upcomingCount++;
      } else if (eventStatus === "Ongoing") {
        ongoingEvents.push(event);
        ongoingCount++;
      }
    }
  } catch (error) {
    console.error("Error fetching events:", error as any);
  }
  return { session, events, pastEvents, upcomingEvents, ongoingEvents };
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
  } else if (startDateObj <= date && endDateObj >= date) {
    return "Ongoing";
  }
}
