<div class="h-screen bg-[#04548c] fixed top-0 left-0 p-2" style="width: 16%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
    <!-- Logo and TrekTrak Text -->
    <div class="flex justify-center items-center">
        <img class="h-auto w-[70%] p-2" src="/FSF_Logo_Transparent.png" alt="OSU Logo">
    </div>
    <p class="text-white mt-2 font-bold text-center">TrekTrak</p>

    <!-- This contains the Home, Events, Settings icons and text -->
    <div class="flex-1 flex flex-col h-full space-y-1">
        <!-- Each flex container inside contains the Text and the icon next to each other -->
        <a href="/events" class="flex items-center">
            <img class="h-[50%] max-w-[50%] mt-2.5 ml-8" src="/home_icon.png" alt="home icon">
            <p class="text-white mx-3 mt-3">Home</p>
        </a>
        <!-- The settings icon was more fidgety than other icons, so the style is more custom -->
    </div>
</div>


<slot></slot>
