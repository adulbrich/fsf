
<div class="h-screen bg-light-black fixed top-0 left-0 p-2" style="width: 16%">
    <!--Logo and Faculty Fitness Text-->
    <img class="h-auto w-auto p-2" src="../../OSU_Logo.png" alt="OSU Logo">
    <p class="text-white mt-1 ml-3 font-bold p-4">Faculty Staff Fitness</p>
    <div class="flex-1 flex flex-col h-full space-y-1">
        <!-- Home Link, add 'active' class based on the current route -->
        <a href="/events" class="pt-2 pb-2 flex items-center active">
            <img class="h-[50%] max-w-[50%]  ml-8" src="../../home_icon.png" alt="home icon" >
            <p class="text-white mx-3 mr-12 ">Home</p>
        </a>

    </div>
</div>

<slot></slot>

<style>
    .active {
        background-color: #4A708B; /* Softer blue */
        border-radius: 5px;
        color: white; /* Ensuring text is easily readable */
    }
    .flex.items-center {
        display: flex;
        align-items: center; /* Vertically aligns the items in the center */
        justify-content: center; /* Horizontally centers the content */
        text-align: center; 

    }
    @media (max-width: 768px) {
        .bg-light-black {
            display: none;
        }
    }
</style>
