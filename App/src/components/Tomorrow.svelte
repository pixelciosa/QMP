<script>
    import Outfit from './Outfit.svelte'
</script>

<style>
    .Tomorrow {
        grid-area: tomorrow;
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

<div class="Tomorrow">
    <div class="Tomorrow__container">
        <figure>
            <caption>Tomorrow</caption>      
            <Outfit/>
        </figure>
    </div>
</div>