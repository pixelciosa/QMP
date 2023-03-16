<script>

import {onMount} from "svelte";
import Props from "./Props.svelte";
import AddProp from "./AddProp.svelte";
import Switch from "./../atoms/Switch.svelte";
import {propsFactory} from "../lib/factories.js";
import Toast from "../atoms/Toast.svelte";
import { notifications } from "../lib/notifications";

// import Timeline from "./Timeline.svelte";
// import Actions from "./Actions.svelte";

const API = import.meta.env.API ? import.meta.env.API : 'http://localhost:3000/';

$: props = {};
$: fullBody = {label: 'Full body', value:false};
 
let toast;

notifications.subscribe(value => {
    toast = value
})
const unsubscribe = notifications.subscribe(value => {
    toast = value
})

onMount(async () => {
    console.log('API', API);
    await fetch(`${API}/props/`)
    //await fetch('http://localhost:3000/props/')
        .then(r => r.json())
        .then(data => {
            props = propsFactory(data);
            console.log('props on mount', props);
        })
        .catch(e => console.log(e));
});

function reloadProps() {
    console.log('updated props',props);
};

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
                <Props category="top" bind:props={props}/>
                <Props category="bottom" bind:props={props}/>
            {:else}
                <Props category="fullBody" bind:props={props} />
            {/if}
            <Props category="feet" bind:props={props} />
        </div>
    </div>

    <Toast/>

</div>