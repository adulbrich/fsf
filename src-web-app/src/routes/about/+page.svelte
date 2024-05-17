<script lang="ts">
  import SVGComponents from "./SVGComponents.svelte";
  import Person from "./Person.svelte";
  import Clipboard from "./Clipboard.svelte";
</script>

<div class="flex flex-col items-center w-full gap-8 my-16">
  <!-- Header -->
  <div class="flex text-center gap-16 items-center">
    <div class="flex flex-col text-left font-serif">
      <div class="text-4xl">Oregon State University</div>
      <div class="text-3xl">Faculty Staff Fitness</div>
    </div>
    <div class="text-xl italic">Bringing you the next generation of fitness tracking</div>
  </div>

  <!-- Screenshot -->
  <div class="max-w-screen-md pointer-events-none">
    <img alt="screenshot" src="/about/web_screenshot.png" />
  </div>

  <!-- Source code -->
  <div class="w-auto flex flex-row items-center my-8 mt-4">
    <div class="text-2xl mr-4">OSU FSF on Github</div>
    <a href="https://github.com/OregonStateUniversity/osu-fsf" target="_blank">
      <SVGComponents svgLabel="github-logo" width="49" height="48" />
    </a>
  </div>

  <!-- Features header -->
  <div class="text-3xl">
    <div>Designed to keep you moving!</div>
  </div>

  <!-- Features (double column) -->
  <div class="flex gap-8">
    <div class="flex flex-col gap-8">
      <div class="flex gap-4 items-center">
        <div class="font-bold">Track your progress</div>
      </div>
      <div class="flex gap-4 items-center">
        <div class="font-bold">Set goals</div>
      </div>
      <div class="flex gap-4 items-center">
        <div class="font-bold">Stay motivated</div>
      </div>
      <div class="flex gap-4 items-center">
        <div class="font-bold">Share with friends</div>
      </div>
    </div>
    <div class="flex flex-col gap-8">
      <div class="flex gap-4 items-center">
        <div>Keep track of your workouts and see your progress over time.</div>
      </div>
      <div class="flex gap-4 items-center">
        <div>Set goals for yourself and track your progress towards them.</div>
      </div>
      <div class="flex gap-4 items-center">
        <div>Stay motivated with reminders and notifications.</div>
      </div>
      <div class="flex gap-4 items-center">
        <div>Share your progress with friends and family.</div>
      </div>
    </div>
  </div>
  
  <div class="text-3xl mt-20">
    <div>Authors</div>
  </div>

  <div class="flex flex-wrap gap-6">
    <Person imgName="nicole" name="Nicole Kurth" />
    <Person imgName="alex" name="Alex Ulbrich" />
    <Person imgName="bill" name="Bill Pfiel" />
  </div>
  <div class="text-3xl">
    <div>Meet the team</div>
  </div>
  <div class="flex flex-wrap gap-6">
    <Person imgName="steph" name="Stephen Fike" />
    <Person imgName="aiden" name="Aiden Ross" />
    <Person imgName="jason" name="Jason Ho" />
    <Person imgName="lei" name="Lei Sun" />
    <Person imgName="ryan" name="Ryan Remington" />
    <Person imgName="yang" name="Yang" />
    <Person imgName="edson" name="Edson Fuentes" />
  </div>

 
  


</div>

<footer class="footer footer-center p-10 text-base-content bg-base-300">
  <aside>
    <img src="/about/logo.png" class="logo" alt="OSU FSF logo" />
    <p class="font-bold">Oregon State University</p>
    <p>Copyright © 2024 - All right reserved</p>
    <Clipboard />
  </aside>
  <nav>
    <div class="grid grid-flow-col gap-4">
      <a href="https://github.com/OregonStateUniversity/osu-fsf" class="link link-hover">Github</a>
      <a href="#" class="link link-hover">About us</a>
      <a href="#" class="link link-hover">Docs</a>
    </div>
  </nav>
</footer>

<style>
  .logo {
    max-width: 80px;
    height: auto;
  }
</style>
