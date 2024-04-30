
<div class="h-screen bg-light-black fixed top-0 left-0 p-2" style="width: 16%">
    <!--Logo and Faculty Fitness Text-->
    <img class="h-auto w-auto p-2" src="../../OSU_Logo.png" alt="OSU Logo">
    <p class="text-white mt-1 ml-3 font-bold p-4">Faculty Staff Fitness</p>
    <div class="flex-1 flex flex-col h-full space-y-1">
        <a href="/events" class="flex items-center">
            <img class="h-[50%] max-w-[50%] mt-2.5 ml-8" src="../../home_icon.png" alt="home icon">
            <p class="text-white mx-3 mt-3">Home</p>
        </a>

    </div>
</div>

<slot></slot>

<style>
    @media (max-width: 768px) {
        .bg-light-black {
            display: none;
        }
    }
</style>
