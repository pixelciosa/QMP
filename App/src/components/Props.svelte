<script>
    import Prop from "./Prop.svelte";
    export let props;
    export let category;
    
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
    {#if props}
        {#each props as prop}
            <div class="Card">
                <Prop {prop} />
            </div>
        {/each}
    {:else}
        <p class="loading">loading...</p>
    {/if}
</div>