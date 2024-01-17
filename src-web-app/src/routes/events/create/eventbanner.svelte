<script lang="ts">
    
    import type { SupabaseClient } from "@supabase/supabase-js";
    import { createEventDispatcher } from "svelte";

    export let size = 10
    export let url: string
    export let supabase: SupabaseClient

    let bannerUrl : string | null = null
    let uploading = false
    let files: FileList

    const dispatch = createEventDispatcher()

    const downloadImage = async (path: string) => {
        try {
            const { data,error } = await supabase.storage.from('events').download(path)

            if(error) {
                throw error
            }

            const url = URL.createObjectURL(data)
            bannerUrl = url
        }catch (error) {
            if(error instanceof Error){
                console.log("Error downloading Image ", error.message)
            }
        }
    }

    const uploadBanner = async () => {

        try {
            uploading = true
            
            if(!files || files.length === 0){
                throw new Error('You must select an image to upload')
            }

            const file = files[0]
            const fileExt = file.name.split('.').pop
            const filePath = `${Math.random()}.${fileExt}`

            const { error } = await supabase.storage.from('events').upload(filePath, file)

            if(error) {
                throw error
            }

            url = filePath

            setTimeout(() => {
                dispatch('Upload')
            }, 100)

        }catch(error){
            if(error instanceof Error){
                alert(error.message)
            }
        }finally {
            uploading = false
        }

    }

    $: if (url) downloadImage(url)
</script>


<div>
    	{#if bannerUrl}
    		<img
    			src={bannerUrl}
    			alt={bannerUrl ? 'Event Banner' : 'No image'}
    			class="event banner"
    			style="height: {size}em; width: {size}em;"
    		/>
    	{:else}
    		<div class="banner no-image" style="height: 3em; width: 3em;" />
    	{/if}
    	<input type="hidden" name="bannerUrl" value={url} />
    
    	<div style= "width: 15em; ">
    		<label class="button primary block" for="single">
    			{uploading ? 'Uploading ...' : 'Click here to upload a banner!'}
    		</label>
    		<input
    			style="position:absolute; visibility:hidden;"
    			type="file"
    			id="single"
    			accept="image/*"
    			bind:files
    			on:change={uploadBanner}
    			disabled={uploading}
    		/>
    	</div>
</div>