// Event object blue print
export interface Event {
  Name: string;
  Type: "Steps" | "Distance";
  StartsAt: string;
  EndsAt: string;
  EventID: string;
  CreatedAt: string;
  CreatedByUserID: string;
  UpdatedAt: string;
  Description: string;
  Status?: "Upcoming" | "Ongoing" | "Past";
  Exists?: boolean;
  BannerURL?: string;
  BannerBuffer?: number[];
}
// Blue print for the relevant events object
export interface RelevantEvents {
upcomingEvents: Event[];
ongoingEvent: Event | null;
upcomingEvent: Event | null;
}
// This onbject is passed into the search bar component on /events
export interface EventNameAndID {
Name: string;
ID: string;
}
