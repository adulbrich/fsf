<script>
  import Chart from "svelte-frappe-charts";
  import Layout from "../../../banner-layout.svelte";

  let data = {
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        name: "Active Users",
        values: Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * (500 - 100 + 1)) + 100),
      },
      {
        name: "Inactive Users",
        values: Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * (500 - 100 + 1)) + 100),
      },
    ],
  };
</script>

<div class="ml-[16%] w-auto h-[13%] eventTitle">
  <h1 class="ml-[2%] mt-[1%]">Walktober 2023</h1>
  <div class="ml-[2%] w-auto flex flex-row h-[40%] mt-5">
    <h2 class="navBarLabel">Overview</h2>
    <h2 class="navBarLabel ml-9">Participants</h2>
    <h2 class="navBarSelected ml-9 nav">Stats</h2>
  </div>
</div>
<Layout></Layout>
<div class="mt-[1%] w-[70%] ml-[22%]">
  <Chart {data} type="line" />
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
