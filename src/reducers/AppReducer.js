import { createReducer } from '../utils';
import { CONTROL_SIDEBAR_TOGGLE, SKIN_CHANGE } from '../actions/AppActions'

const initialState = {
    isControlSideBarShown: false,
    skin: 'skin-yellow'
};

export default createReducer(initialState, {
    [CONTROL_SIDEBAR_TOGGLE]: (state, payload) => {
        return Object.assign({}, state, {
            'isControlSideBarShown': !state.isControlSideBarShown
        });
    },
    [SKIN_CHANGE]: (state, payload) => {
        return Object.assign({}, state, {
            'skin': payload.skin
        });
    }
})
