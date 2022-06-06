import {actionTypes} from "../../actions";

const secretWordReducer = (state = '', action) => {
    switch (action.type) {
        case actionTypes.SET_SECRET_WORD:
            return action.payload;
        default:
            return state;
    }
}

export default secretWordReducer;