<script>
    export let data;
    import Layout from '../../../../banner-layout.svelte';
</script>


<svelte:head>
   <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">

    <title>
           Event | Top Teams & Participants
    </title>
</svelte:head>

<style type="text/css">
.fa{
color: 
#D73F09
}
</style>

<Layout>

    <div class='container ml-[16%]'>

        <div class='max-w-screen-xl max-auto p-4 bg-[#898A8D]'>
            <span class='dark:text-white self-center px-2 text-2xl font-semibold whitespace-nowrap'>{data.Team?.Name}</span>
        </div>

    </div>

</Layout>