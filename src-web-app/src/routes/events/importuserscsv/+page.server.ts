import { fail, redirect } from "@sveltejs/kit";
import Papa from "papaparse";
import { createClient } from "@supabase/supabase-js";
import { PUBLIC_SUPABASE_URL } from '$env/static/public';
import { SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private'

export const load = async ({ locals: { supabase, getSession } }: { locals: { supabase: any; getSession: () => Promise<any> } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, "/events");
  }

  return { session }
}

//returns fail if incorrect fomrat, true if format is correct
function checkCSVFormat(parsedCsvUserData: any) {
  if (parsedCsvUserData instanceof Error) {
    return fail(500, {
      errorMessage: "Failed to parse the csv file."
    })
  }

  if (!parsedCsvUserData.data[0]['Email Address']) {
    return fail(500, {
      errorMessage: "Invalid CSV file format. Email Address field is not found."
    })
  }
  if (!parsedCsvUserData.data[0]['First Name'] || !parsedCsvUserData.data[0]['Last Name']) {
    return fail(500, {
      errorMessage: "Invalid CSV file format. First name or Last name not found."
    })
  }
  if (!PUBLIC_SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return fail(500, {
      errorMessage: "Env variables are not set."
    })
  }

  return true;
}

export const actions = {
  importUsersFromCSV: async (event) => {
    // Get current session information from SvelteKit hooks.
    const {
      request,
      locals: { supabase, getSession },
    } = event;
    const session = await getSession();

    // Current user session ID.
    const userID = session?.user.id;
    console.log("User Id: ", userID);

    // If no user session ID, error out, they have no business creating a user.
    // Honestly this should never happen unless someone is attempting to
    // exploit the API.
    if (!userID) {
      return fail(500, {
        errorMessage: "Invalid user session.",
      });
    }

    // Extract form data from the client's request.
    const formData = await request.formData();

    // Event specific information.
    const usersCsvFile: File = formData.get("userscsv") as File;
    const buffer = await usersCsvFile.arrayBuffer();
    const usersCsvText = new TextDecoder("utf-8").decode(buffer);
    console.log(usersCsvText);

    const parsedCsvUserData: any = await Papa.parse(usersCsvText, {
      header: true,
      complete(results, file) {
        return results;
      },
      error(error: any, file: any) {
        return new Error("Failed to parse users csv file");
      },
    })

    const isCSVFormatCorrect = checkCSVFormat(parsedCsvUserData);
    if (isCSVFormatCorrect != true) {
      return isCSVFormatCorrect;
    }
    console.log("Parsed csv data:", parsedCsvUserData);

    const supabaseAdmin = createClient(
      PUBLIC_SUPABASE_URL,
      SUPABASE_SERVICE_ROLE_KEY
    );

    const userEmailsThatCouldNotBeCreated: string[] = [];
    const userEmailsThatWereCreated: string[] = [];
    const userEmailsThatAlreadyExist: string[] = [];

    for (const user of parsedCsvUserData.data) {
      if (user['Email Address']) {
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
          email: user['Email Address'],
          password: '',
          email_confirm: false,
          user_metadata: {
            display_name: user['First Name'] + " " + user['Last Name'],
            "Role": "Participant"
          }
        })
        if (!error) {
          userEmailsThatWereCreated.push(user['Email Address']);
        }

        if (error && error.message == 'Unable to validate email address: invalid format') {
          userEmailsThatCouldNotBeCreated.push(user['Email Address']);
          continue
        }
        if(error && error.message == 'A user with this email address has already been registered') {
          userEmailsThatAlreadyExist.push(user['Email Address']);
        }

        //Ignore the error if a user already exists
        if (error && error.message != "A user with this email address has already been registered") {
          console.log(error);
          return {
            errorMessage: error.message,
          }
        }
      }
    }

    console.log('Users successfully created');
    console.log('Could not create the following users:', userEmailsThatCouldNotBeCreated);
    // Done.
    return {
      errorMessage: null,
      userEmailsThatCouldNotBeCreated,
      userEmailsThatWereCreated,
      userEmailsThatAlreadyExist
    };
  },
};
