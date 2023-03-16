<script>
    import { createEventDispatcher } from 'svelte';
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";
    import { notifications } from "../lib/notifications.js";

    export let themes = {
        danger: "#E26D69",
        success: "#84C991",
        warning: "#f0ad4e",
        info: "#5bc0de",
        default: "#aaaaaa"
    };

    const dispatch = createEventDispatcher();

    const handleClick = (notifId, propId, action) => {
        // undo delete
        if (action === "undo") {
            notifications.update(
                
            )
        }
        // dismiss notification
        if (action === "dismiss") {
            return notifications.dismiss(notifId);
        }
    }
</script>

<style>
    .notifications {
        position: fixed;
        bottom: 10px;
        left: 0;
        right: 0;
        margin: 0 auto;
        padding: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .toast {
        flex: 1 0 100%;
        margin-bottom: 10px;
        min-width: 100%;
    }

    .content {
        padding: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #000000;
        font-weight: 500;
    }
    .actions .far {
        font-size: 20px;
        color: #000000;
        z-index: 99;
    }
    .actions button + button {
        margin-left: 20px;
    }

</style>

<div class="Toast notifications">
    {#each $notifications as notification (notification.id)}
        <div
            animate:flip
            class="toast"
            id="toast_{notification.id}"
            style="background: {themes[notification.type]};"
            in:fly="{{ y: 20 }}" 
            out:fly="{{ x: -100, duration: 1000 }}"
        >
            <div class="content">
                {notification.message}
                
                {#if notification.actions}
                    <div class="actions">
                        {#if notification.actions[0].icon}
                        <i class={notification.actions[0].icon}/>
                        {/if}
                        {#each notification.actions as action}
                        <button on:click={handleClick(notification.id, notification.propId, action.execute)}>{action.text}</button>
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
    {/each}
</div>