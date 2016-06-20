export const CONTROL_SIDEBAR_TOGGLE = 'CONTROL_SIDEBAR_TOGGLE';
export const SKIN_CHANGE = 'SKIN_CHANGE';
export const LAYOUT_CHANGE = 'LAYOUT_CHANGE';

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

export function layoutChange(layout) {
    return {
        type: LAYOUT_CHANGE,
        payload: {
            layout: layout
        }
    }
}


