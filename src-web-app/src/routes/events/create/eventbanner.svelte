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
            <!-- Not sure why this is here.  Not displaying anything on page -->
    		<!-- <div class="banner no-image" style="height: 3em; width: 3em;" /> -->
    	{/if}
    	<input type="hidden" name="bannerUrl" value={url} />
    
    	<div style= "width: 15em;">
    		<label class="btn primary bg-beaver-orange text-white hover:bg-dark-orange" for="single">
    			{uploading ? 'Uploading ...' : 'Upload Banner'}
                <svg width="20" height="20" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="25" cy="25" r="23" stroke="#FEFAFA" stroke-width="4"/>
                    <rect x="12" y="23" width="26" height="4" rx="1" fill="#FFFCFC"/>
                    <rect x="27" y="12" width="26" height="4" rx="1" transform="rotate(90 27 12)" fill="#FFFDFD"/>
                    </svg>
                    
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