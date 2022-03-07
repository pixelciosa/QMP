<script>

import Props from "./Props.svelte";
import AddProp from "./AddProp.svelte";
import Switch from "./../atoms/Switch.svelte";
// import Timeline from "./Timeline.svelte";
// import Actions from "./Actions.svelte";

$: fullBody = {label: 'Full body', value:false};

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
        <AddProp />
        <div class="Main__container__controls">
            <div class="center">
                <Switch bind:Switch={fullBody} /><span>{fullBody.label}</span>
            </div>
        </div>
        <div class="Props">
            {#if fullBody.value == false}
                <Props category="top"/>
                <Props category="bottom"/>
            {:else}
                <Props category="fullBody"/>
            {/if}
            <Props category="feet"/>
        </div>
    </div>
</div>