<script>
  import Chart from "svelte-frappe-charts";
  import Layout from "../../../banner-layout.svelte";
  export let data;
  let chartData = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        name: "Active Users",
        values: Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * (500 - 100 + 1)) + 100),
      },
    ],
  };

// OK I need to find a way to call the chart function for 
  // But i need test data for a specific event
  // So maybe i search an event and then call the chart function
// But i need to fill it with test data first
// Once I have enough data, I can call the chart function and fill it with the data from the database
console.log(data);
</script>

<Layout></Layout>
<div class="mt-[1%] w-[70%] ml-[22%]">
  <Chart data = {chartData} type="line" />
</div>

<div class="stats shadow ml-[40%]">
  <div class="stat place-items-center">
    <div class="stat-title">Peak Users</div>
    <div class="stat-value">400</div>
  </div>

  <div class="stat place-items-center">
    <div class="stat-title">Total Users</div>
    <div class="stat-value">4,200</div>
  </div>

  <div class="stat place-items-center">
    <div class="stat-title">Min Users</div>
    <div class="stat-value">200</div>
  </div>
  <div class="stat place-items-center">
    <div class="stat-title">Avg Users</div>
    <div class="stat-value">300</div>
  </div>
</div>

<style>
  .eventTitle {
    font-size: 25px;
    font-weight: 600;
  }
  .navBarLabel {
    font-size: 18px;
    font-weight: 450;
  }
  .navBarSelected {
    font-size: 18px;
    font-weight: 600;
  }
</style>
