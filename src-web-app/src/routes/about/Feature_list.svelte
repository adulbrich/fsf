<script lang="ts">
    import SVGComponents from "./SVGComponents.svelte";
</script>

<div class="mx-10 my-10">
    <div class="flex gap-20 text-center">

        <div class='border border-black/5 rounded-lg p-4 items-center shadow-md border-black/5 hover:shadow-lg transition flex flex-col justify-center items-center'>
            <SVGComponents svgLabel="progress" width="60" height="60" />
            <div class="font-bold mb-3 mt-3">Track your progress</div>
            <div class="mt-2 mb-2">Keep track of your workouts and see your progress over time.</div>
        </div>

        <div class='border border-black/5 rounded-lg p-4 items-center shadow-md border-black/5 hover:shadow-lg transition flex flex-col justify-center items-center'>
            <SVGComponents svgLabel="setting-goals" width="60" height="60" />
            <div class="font-bold mb-3 mt-3">Set Goals</div>
            <div class="mt-2 mb-2">Set goals for yourself and track your progress towards them.</div>
        </div>

        <div class='border border-black/5 rounded-lg p-4 items-center shadow-md border-black/5 hover:shadow-lg transition flex flex-col justify-center items-center'>
            <SVGComponents svgLabel="staying-motivated" width="60" height="60" />
            <div class="font-bold mb-3 mt-3">Stay motivated</div>
            <div class="mt-2 mb-2">Stay motivated with reminders and notifications.</div>
        </div>

        <div class='border border-black/5 rounded-lg p-4 items-center shadow-md border-black/5 hover:shadow-lg transition flex flex-col justify-center items-center'>
            <SVGComponents svgLabel="sharing-with-friends" width="60" height="60" />
             <div class="font-bold mb-3 mt-3">Share with friends</div>
            <div class="mt-2 mb-2">Share your progress with friends and family.</div>
        </div>

    </div>
</div>
