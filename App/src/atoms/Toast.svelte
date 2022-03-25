<script>
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';
    import { afterUpdate } from 'svelte';

    export let Toast = {};

    let toastElement;
    
    onMount(() => {
        toastElement = document.querySelector('.Toast');
        Toast.ToastActionClicked = false;
        showToast();
    });
    function showToast() {
        toastElement.classList.add('show');
        return setTimeout(() => {
            dismissToast();
        }, Toast.ToastDuration);
    }
    function dismissToast() {
        toastElement.remove();
        return Toast.ToastActionClicked = false;
    }

    function handleClick(event) {
        if (event.target.innerHTML === 'Dismiss') {
            return dismissToast();
        } else {
            console.log('toast action clicked');
            Toast.ToastActionClicked = true; 
            return Toast.ToastActionClicked
        }
    }


</script>

<style>
    .Toast {
        position: fixed;
        z-index: 1000;
        bottom: -50px;
        left: 0;
        right: 0;
        padding: 15px;
        display: flex;
        align-content: space-between;
    }
    .Toast.show {
        bottom: 0;
    }
    .Toast--info-delete {
        background-color: #343a40;
        color: #f8f9fa;
    }
    .Toast > div{
        flex-grow: 1;
    }
    .toast__action {
        text-align: right;
    }

</style>

<div class="Toast Toast--{Toast.ToastType}" transition:slide>
    <div class="toast__message">{Toast.ToastMessage}</div>
    <div class="toast__action"><button on:click="{handleClick}">{Toast.ToastAction}</button></div>
</div>