<!-- This represent a list item on the auto complete bar -->
<script lang="ts">
    export let itemLabel = '';
    export let highlighted : Boolean = false;
  </script>
  
  <style>
  li.autocomplete-items {
    list-style: none;
    border-bottom: 1px solid #d4d4d4;
    z-index: 99;
    /*position the autocomplete items to be the same width as the container:*/
    top: 100%;
    left: 0;
    right: 0;
    padding: 10px;
    cursor: pointer;
    background-color: #fff;
  }
  
  li.autocomplete-items:hover {
    /*when hovering an item:*/
    background-color: #D73F09;
      color: white;
  }
  
  li.autocomplete-items:active {
    /*when navigating through the items using the arrow keys:*/
    background-color: #D73F09 !important;
    color: #ffffff;
  }	
      
  .autocomplete-active {
    /*when navigating through the items using the arrow keys:*/
    background-color: #D73F09 !important;
    color: #ffffff;
  }
  </style>
  
  <li class="autocomplete-items" class:autocomplete-active={highlighted} on:click>{@html itemLabel}</li>
