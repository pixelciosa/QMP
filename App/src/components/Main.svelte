<script>

import {onMount, afterUpdate} from "svelte";
import Props from "./Props.svelte";
import AddProp from "./AddProp.svelte";
import Switch from "./../atoms/Switch.svelte";
import {propsFactory} from "../lib/factories.js";
// import Timeline from "./Timeline.svelte";
// import Actions from "./Actions.svelte";

$: props = {};
$: fullBody = {label: 'Full body', value:false};

onMount(async () => {
    await fetch(`http://localhost:3000/props/`)
        .then(r => r.json())
        .then(data => {
            props = propsFactory(data);
        })
        .catch(e => console.log(e));
})
afterUpdate(() => {
    
});

function reloadProps() {
    console.log('submitted', event.detail);
    console.log('updated props',props);
}

</script>

<style>
    .Main__container {
        height: 100%;
        width: 100%;
    }
    .Main__container__controls {
        margin-bottom: 20px;
    }
    .Props {
        display: flex;
        flex-direction: column;
        align-content: center;
    }
</style>

<div class="Main">
    <div class="Main__container">
        <!-- <Timeline />
        <Actions /> -->
        <AddProp bind:props={props} on:submit={reloadProps} />
        <div class="Main__container__controls">
            <div class="center">
                <Switch bind:Switch={fullBody} /><span>{fullBody.label}</span>
            </div>
        </div>
        <div class="Props">
            {#if fullBody.value == false}
                <Props category="top" bind:props={props.top} />
                <Props category="bottom" bind:props={props.bottom} />
            {:else}
                <Props category="fullBody" bind:props={props.fullBody} />
            {/if}
            <Props category="feet" bind:props={props.feet} />
        </div>
    </div>
</div>