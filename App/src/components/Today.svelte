<script>
    import Outfits from './Outfits.svelte'
</script>
<style>
    .Today__header {
        grid-area: todayUp;
        text-align: center;
    }
    h2 {
        margin: 15px;
        font-size: 18px;
    }
    input {
        border-radius: 15px;
        height: 30px;
        padding: 5px;
        border: solid 2px rgb(161, 114, 156);
        width: 100%;
        max-width: 300px;
    }
    figure {
        grid-area: today;
    }
</style>
<div class="Today">
    <div class="Today__container">
        <div class="Today__header">
            <h2>Today</h2>
            <input type="search">
        </div>
        <figure>
            <img src="{ Outfits.today.top }" alt="">
            <img src="{ Outfits.today.bottom }" alt="">
            <img src="{ Outfits.today.bag }" alt="">
            <img src="{ Outfits.today.shoes }" alt="">
            <img src="{ Outfits.today.accessory.brazalet }" alt="">
            <img src="{ Outfits.today.accessory.hat }" alt="">
        </figure>
    </div>
</div>