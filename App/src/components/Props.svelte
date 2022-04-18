<script>
    import { fade } from 'svelte/transition';
    import Prop from "./Prop.svelte";
    export let props = {};
    export let category = '';
    export let toast;

    $: props;
    $: props[category];
    $: toast;

    function handleDelete(e) {
        document.getElementById('Card_' + e.detail._id).style.display = "none";
        console.log('toast 2', toast)
    }
    function handleCancelDelete(e) {
        document.getElementById('Card_' + e.detail._id).style.display = "block";
        toast = null;
    }
    
</script>

<style>
    [class*="Props__container"] {
        max-width: 100vw;
        display: flex;
        justify-content: flex-start;
        column-gap: 0.5rem;
        padding: 0 1rem;
        align-items: flex-start;
        overflow-y: auto;
    }
    .Card {
        border: 1px solid rgba(219, 219, 219, 1);
        border-radius: 4px;
        background-color: white;
        margin: 0 0 2em 0;
        padding: 1rem;
        width: 250px;
        min-width: 200px;
        min-height: 200px;
    }
</style>

<div class="Props__container--{category}">
    {#if props[category] }
        {#each props[category] as prop (prop._id)}
            <div class="Card" id="Card_{prop._id}" transition:fade>
                <Prop {prop} 
                category={category} 
                bind:props={props} 
                bind:toast={toast} 
                on:delete={handleDelete} 
                on:cancelDelete={handleCancelDelete} />
            </div>
        {/each}
    {:else}
        <p class="loading">loading...</p>
    {/if}
</div>