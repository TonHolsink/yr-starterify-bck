export const CONTROL_SIDEBAR_TOGGLE = 'CONTROL_SIDEBAR_TOGGLE';
export const SKIN_CHANGE = 'SKIN_CHANGE';

export function controlSideBarToggle() {
    return {
        type: CONTROL_SIDEBAR_TOGGLE
    }
}

export function skinChange(skin) {
    return {
        type: SKIN_CHANGE,
        payload: {
            skin: skin
        }
    }
}


