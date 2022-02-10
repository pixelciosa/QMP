<script>

import Props from "./Props.svelte";
import AddProp from "./AddProp.svelte";
// import Timeline from "./Timeline.svelte";
// import Actions from "./Actions.svelte";

</script>

<style>
    .Main__container {
        height: 100%;
        width: 100%;
    }
</style>

<div class="Main">
    <div class="Main__container">
        <!-- <Timeline />
        <Actions /> -->
        <AddProp />
        <div class="Props">
            <Props category="top"/>
            <Props category="bottom"/>
            <Props category="feet"/>
        </div>
    </div>
</div>