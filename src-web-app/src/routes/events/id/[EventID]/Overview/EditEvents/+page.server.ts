import {fail, redirect } from '@sveltejs/kit'
import { randomUUID } from "crypto";

export const load = async ({ locals: { supabase, getSession } }: { locals: { supabase: any; getSession: () => Promise<any> } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/events");
  }

  return { session }
}

export const actions = {
    create: async (event) => {
      const {
        request,
        locals: { supabase, getSession },
      } = event;
      const session = await getSession();

      const formData = await request.formData();
      const eventName = formData.get("eventName") as string;
      const eventType = formData.get("eventType") as "Steps" | "Distance";
      const startDate = formData.get("startDate") as string;
      const endDate = formData.get("endDate") as string;
      const eventDescription = formData.get("eventDescription") as string;
      const AchievementCount = formData.get("AchievementCount") as any;
      const Achievements = Array.from({ length: AchievementCount }, (_, i) =>
        formData.get(`Achievement${i + 1}`) as string
      );
      
      const eventBanner = formData.get("eventBanner") as File;
      console.log("Event Banner", eventBanner);

      const userID = session?.user.id;
      console.log("User Id: ", userID);

      if (!userID) {
        return fail(500, {
          errorMessage: "Invalid user session.",
          eventName,
          eventType,
          startDate,
          endDate,
          eventDescription,
          eventBanner,
          AchievementCount,
          Achievements,
        });
      }

      const { error: editEventError, data: editEventData } = await supabase
      // Table names must match case according to schema.
      .from("Events")
      .upsert({
        // Column names must match case acccording to schema.
        EventID: randomUUID(),
        Name: eventName,
        Type: eventType,
        StartsAt: startDate,
        EndsAt: endDate,
        CreatedByUserID: userID,
        Description: eventDescription,
        eventBanner: eventBanner,
        AchievementCount: AchievementCount,
        Achievements: Achievements,
      })
      // Select the data we just created so we can use it for the banner.
      .select()
      // We only expect to get one result, this prevents a single item
      // array being return to us. Instead, we get a single object (in data var above).
      .single();

      if (editEventError) {
        console.log('Failed to edit event: ', editEventError.message);
        return fail(500, {
          errorMessage: editEventError.message,
          eventName,
          eventType,
          startDate,
          endDate,
          eventDescription, 
          eventBanner,
          AchievementCount,
          Achievements,
        });
      }

      console.log(editEventData);

      const { error: uploadBannerError } = await supabase.storage.from("EventAssets").upload(
        // To keep it simple, the filename will be the event ID.
        // So, on the mobile app we simply query for 'EventBanners/{EventID}'
        // to retrieve that event's banner image!
        `Banners/${editEventData.EventID}`,
        // The actual image data to upload:
        eventBanner,
        {
          // Specify the content type for the upload.
          contentType: eventBanner.type,
        }
      );

      if (uploadBannerError) {
        console.log("Failed to upload banner: ", uploadBannerError.message);
        return fail(500, {
          errorMessage: uploadBannerError.message,
          eventName,
          eventType,
          startDate,
          endDate,
          eventDescription,
          eventBanner,
          AchievementCount,
          Achievements,
        });
      }

      console.log('Successfully edited an event');
      return {
        errorMessage: null,
        eventName,
        eventType,
        startDate,
        endDate,
        eventDescription,
        eventBanner,
        AchievementCount,
        Achievements,
      };
    },
  };
