<script>
    let url, temps = 0
    let result
    async function getParams(){
        let rep = await fetch(`/api/screenshot/${encodeURIComponent(url)}?pause=${temps}`)
        let s = await rep.json()
        result = s.fileData
        console.log(s.statut)
    }

</script>


<img height="400" src="{result}">
<br>
<input bind:value={url} placeholder="URL" type="text"/>
<input bind:value={temps} placeholder="Secondes avant?" type="text"/>
<button on:click={getParams}>Faire un screenshot</button>