<script>
    import {onMount} from "svelte";
    import Prop from "./Prop.svelte";

    export let category;
    let props = [];
    
    onMount(async () => {
        await fetch(`http://localhost:3000/props/`)
            .then(r => r.json())
            .then(data => {
                props = data;
                //console.log(props);
            })
    })
</script>

<style>
    .Props {
        display: flex;
        flex-direction: column;
    }
    [class*="Props__container"] {
        display: flex;
        justify-content: center;
        column-gap: 0.5rem;
        padding: 0 1rem;
        align-items: flex-start;
    }
    .Card {
        border: 1px solid rgba(219, 219, 219, 1);
        border-radius: 4px;
        background-color: white;
        margin: 0 0 2em 0;
        padding: 1rem;
        width: 250px;
        min-height: 200px;
    }
</style>

<div class="Props__container--{category}">
    {#if props.find(p => p.category === category)}
        {#each props as prop}
            {#if prop.category == category}
                <div class="Card">
                    <Prop {prop} />
                </div>
            {/if}
        {/each}
    {:else}
        <p class="loading">loading...</p>
    {/if}
</div>