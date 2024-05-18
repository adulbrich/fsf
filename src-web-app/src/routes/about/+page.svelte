<script lang="ts">
  import SVGComponents from "./SVGComponents.svelte";
  import Person from "./Person.svelte";
  import Clipboard from "./Clipboard.svelte";
  import Accordion from "./Accordion.svelte";
  import Divider from "./Divider.svelte";
  import FeatureList from "./Feature_list.svelte";
  let problemStatementText = "OSU FSF is your go-to platform for faculty and staff to track steps and engage in friendly competition. Join our community to track your fitness progress, compete with colleagues, and step up your wellness game together!"
</script>

<div class="flex flex-col items-center w-full gap-8 my-16">
  <!-- Header -->
  <div class="flex text-center gap-16 items-center">
    <div class="flex flex-row">
      <img alt="logo" src="/about/logo.png" class="w-24 h-24 mr-4 mt--2" />
      <div class="flex-col flex text-left font-serif mt-2">
        <div class="text-4xl">Oregon State University</div>
        <div class="text-3xl">Faculty Staff Fitness</div>
      </div>

    </div>
    <div class="text-xl italic">Bringing you the next generation of fitness tracking</div>
  </div>

  <!-- Screenshot -->
  <div class="w-full h-[512px] max-w-screen-md pointer-events-none flex justify-center items-end gap-8">
    <img class="h-full drop-shadow-lg" alt="screenshot" src="/about/web_screenshot.png" />
    <img class="h-5/6 z-10 drop-shadow-lg" alt="mobile screenshot" src="/about/mobile_screenshot.png" />
  </div>

  <!-- Source code -->
  <div class="w-auto">
    <Divider />
  </div>
  
  <div class="flex items-center flex-col">
    <p class="text-3xl">Ever Wondered How to Combine Fitness with Friendly Competition?</p>
    <div class="flex w-1/3 items-center">
      <p class="text-center text-2xl italic mt-4">{problemStatementText}</p>
    </div>
  </div>

  <!-- Features header -->
  <div class="text-3xl mt-20">
    <div>Designed to keep you moving!</div>
  </div>

  <!-- Features (double column) -->
  <div>
    <FeatureList />
  </div>


  <!-- Authors -->
  <div class="text-3xl mt-20">
    <div>Authors</div>
  </div>

  <div class="flex flex-wrap gap-6">
    <Person imgName="nicole" name="Nicole Kurth" />
    <Person imgName="alex" name="Alex Ulbrich" />
    <Person imgName="bill" name="Bill Pfiel" />
  </div>
  <!-- Contributors -->
  <div class="text-3xl">
    <div>Meet the team</div>
  </div>
  <div class="flex flex-wrap gap-6">
    <Person imgName="steph" name="Stephen Fike" />
    <Person imgName="aiden" name="Aiden Ross" />
    <Person imgName="jason" name="Jason Ho" />
    <Person imgName="lei" name="Lei Sun" />
    <Person imgName="yang" name="Yang" />
    <Person imgName="edson" name="Edson Fuentes" />
    <Person imgName="ryan" name="Ryan Remington" />
  </div>
  <!-- Accordion -->

  <div class="text-3xl mt-10">
    <div>Frequently Asked Questions</div>
  </div>
  <div class="w-1/3">
    <Accordion />
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
      <a href="https://osu-fsf-docs.vercel.app/reference/00welcome" class="link link-hover">Docs</a>
    </div>
  </nav>
</footer>

<style>
  .logo {
    max-width: 80px;
    height: auto;
  }
</style>
