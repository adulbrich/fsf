// Blue print for the event object
export interface SBEvent {
  Name: string;
  Type: string;
  StartsAt: string;
  EndsAt: string;
  Status: string;
  Description: string;
  Exists: boolean;
  EventID: string;
}

// Blue print for the relevant events object
export interface RelevantEvents {
  pastEvents: SBEvent[];
  ongoingEvent: SBEvent | null;
  upcomingEvent: SBEvent | null;
}