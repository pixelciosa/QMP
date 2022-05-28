import { writable, derived } from "svelte/store";

const timeout = 20000;

const actions = {
    dismiss: {
        execute: 'dismiss',
        text: 'Dismiss',
        toastActionClicked: false
    },
    undo: {
        execute: 'undo',
        text: 'Undo',
        toastActionClicked: false
    },
    confirm: {
        execute: 'confirm',
        text: 'Confirm',
        icon: 'far fa-check-circle',
        toastActionClicked: false
    }
}

function createNotificationStore (timeout) {
    const _notifications = writable([])

    function send (message, type = "default", timeout, actions = [actions.dismiss]) {
        _notifications.update(state => {
            return [...state, { id: id(), type, message, timeout, actions }]
        })
    }

    const notifications = derived(_notifications, ($_notifications, set) => {
        set($_notifications)
        if ($_notifications.length > 0) {
            const timer = setTimeout(() => {
                _notifications.update(state => {
                    state.shift()
                    return state
                })
            }, $_notifications[0].timeout)
            return () => {
                clearTimeout(timer)
            }
        }
    })
    const { subscribe } = notifications

    return {
        subscribe,
        send,
		default: (msg) => send(msg, "default", timeout, [actions.dismiss]),
        danger: (msg) => send(msg, "danger", timeout, [actions.confirm]),
        warning: (msg) => send(msg, "warning", timeout, [actions.undo, actions.dismiss]),
        info: (msg) => send(msg, "info", timeout, [actions.dismiss]),
        success: (msg) => send(msg, "success", timeout, [actions.dismiss])
    }
}

function id() {
    return Date.now()
};

export const notifications = createNotificationStore(timeout)