<script>
    import {deepCopy} from "../lib/utilities.js";

    $: editMode = false;
    $: updatedValues = false;
    $: updatedValuesObj = {};
    $: prop;

    export let prop = {};
    let initialProp;
    
    async function deleteProp(prop) {
        const response = await fetch(`http://localhost:3000/props/${prop._id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: prop._id
            })
        });
        const data = await response.json();
        if(data){
            console.log('Delete success');
        } else {
            console.log(data)
            alert('Something went wrong deleting the item');
        }
    }
    function handleClick() {
        let key = this.id;
        let initialValue = prop[key];
        console.log('prop', prop);
        console.log('type prop', typeof(prop));
        if (editMode == true) {
            // Cleaning placholders
            if (this.innerHTML.includes('+') || this.innerHTML.includes('Paste')) {
                this.innerHTML = '';
            }

            // Editing
            this.addEventListener('input', function () {

                let newValue = this.innerHTML;

                // If array
                if (key.includes('-')) {
                    let arrKey = key.split('-')[0];
                    let arrIndex = key.split('-')[1];
                    if (newValue != prop[arrKey][arrIndex]) {
                        updatedValuesObj[arrKey] = prop[arrKey];
                        if (newValue.length > 0) {
                            updatedValues = true;
                            if (arrIndex > updatedValuesObj[arrKey].length) {
                                updatedValuesObj[arrKey].push(newValue.toLowerCase());
                            } else {
                                updatedValuesObj[arrKey][arrIndex] = newValue.toLowerCase();
                            }
                        }else if (newValue == '' || newValue == ' ') {
                            updatedValues = true;
                            updatedValuesObj[arrKey].splice(arrIndex, 1);
                        }
                    }
                }
                if (initialValue != newValue) {
                    updatedValues = true
                    updatedValuesObj[key] = newValue;
                }
            });
        }
    }
    function editProp() {
        editMode = true;
        initialProp = deepCopy(prop);
    }
    function cancelEditProp(prop) {
        if (JSON.stringify(updatedValuesObj) === '{}') { 
            updatedValuesObj = {}; 
            updatedValues = false;
            editMode = false;
        } else {
            updatedValues = true;
            // console.log(updatedValuesObj);
            updatedValuesObj = {};
            prop = initialProp;
            console.log('cancel');
            console.log('prop', prop);
            editMode = false;
            return prop;
        }
    }
    async function saveEditedProp(prop) {
        if (updatedValuesObj != {}) {
            const response = await fetch(`http://localhost:3000/props/${prop._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: prop._id,
                    ...updatedValuesObj
                })
            });
            const data = await response.json();
            if(data){
                editMode = false;
            } else {
                //console.log(data)
                alert('Something went wrong editing the item');
            }
        }        
    }
</script>

<style>
    .Prop {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 5fr 1fr;
        height: 100%;
        width: 100%;
    }
    .prop_gallery {
        grid-row: 1 / -1;
        grid-column: 1 / -1;
        z-index: 1;
        position: relative;
        overflow: hidden;
    }
    .prop_gallery img {
        max-width: 100%;
        max-height: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
    }
    .prop_title {
        grid-row: 1;
        grid-column: 1;
        z-index: 2;
        background-color: rgba(255,255,255,0.6);
    }
    .prop_title h2{
        margin-top: 0px;
        text-transform: capitalize;
    }
    .prop_info {
        grid-row: 2;
        grid-column: 1;
        z-index: 2;
        background: linear-gradient(to bottom, rgba(255,255,255,0.6) 10%,rgba(255,255,255,0) 60%);

    }
    .prop_info_tags {
        display: flex;
        flex-wrap: wrap;
        padding-left: 0;
        margin: 0 0 5px 0;
        max-width: 50%;
    }
    @media (max-width: 650px) {
        .prop_info_tags {
            max-width: 100%;
        }
    }
    .prop_info_tags li {
        list-style: none;
        margin: 0 10px 5px 0;
        border: solid 1px #000;
        border-radius: 3px;
        padding: 2px 4px;
        text-transform: capitalize;
        background-color: rgba(255, 255, 255, 0.4);
    }
    .prop_info_colors,
    .prop_info_fabrics {
        list-style: none;
        padding-left: 0;
        margin: 5px 0;
        max-width: 50%;
    }
    .prop_info_fabrics li{
        text-transform: capitalize;
    }
    .Prop *:not(button):focus {
        background-color: rgba(154, 154, 154, 0.2);
        outline: none;
        padding-left: 5px;
    }
    .prop_info_colors li {
        list-style: none;
        display: inline-block;
        font-size: 0.65rem;
        padding: 3px 6px 3px 3px;
        border-style: solid;
        border-width: 0 0 0 15px;
        border-radius: 10px;
        text-align: center;
        margin-bottom: 5px;
        margin-right: 5px;
        background-color: #DEDEDE;
        box-shadow: -2px 0px 6px 0px rgba(232,190,228,0.5);
    }
    .prop_info_colors li.prop_add-color {
        border-width: 0px;
        padding: 3px 6px;
        min-width: 12px;
        height: 19px;
        box-sizing: border-box;
    }
    #imgUrl {
        max-width: 100%;
        height: auto;
        overflow: auto;
        font-size: 0.65rem;
        margin-top: 20px;
	}
    .dont-break-out {
        /* These are technically the same, but use both */
        overflow-wrap: break-word;
        word-wrap: break-word;

        -ms-word-break: break-all;
        /* This is the dangerous one in WebKit, as it breaks things wherever */
        word-break: break-all;
        /* Instead use this non-standard one: */
        word-break: break-word;

        /* Adds a hyphen where the word breaks, if supported (No Blink) */
        -ms-hyphens: auto;
        -moz-hyphens: auto;
        -webkit-hyphens: auto;
        hyphens: auto;

        }
    .prop_actions {
        grid-row: 3;
        grid-column: 1;
        z-index: 2;
        display: flex;
        justify-content: space-between;
        align-items: center;
        align-self: end;
    }

</style>

<article class="Prop">
    <div class="prop_gallery">
        <img src="{prop.imgUrl}" alt="">
    </div>
    <div class="prop_title">
        <h2 id="title" 
            on:click={handleClick} 
            contentEditable={editMode ? 'true' : 'false'}>
                {prop.title}
        </h2>
    </div>
    <div class="prop_info">
        {#if prop.tags}
            <ul class="prop_info_tags">
                {#each prop.tags as tag, i}
                    <li id="tags-{i}"
                    on:click="{handleClick}"
                    contentEditable={editMode ? 'true' : 'false'}>
                        {tag}
                    </li>
                {:else}
                    {#if editMode && prop.tags[0] == undefined}
                        <li id="tags-{prop.tags.length}" 
                            on:click="{handleClick}" 
                            contentEditable="true">
                                + tag
                        </li>
                    {/if}
                {/each}
                {#if editMode && prop.tags[0] != undefined}
                    <li id="tags-{prop.tags.length}" 
                        on:click="{handleClick}" 
                        contentEditable="true">
                            +
                    </li>
                {/if}
            </ul>
        {/if}
        {#if prop.colors}
            <ul class="prop_info_colors">
                {#each prop.colors as color, i}
                    <li id="colors-{i}"
                    style="border-color: {color};"
                    on:click="{handleClick}"
                    contentEditable={editMode ? 'true' : 'false'}>
                        {color}
                    </li>
                {:else}
                    {#if editMode && prop.colors[0] == undefined}
                        <li class="prop_add-color" id="colors-{prop.colors.length}" on:click="{handleClick}" contentEditable="true">+ Color</li>
                    {/if}
                {/each}
                {#if editMode && prop.colors[0] != undefined}
                    <li class="prop_add-color" id="colors-{prop.colors.length}" on:click="{handleClick}" contentEditable="true">+</li>
                {/if}
            </ul>
        {/if}
        {#if prop.fabrics.length}
            <ul class="prop_info_fabrics">
                {#each prop.fabrics as fabric, i}
                    <li id="fabrics-{i}"
                    on:click="{handleClick}"
                    contentEditable={editMode ? 'true' : 'false'}>
                        {#if fabric == "" && editMode}
                            + fabric
                        {:else}
                            {fabric}
                        {/if}
                    </li>
                {:else}
                    {#if editMode && prop.fabrics[0] == ''}
                        <li id="fabrics-{prop.fabrics.length}" on:click="{handleClick}" contentEditable="true">+ fabric</li>
                    {/if}
                {/each}
                {#if editMode && prop.fabrics[0] != ''}
                    <li id="fabrics-{prop.fabrics.length}" on:click="{handleClick}" contentEditable="true">+</li>
                {/if}
            </ul>
        {/if}
        {#if editMode}
            <div class="dont-break-out" id="imgUrl" on:click={handleClick} contentEditable="true">
                {prop.imgUrl ? prop.imgUrl : "Paste image's URL"}
            </div>
        {/if}
    </div>
    <div class="prop_actions">
        <!-- <button on:click={
            () => addPropToOutfit(prop)
        }>Add to outfit</button> -->
        {#if editMode == false}
            <button on:click={
                () => editProp(prop)
            }><i class="far fa-edit"></i></button>
        {:else}
        <div>
            <button on:click={
                () => saveEditedProp(prop)
            } disabled={updatedValues ? false : true}><i class="far fa-save"></i></button>
 
            <button on:click={
                () => cancelEditProp(prop)
            }><i class="far fa-times-circle"></i></button>
        </div>
        {/if}
        <button on:click={
            () => deleteProp(prop)
        }><i class="far fa-trash-alt"></i></button>
    </div>
</article>