<script>
    import Outfit from './Outfit.svelte'
</script>

<style>
    .Yesterday {
        grid-area: yesterday;
    }
    figure {
        margin: 15px 10px 0;
        padding: 0;
    }
    caption {
        display: block;
        width: 100%;
        text-align: center;
        margin-bottom: 10px;
    }
</style>

<div class="Yesterday">
    <div class="Yesterday__container">
        <figure>
            <caption>Yesterday</caption>      
            <Outfit/>
        </figure>
    </div>
</div>