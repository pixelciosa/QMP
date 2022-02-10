<script>
    import Yesterday from './Yesterday.svelte';
    import Today from './Today.svelte';
    import Tomorrow from './Tomorrow.svelte';
</script>

<style>
    .Timeline {
        display: grid;
        grid-template-columns: 100px auto 100px;
        grid-template-rows: 1fr 5fr;
        grid-template-areas: "yesterday todayUp tomorrow"
                             "today     today    today";
    }
</style>

<div class="Timeline">
    <Yesterday />
    <Today />
    <Tomorrow />
</div>