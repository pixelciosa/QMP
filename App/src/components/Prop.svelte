<script>
    export let prop = {};
    $: editMode = false;
    $: updatedValues = false;
    $: updatedValuesObj = {};
    $: originalProp = {};
    
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
            window.location.href = '/';
        } else {
            console.log(data)
            alert('Something went wrong deleting the item');
        }
    }
    function handleClick() {
        let key = this.id;
        let oldValue = prop[key];
        if (editMode == true) {
            this.addEventListener('input', function () {
                let newValue = this.innerHTML;
                if (oldValue != newValue) {
                    updatedValues = true
                    updatedValuesObj[key] = newValue;
                }
            });
        }
    }
    function editProp(prop) {
        editMode = true;
    }
    function cancelEditProp() {
        console.log(updatedValuesObj);
        if (JSON.stringify(updatedValuesObj) === '{}') {
            editMode = false;
            updatedValues = false;
            updatedValuesObj = {};
        } else {
            console.log('cancel');
            window.location.href = '/';
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
                window.location.href = '/';
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
        grid-template-rows: 1fr 3fr 1fr;
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
    .prop_info_tags li {
        list-style: none;
        margin: 0 10px 5px 0;
        border: solid 1px #000;
        border-radius: 3px;
        padding: 2px 4px;
        background-color: rgba(255, 255, 255, 0.4);
    }
    .prop_info_features {
        list-style: none;
        padding-left: 0;
        margin: 5px 0;
        max-width: 50%;
    }
    .Prop *:not(button):focus {
        background-color: rgba(154, 154, 154, 0.2);
        outline: none;
        padding-left: 5px;
    }
    #color {
        list-style: none;
        display: block;
        font-size: 0.65rem;
        width: 26px;
        height: 26px;
        border-radius: 13px;
        text-align: center;
        margin-bottom: 5px;;
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
        <h2 id="title" on:click={handleClick} contentEditable={editMode ? 'true' : 'false'}>{prop.title}</h2>
    </div>
    <div class="prop_info">
        {#if prop.tags != ''}
            <ul class="prop_info_tags">
                {#each prop.tags as tag, i}
                <li id="tag-{i}">{tag}</li>
                {/each}
            </ul>
        {/if}
        {#if prop.fabric || prop.color}
            <ul class="prop_info_features">
                {#if prop.color}
                    <li id="color"
                     style="background-color: {prop.color};"
                     on:click={handleClick}
                     contentEditable={editMode ? 'true' : 'false'}>
                    </li>
                {/if}
                {#if prop.fabric}
                    <li id="fabric" on:click={handleClick} contentEditable={editMode ? 'true' : 'false'}>{prop.fabric}</li>
                {/if}
            </ul>
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