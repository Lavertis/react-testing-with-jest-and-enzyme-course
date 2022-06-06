import axios from "axios";
import {getLetterMatchCount} from "../helpers";

export const actionTypes = {
    CORRECT_GUESS: "CORRECT_GUESS",
    GUESS_WORD: "GUESS_WORD",
    SET_SECRET_WORD: "SET_SECRET_WORD",
    RESET_GAME: "RESET_GAME",
    GIVE_UP: "GIVE_UP",
    USER_ENTERING: "USER_ENTERING",
    USER_ENTERED: "USER_ENTERED"
}

export const setUserEntering = () => ({type: actionTypes.USER_ENTERING});

export const setUserSecretWord = (userSecretWord) => (dispatch) => {
    dispatch({type: actionTypes.SET_SECRET_WORD, payload: userSecretWord});
    dispatch({type: actionTypes.USER_ENTERED});
};

export const giveUp = () => dispatch => {
    dispatch({type: actionTypes.GIVE_UP})
}

export const resetGame = () => dispatch => {
    dispatch({type: actionTypes.RESET_GAME});
    dispatch(getSecretWord());
}

export const guessWord = guessedWord => (dispatch, getState) => {
    const secretWord = getState().secretWord;
    const letterMatchCount = getLetterMatchCount(guessedWord, secretWord);

    dispatch({
        type: actionTypes.GUESS_WORD,
        payload: {guessedWord: guessedWord, letterMatchCount: letterMatchCount}
    })

    if (guessedWord === secretWord)
        dispatch({type: actionTypes.CORRECT_GUESS})
}

export const getSecretWord = () => dispatch => {
    return axios.get('http://localhost:3030')
        .then(response => dispatch({
            type: actionTypes.SET_SECRET_WORD,
            payload: response.data
        }));
}