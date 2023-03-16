import { writable, derived } from "svelte/store";

const timeout = 2000;

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

let _notifications = writable([]);

function createNotificationStore (timeout) {

    function send (message, propId = "null", type = "default", timeout, actions = [actions.dismiss]) {
        _notifications.update(state => {
            //console.log('copiedActions', copiedActions)
            console.log('{ id: id(), propId, type, message, timeout, actions }', { id: id(), propId, type, message, timeout, actions })
            return [...state, { id: id(), propId, type, message, timeout, actions }]
        })
    }
    
    let notifications = derived(_notifications, ($_notifications, set) => {
        set($_notifications);
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
    let { subscribe } = notifications;

    let getTimeoutConst = () => {
        return timeout
    }
    let dismissNotification = (id) => {
        console.log('id notif', id)
        document.getElementById(`toast_${id}`).style.display = 'none';
        _notifications.update(state => {
            let arr = [...state];
            let i = state.findIndex(x => x.id == id);
            if (i >= 0) {
                arr.splice(i, 1);
                console.log('state pre', state);
                state = arr;
                console.log('state post', state);
                return state;
            }
        })
    }

    return {
        subscribe,
        send,
		default: (msg, propId) => send(msg, propId, "default", timeout, [actions.dismiss]),
        danger: (msg, propId) => send(msg, propId, "danger", timeout, [actions.confirm]),
        warning: (msg, propId) => send(msg, propId, "warning", timeout, [actions.undo, actions.dismiss]),
        info: (msg, propId) => send(msg, propId, "info", timeout, [actions.dismiss]),
        success: (msg, propId) => send(msg, propId, "success", timeout, [actions.dismiss]),
        getTimer: () => getTimeoutConst(),
        dismiss: (id) => dismissNotification(id)
    }
}


function id() {
    return Date.now()
};

export let notifications = createNotificationStore(timeout);

