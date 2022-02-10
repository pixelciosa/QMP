<style>
    .Actions {
        position: sticky;
        bottom: 0;
        height: 70px;
    }
    .Actions__container {
        width: 100%;
        height: 100%;
        display: grid;
        grid-template-columns: 1fr 50px 1fr;
        grid-column-gap: 10px;
        place-items: center;
        background-color: rgba(161, 114, 156, 0.5);
        color: #FFFFFF;
    }
    .Actions__item {
        font-size: 20px;
        text-align: center;
    }
</style>

<div class="Actions">
    <div class="Actions__container">
        <div class="Actions__item">My outfits</div>
        <div class="Actions__item">
            <i class="fas fa-2x fa-plus-square"></i>
        </div>
        <div class="Actions__item">Community's Outfits</div>
    </div>
</div>