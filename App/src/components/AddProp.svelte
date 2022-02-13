<script>
    const top = ["T-shirt", "Polo", "Nightshirt", "Onesie", "Shirtwaist", "Sleeveless shirt",
                 "Tube top", "Camisole", "Sweater", "Tank top" ]
    const bottom = ["Pants", "Shorts", "Leggins", "Skirt", "Jeans", "Trousers", "Palazzo", "Slack"]
    const feet = ["Socks", "Sneakers", "Boots", "Flats", "Sandals", "Slippers", "Slipper", "Flip-flops", "Sneakers"]
    const accessories = ["Belt", "Sunglasses", "Hat", "Glasses", "Watch", "Necklace", "Bracelet", "Ring", "Earrings", "Bangle"]
    const fullBody = ["Dress", "Jumpsuit", "Palazzo (full)"]

    let category;

    function strToArr(str) {
        let arr = str.replace(', ', ',').split(',');
        return arr;
    }

    async function onSubmit(e) {
        // Get the data from the form
        let formData = Object.fromEntries(new FormData(e.target).entries());

        // Split comma separated strings in arrays
        let arrTags = strToArr(formData.tags);
        formData.tags = arrTags;
        let arrFabric = strToArr(formData.fabrics);
        formData.fabric = arrFabric;


        // Send data to the API
        await fetch('http://localhost:3000/props/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then(
            () => {
                // reload current page
                window.location.href = '/';
            }
        )     
    }
</script>
<style>
    .AddProp {
        padding: 1rem;
        display: flex;
        
    }
    form {
        width: 100%;
    }
    .form_group {
        flex: 1 0 auto;
        display:flex;
        flex-wrap:wrap;
        column-gap:0.5rem;
        justify-content: center;
        min-width: 100%;
        min-height: 50px;
    }
    .form_group > * {
        flex-grow:1;
        max-width: 200px;
    }
    .form_group input,
    .form_group select,
    .form_group button {
        height: 42px;
        box-sizing: border-box;
    }
    button {
        color: #FFF;
        background-color: #95629d;
        border-radius: 15px;
        padding: 5px 0.5rem 5px;
        min-width: 100px;
    }
    input[type="color"] {
        padding: 0px;
        width: 100%;
        height: 32px;
        margin-top: 0;
    }
    label[for="colors"] {
        display: flex;
        flex-direction: column;
        font-size: 0.6rem;
        line-height: 0.5rem;
        margin-top: 0px;
    }
    input[type="color"]:focus {
        margin-top: 5px;;
    }
</style>

<div class="AddProp">
    <form on:submit|preventDefault={onSubmit}>
        <div class="form_group">
            <input
                type="text"
                id="title"
                name="title"
                placeholder="Name this item"
                required
            />
            <select
                id="category"
                name="category"
                placeholder="What does it cover?"
                required
                bind:value={category}
                on:change={(e) => {
                    category = e.target.value;
                }}
            >
                <option value="">What does it cover?</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
                <option value="fullBody">Full body</option>
                <option value="feet">Feet</option>
                <option value="accessories">Accessories</option>
            </select>
            <select name="subcategory" id="subcategory">
                <option value="">What kind is it?</option>
                {#if category == "top"}
                    {#each top as topItem}
                        <option value="{topItem}">{topItem}</option>
                    {/each}
                {:else if category == "bottom"}
                    {#each bottom as bottomItem}
                        <option value="{bottomItem}">{bottomItem}</option>
                    {/each}
                {:else if category == "fullBody"}
                    {#each fullBody as fullBodyItem}
                        <option value="{fullBodyItem}">{fullBodyItem}</option>
                    {/each}
                {:else if category == "feet"}
                    {#each feet as foot}
                        <option value="{foot}">{foot}</option>
                    {/each}
                {:else if category == "accessories"}
                    {#each accessories as accessory}
                        <option value="{accessory}">{accessory}</option>
                    {/each}
                {/if}
            </select>
            <button type="submit">Add</button>
        </div>
        <div class="form_group">
            <input
                type="url"
                id="imgUrl"
                name="imgUrl"
                placeholder="Choose a picture"
            />
            <label for="colors">Color
                <input
                    type="color"
                    id="colors"
                    name="colors"
                    placeholder="Main color"
                    value="#ffffff"
                />
            </label>
            <input
                type="text"
                id="fabrics"
                name="fabrics"
                placeholder="Fabrics"
            />
            <input
                type="text"
                id="tags"
                name="tags"
                placeholder="Tags"
            />
        </div>
    </form>
</div>