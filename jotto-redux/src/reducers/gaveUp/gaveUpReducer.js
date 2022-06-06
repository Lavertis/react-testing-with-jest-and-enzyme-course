import {actionTypes} from "../../actions";

const gaveUpReducer = (state = false, action) => {
    switch (action.type) {
        case actionTypes.GIVE_UP:
            return true;
        case actionTypes.RESET_GAME:
            return false;
        default:
            return state;
    }
}

export default gaveUpReducer;