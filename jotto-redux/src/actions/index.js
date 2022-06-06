import axios from "axios";
import {getLetterMatchCount} from "../helpers";

export const actionTypes = {
    CORRECT_GUESS: "CORRECT_GUESS",
    GUESS_WORD: "GUESS_WORD",
    SET_SECRET_WORD: 'SET_SECRET_WORD',
    RESET_GAME: "RESET_GAME"
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