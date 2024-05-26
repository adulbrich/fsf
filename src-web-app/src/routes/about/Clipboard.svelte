<script lang="ts">
    import SVGComponents from "./SVGComponents.svelte";
    let email: string = "osufsfcontact@yahoo.com ";
  
    // Function to copy email to clipboard
    function copyToClipboard() {
      navigator.clipboard.writeText(email)
        .then(() => {
          alert("Email copied to clipboard!");
        })
        .catch(err => {
          console.error("Failed to copy: ", err);
        });
    }
  </script>
  
  <style>
  </style>
  
  <button class="flex flex-row" on:click={copyToClipboard}>
    <p class="">{email}</p>
    <SVGComponents svgLabel="clipboard" width="24" height="24"  />
  </button>
  