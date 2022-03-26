<script>
    let url= "https://", temps = 0
    let result = ""
    async function getParams(){
        let rep = await fetch(`/api/screenshot/${encodeURIComponent(url)}?pause=${temps}&isDev=1`)
        let s = await rep.json()
        result = s.fileData

    }

</script>

<div class="w-screen h-screen bg-gray-100 flex flex-col  justify-center items-center">
    <h2 class="text-2xl pb-5">Sveltekit Puppeteer Playground</h2>
    <div class="flex flex-col w-1/3 bg-white p-10 rounded-2xl shadow-xl">
        <h3 class="text-xl">Screenshot</h3>
        <div>
            <img class="bg-white px-5 pt-5 pb-10" src="{result}">
        </div>
        <div class="flex flex-col">
            <div class="flex flex-row justify-between items-center gap-10">
                <input bind:value={url} placeholder="URL" type="text" class="input input-bordered w-1/2"/>
                <div class="w-1/2">
                    <p>Délai (secondes)</p>
                    <div class="flex flex-row ">
                        <input bind:value={temps} type="range" min="0" max="30" class="range"/>
                        <p class="text-xl">{temps}</p>
                    </div>
                </div>

            </div>

            <button class="btn btn-ghost mt-5" on:click={getParams}>Faire un screenshot</button>
        </div>
    </div>

</div>
