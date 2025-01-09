<script lang="ts">
  import Chart from "svelte-frappe-charts";
  import Layout from "../../../../banner-layout.svelte";
  import { onMount } from "svelte";
  export let data;
  let { supabase } = data;
  $: ({ supabase } = data);
  interface activityRow {
    active_date: string;
    user_count: number;
  }

  let activityData: activityRow[] = []; 
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
  let errorMessage = "";  // New variable to store error messages
  let dataErrorMessage = ""
  let tableLength = "Table Length: ";

  onMount(async () => {
    const { data, error } = await supabase.rpc("test1", {
      start_date_param: "2023-10-23",
      end_date_param: "2023-10-30",
    });

    if (error) {
      errorMessage = "Error Fetching Activity Data";  // Set error message instead of alert
      loading = false;
      return;
    }

    let table = data;
    if (table.length === 0) {
      errorMessage = "No data found";  // Set error message instead of alert
      dataErrorMessage = "No data found";
      loading = false;
      tableLength += table.length;
      return;
    }
    else if (table.length == null) {
      tableLength = "Table Length: 0";
      loading = false;
      return;
    }

    table.forEach((row: activityRow) => {
      activityData.push(row);
    });

    let dateLabels = getDatesBetweenDates(eventStartDateStr, eventEndDateStr);
    let values = loadValuesArray(activityData, dateLabels);

    maxActiveUsers = getMaxActiveUsers(values);
    minActiveUsers = getMinActiveUsers(values);
    avgActiveUsers = getAvgActiveUsers(values);

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

  function getNumDaysBetweenDates(startDate: string, endDate: string) {
    let start = new Date(startDate);
    let end = new Date(endDate);
    return Math.floor((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
  }

  function getMaxActiveUsers(values: number[]) {
    return Math.max(...values);
  }

  function getMinActiveUsers(values: number[]) {
    return Math.min(...values);
  }

  function getAvgActiveUsers(values: number[]) {
    return values.reduce((sum, count) => sum + count, 0) / values.length;
  }

  function getDatesBetweenDates(startDate: string, endDate: string) {
    let dateLabels: string[] = [];
    let start = new Date(startDate);
    let end = new Date(endDate);
    let numDays = getNumDaysBetweenDates(startDate, endDate);
    for (let i = 0; i <= numDays; i++) {
      let tempDate = new Date(start);
      tempDate.setDate(tempDate.getDate() + i + 1);
      dateLabels.push(convertDateToLabel(tempDate));
    }
    return dateLabels;
  }

  function convertDateToLabel(date: Date) {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  }

  function loadValuesArray(activityData: activityRow[], labels: string[]) {
    let values: number[] = [];
    values.push(0);
    let found = false;
    labels.forEach((label) => {
      activityData.forEach((row) => {
        let dateLabel = convertDateToLabel(new Date(row.active_date));
        if (label === dateLabel) {
          values.push(row.user_count);
          found = true;
        }
      });
      if (!found) values.push(0);
      found = false;
    });
    return values;
  }
</script>

<Layout></Layout>

{#if loading}
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
{:else if errorMessage}
  <div class="error-container ml-auto mr-auto mt-[3%] p-4 bg-red-200 text-red-800 rounded max-w-md">
    {errorMessage}
  </div>
  <div class="error-container ml-auto mr-auto mt-[3%] p-4 bg-red-200 text-red-800 rounded max-w-md">
    {tableLength}
  </div>
{:else}
  <div class="mt-[3%] w-[70%] ml-[22%]">
    <Chart data={chartData} type="line" />
  </div>
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

