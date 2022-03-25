<script>
    import {onMount} from "svelte";
    import { createEventDispatcher } from 'svelte';
    import {strToArr} from '../lib/utilities.js';
    import {categoriesFactory, topObject, bottomObject, feetObject, accessoryObject, fullBodyObject} from "../lib/factories.js";

    const dispatch = createEventDispatcher();
    export let props;
    $: props = props;
    // let initialPropsLength = props[top].length;
    // $: if (props[top].length != initialPropsLength) {
    //     console.log('props changed');
    // }

    let categories = {};
    let categoriesObj = {};
    let topSubcategories = [];
    let bottomSubcategories = [];
    let feetSubcategories = [];
    let accessoriesSubcategories = [];
    let fullBodySubcategories = [];
    let category;

    onMount(async () => {
        console.log('props on mount Add item', props);
        await fetch(`http://localhost:3000/categories/`)
            .then(r => r.json())
            .then(data => {
                categories = data.map((category) => {
                    return {
                        title: category.title,
                        subcategories: category.subcategories
                    }
                });
            })
            .then(() => {
                categoriesObj = categoriesFactory(categories);
            })
            .then(() => {
                for (const key in categoriesObj){
                    if (key === 'top'){
                        topSubcategories = categoriesObj[key].subcategories;
                    } else if (key === 'bottom'){
                        bottomSubcategories = categoriesObj[key].subcategories;
                    } else if (key === 'feet'){
                        feetSubcategories = categoriesObj[key].subcategories;
                    } else if (key === 'accessories'){
                        accessoriesSubcategories = categoriesObj[key].subcategories;
                    } else if (key === 'fullBody'){
                        fullBodySubcategories = categoriesObj[key].subcategories;
                    }
                }
            });
    });

    

    async function onSubmit(e) {
        // Get the data from the form
        let formData = Object.fromEntries(new FormData(e.target).entries());

        // Split comma separated strings in arrays
        let arrTags = new strToArr(formData.tags);
        formData.tags = arrTags;
        let arrFabrics = new strToArr(formData.fabrics);
        formData.fabric = arrFabrics;
        let arrColors = new strToArr(formData.colors);
        formData.colors = arrColors;

        // Send data to the API
        await fetch('http://localhost:3000/props/',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        }).then(
            () => {
                // Reset the form
                e.target.reset();
                // Update local props object to show the new prop inmediatly
                let newObj;
                if (formData.category == 'top') {
                    newObj = new topObject(formData);
                };
                if (formData.category == 'bottom') {
                    newObj = new bottomObject(formData);
                };
                if (formData.category == 'feet') {
                    newObj = new feetObject(formData);
                };
                if (formData.category == 'accessories') {
                    newObj = new accessoryObject(formData);
                };
                if (formData.category == 'fullBody') {
                    newObj = new fullBodyObject(formData);
                };
                props[formData.category].push(newObj);
            }
        );
        console.log(props);
        return props;  
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
                    {#each topSubcategories as topSubcategory}
                        <option value="{topSubcategory}">{topSubcategory}</option>
                    {/each}
                {:else if category == "bottom"}
                    {#each bottomSubcategories as bottomSubcategory}
                        <option value="{bottomSubcategory}">{bottomSubcategory}</option>
                    {/each}
                {:else if category == "fullBody"}
                    {#each fullBodySubcategories as fullBodySubcategory}
                        <option value="{fullBodySubcategory}">{fullBodySubcategory}</option>
                    {/each}
                {:else if category == "feet"}
                    {#each feetSubcategories as footSubcategory}
                        <option value="{footSubcategory}">{footSubcategory}</option>
                    {/each}
                {:else if category == "accessories"}
                    {#each accessoriesSubcategories as accessorySubcategory}
                        <option value="{accessorySubcategory}">{accessorySubcategory}</option>
                    {/each}
                {/if}
            </select>
            <button type="submit" on:click="{() => dispatch('submit', props)}">Add</button>
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