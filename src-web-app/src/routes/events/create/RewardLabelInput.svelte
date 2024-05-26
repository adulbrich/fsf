<!-- RewardLabelInput.svelte -->
<script>
    export let id = "";
    export let name = "";
    export let placeholder = "";
    export let label = "";
</script>

<div class="md:w-[60%] mb-6 md:mb-0">
    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for={id}>{label}</label>
    <input
        required
        {name}
        {id}
        value=""
        class="appearance-none block w-full text-gray-700 rounded-md border-black border py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
        type="text"
        {placeholder}
    />
</div>