import {actionTypes} from "../../actions";

const guessedWordsReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.GUESS_WORD:
            return [...state, action.payload];
        case actionTypes.RESET_GAME:
            return [];
        default:
            return state;
    }
}

export default guessedWordsReducer;