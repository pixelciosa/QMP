<script>
    import { afterUpdate, onMount } from 'svelte';
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";

    export let toast;
    export let toasts = [];
    $: toast;
    
    onMount(() => {
        console.log('Toast mounted');
    });
    // afterUpdate((toast) => {
    //     console.log('Toast updated');
    //     console.log('toast', toast);
    //     toast.id = Date.now();
    //     toasts = [...toasts, toast];
    //     toast.ToastActionClicked = false;
    //     showToast();
    // });

    function showToast() {
        return setTimeout(() => {
            dismissToast();
        }, toast.ToastDuration);
    };

    function dismissToast() {
        toast.ToastActionClicked = false;
        return toast.ToastActionClicked;
    };

    function handleClick(event) {
        if (event.target.innerHTML === 'Dismiss') {
            console.log('Dismiss clicked');
            return dismissToast();
        } else {
            console.log('toast action clicked');
            toast.ToastActionClicked = true; 
            return toast.ToastActionClicked;
        }
    };

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

<div class="Toasts">
    {#each toasts as toast (toast.id)}
        <div class="Toast Toast--{toast.ToastType}" animate:flip transition:fly={{ y: 30 }}>
            <div class="toast__message">{toast.ToastMessage}</div>
            <div class="toast__action"><button on:click="{handleClick}">{toast.ToastAction}</button></div>
        </div>
    {/each}
</div>