<script>
    import Main from '../components/Main.svelte';
</script>

<style>
    :global(body) {
        font-family: 'Quicksand', sans-serif;
        background-color: #f5eaf3;
        color: #333333;
        font-weight: 400;
        font-size: 13px;
        margin: 0px;
        width: 100%;
    }
    :global(input) {
        margin-bottom: 0.5rem;
        border: 0px;
        padding: 5px;
        font-size: 0.8rem;
    }
    :global(select) {
        margin-bottom: 0.5rem;
        border: 0px;
        padding: 5px;
        font-size: 0.8rem;
    }
    :global(form button) {
        margin-bottom: 0.5rem;
        border: 0px;
        padding: 5px;
        font-size: 1rem;
    }
    :global(form *:focus) {
        transform: scale(1.05);
        border-bottom: solid 2px #95629d;
        outline: none;
    }
    :global(.center) {
        margin: 0 auto;
        text-align: center;
        align-self: center;
        justify-self: center;
    }
</style>

<Main />