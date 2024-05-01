<!-- Searchbar designed for searching events.  Hitting enter will navigate to /events/{event id} -->
<!-- To use this, you need to pass in an array of events with the type EvenNameAndID as a prop.  See interface below -->
<script lang="ts">
  import { goto } from "$app/navigation";
  import type { SBEvent } from "$lib/types/models";
  import SearchItem from "./SearchItem.svelte";
  let searchInput: HTMLInputElement;
  let inputValue: string = "";
  export let events: SBEvent[] = [];
  let filteredNames: string[] = [];
  let hiLiteIndex: number = 0;
  // filter the events based on the input value
  const filterEvents = () => {
    let storageArr: string[] = [];
    if (inputValue) {
      events.forEach((event) => {
        if (event?.Name.toLowerCase().startsWith(inputValue.toLowerCase())) {
          storageArr = [...storageArr, makeMatchBold(event.Name)]; // make the matched part bold
        }
      });
    }
    filteredNames = storageArr; // set the filtered names to the storage array
  };
  // if the input value is empty, clear the filtered names and reset the highlight index
  $: if (!inputValue) {
    filteredNames = [];
    hiLiteIndex = 0;
  }
  // make the matched part bold in the event name
  const makeMatchBold = (str: string) => {
    // replace part of (country name === inputValue) with strong tags
    let matched = str.substring(0, inputValue.length);
    let makeBold = `<strong>${matched}</strong>`;
    let boldedMatch = str.replace(matched, makeBold);
    return boldedMatch;
  };
  // remove the bold tags from the event name
  const removeBold = (str: string) => {
    return str.replace(/<(.)*?>/g, "");
  };
  // set the input value to the selected event name
  const setInputVal = (eventName: string) => {
    inputValue = removeBold(eventName);
    filteredNames = [];
    hiLiteIndex = 0;
    const eventSearchElement = document.querySelector("#event-search") as HTMLInputElement;
    if (eventSearchElement) {
      eventSearchElement.focus();
    }
  };
  // navigate the list of filtered names using the arrow keys and tab
  const navigateList = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" && hiLiteIndex <= filteredNames.length - 1) {
      hiLiteIndex === null ? (hiLiteIndex = 0) : (hiLiteIndex += 1);
    } else if (e.key === "ArrowUp" && hiLiteIndex !== null) {
      hiLiteIndex === 0 ? (hiLiteIndex = filteredNames.length - 1) : (hiLiteIndex -= 1);
    } else if (e.key === "Tab") {
      setInputVal(filteredNames[hiLiteIndex]);
    } else if (e.key === "Enter") {
      e.preventDefault();
      let id = findIDByName(inputValue);
      if (id == "-1") {
        alert("Event not found")
      }else{
        goto(`/events/id/${id}/Overview`);
      }
    } else {
      return;
    }
  };
  const findIDByName = (name: string) => {
    const eventFound = events.find((event) => event.Name === name);
    if (eventFound) {
      return eventFound.EventID;
    }
    alert("Event not found");
    return "-1";
  };
  // clear the input value and focus on the input
  const clearInput = () => {
    inputValue = "";
    const searchInputEl = document.querySelector("#event-search") as HTMLInputElement;
    searchInputEl.focus();
  };
  console.log("Events inside of search bar component: ", { events });
</script>

<svelte:window on:keydown={navigateList} />
<!-- Search Bar -->
<div class="relative flex mt-4">
  <input
    type="text"
    id="event-search"
    class="block w-[30%] p-2 ps-10 outline-none text-sm bg-white rounded-md border-black border"
    style="width: 30rem; -webkit-appearance: none; -moz-appearance: none; appearance: none;"
    placeholder="Type to search for an event"
    bind:this={searchInput}
    bind:value={inputValue}
    on:input={filterEvents}
  />
  <!-- Search Icon -->
  <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="position: absolute; margin-top: 9px; margin-left: 8px">
    <path
      d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path d="M18.9999 19L14.6499 14.65" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</div>
<!-- Auto complete list that shows event names -->
{#if filteredNames.length > 0}
  <ul id="autocomplete-items-list">
    {#each filteredNames as eventName, i}
      <SearchItem itemLabel={eventName} highlighted={i + 1 === hiLiteIndex} on:click={() => setInputVal(eventName)} />
    {/each}
  </ul>
{/if}

<style>
  #autocomplete-items-list {
    position: fixed;
    margin: 0;
    margin-left: 8px;
    padding: 0;
    top: 67px;
    width: auto;
    border: 1px solid #ddd;
    background-color: #ddd;
    z-index: 1000;
  }

  *:focus {
    outline: none;
  }
</style>
