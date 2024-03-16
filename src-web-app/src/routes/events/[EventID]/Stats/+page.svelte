<script lang="ts">
  import Chart from "svelte-frappe-charts";
  import Layout from "../../../banner-layout.svelte";
  import { onMount } from "svelte";
  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);
  interface activityRow {
    active_date: string;
    user_count: number;
  }
  let activityData: activityRow[] = []; // Array that holds the data for the activity chart
  // Initialize the default values for the chart
  let eventStartDateStr: string = data.Event ? data.Event.StartsAt : "";
  let eventEndDateStr = data.Event ? data.Event.EndsAt : "";
  let maxActiveUsers = 0;
  let minActiveUsers = 0;
  let avgActiveUsers = 0;
  let chartData = {
    labels: [],
    datasets: [
      {
        name: "Active Users",
        values: [],
      },
    ],
  };
  let loading = true;
  // Function that fetches the activity data from the database
  onMount(async () => {
    // Call the test1 stored procedure to get the activity data
    const { data, error } = await supabase.rpc("test1", {
      start_date_param: "2023-10-23",
      end_date_param: "2023-10-30",
    });
    if (error) alert("Error fetching activity data");

    let table = data;
    if (table.length === 0) alert("No data found");

    // Push the data into the activityData array
    table.forEach((row: activityRow) => {
      activityData.push(row);
    });
    // Get the dates between the start and end date
    let dateLabels = getDatesBetweenDates(eventStartDateStr, eventEndDateStr);
    let values = loadValuesArray(activityData, dateLabels);

    // Get the max, min, and average number of active users
    maxActiveUsers = getMaxActiveUsers(values);
    minActiveUsers = getMinActiveUsers(values);
    avgActiveUsers = getAvgActiveUsers(values);

    // Set the chart data
    chartData = {
      labels: dateLabels,
      datasets: [
        {
          name: "Active Users",
          values: values,
        },
      ],
    };
    loading = false;
  });
  // Function that gets the number of days between two dates
  function getNumDaysBetweenDates(startDate: string, endDate: string) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    let numDays = Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    return numDays;
  }
  // Function that gets the max number of active users
  function getMaxActiveUsers(values: number[]) {
    let max = 0;
    values.forEach((userCount) => {
      if (userCount > max) {
        max = userCount;
      }
    });
    return max;
  }
  // Function that gets the min number of active users
  function getMinActiveUsers(values: number[]) {
    let min = values[0];
    values.forEach((userCount) => {
      if (userCount < min) {
        min = userCount;
      }
    });
    return min;
  }
  // Function that gets the average number of active users
  function getAvgActiveUsers(values: number[]) {
    let sum = 0;
    values.forEach((userCount) => {
      sum += userCount;
    });
    let avg = sum / values.length;
    return avg;
  }
  // Function that gets the dates between two dates and loads them into a labels array for the chart
  function getDatesBetweenDates(startDate: string, endDate: string) {
    let dateLabels: string[] = [];
    let start = new Date(startDate);
    let end = new Date(endDate);
    let numDays = getNumDaysBetweenDates(startDate, endDate);
    for (let i = 0; i <= numDays; i++) {
      let tempDate = new Date(start);
      tempDate.setDate(tempDate.getDate() + i + 1);
      let dateLabel = convertDateToLabel(tempDate);
      dateLabels.push(dateLabel);
    }
    return dateLabels;
  }
  // Function that converts a date to a label
  function convertDateToLabel(date: Date) {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dateLabel = `${month}/${day}`;
    return dateLabel;
  }
  // Function that loads the values in the values array
  function loadValuesArray(activityData: activityRow[], labels: string[]) {
    let values: number[] = [];
    values.push(0); // for some reason the first value is not being added to the chart
    let found = false;
    // Loop through the labels and activity data to populate the user count in the right index
    labels.forEach((label) => {
      activityData.forEach((row) => {
        let date = new Date(row.active_date);
        let dateLabel = convertDateToLabel(date);
        if (label === dateLabel) {
          values.push(row.user_count);
          found = true;
        }
      });
      if (!found) values.push(0); // If no users were active for this day, then add a zero
      found = false;
    });

    return values;
  }
</script>

<!-- Vertical navbar to the left of the screen -->
<Layout></Layout>
<!-- If loading is equal to true, then display the spinner -->
{#if loading == true}
  <div role="status">
    <svg
      aria-hidden="true"
      class="ml-[55%] mt-[10%] inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-beaver-orange"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
{:else}
  <!-- Else, display the chart -->
  <div class="mt-[3%] w-[70%] ml-[22%]">
    <Chart data={chartData} type="line" />
  </div>
  <!-- This is a daisy ui component for showing stats summaries -->
  <div class="stats shadow ml-[45.6%] mt-[3%]">
    <div class="stat place-items-center">
      <div class="stat-title">Peak Users</div>
      <div class="stat-value">{maxActiveUsers}</div>
    </div>

    <div class="stat place-items-center">
      <div class="stat-title">Min Users</div>
      <div class="stat-value">{minActiveUsers}</div>
    </div>
    <div class="stat place-items-center">
      <div class="stat-title">Avg Users</div>
      <div class="stat-value">{avgActiveUsers}</div>
    </div>
  </div>
{/if}
