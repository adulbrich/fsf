<script>
    import Chart from 'svelte-frappe-charts';
  
    let data = {
      labels: Array.from({ length: 31 }, (_, i) => i + 1),
      datasets: [
        {
            name: 'Active Users', values: Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * (500 - 100 + 1)) + 100),

        },
        {
            name: 'Inactive Users', values: Array.from({ length: 31 }, (_, i) => Math.floor(Math.random() * (500 - 100 + 1)) + 100),
        }
      ]
    };
  </script>
  <div class="mt-[20%] w-[90%] ml-[5%]" >
    <Chart data={data} type="line" />
  </div>