import {storeFactory} from "../test/testUtils";
import {guessWord} from "./actions";
import {getLetterMatchCount} from "./helpers";

describe('guessWord action dispatcher', () => {
    const secretWord = 'party';
    const unsuccessfulGuess = 'train';

    describe('no guessed words', () => {
        let store;
        const initialState = {secretWord};
        beforeEach(() => {
            store = storeFactory(initialState);
        });

        test('updates state correctly for unsuccessful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const newState = store.getState();
            const expectedState = {
                ...initialState,
                success: false,
                guessedWords: [{
                    guessedWord: unsuccessfulGuess,
                    letterMatchCount: getLetterMatchCount(unsuccessfulGuess, secretWord)
                }]
            }
            expect(newState).toEqual(expectedState);
        });

        test('updates state correctly for successful guess', () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState = {
                ...initialState,
                success: true,
                guessedWords: [{
                    guessedWord: secretWord,
                    letterMatchCount: secretWord.length
                }]
            }
            expect(newState).toEqual(expectedState);
        });
    });

    describe('some guessed words', () => {
        const guessedWords = [
            {guessedWord: 'agile', letterMatchCount: getLetterMatchCount('agile', secretWord)}
        ];
        const initialState = {secretWord, guessedWords};
        let store;
        beforeEach(() => {
            store = storeFactory(initialState);
        });

        test('updates state correctly for unsuccessful guess', () => {
            store.dispatch(guessWord(unsuccessfulGuess));
            const newState = store.getState();
            const expectedState = {
                ...initialState,
                secretWord,
                success: false,
                guessedWords: [
                    ...guessedWords,
                    {
                        guessedWord: unsuccessfulGuess,
                        letterMatchCount: getLetterMatchCount(unsuccessfulGuess, secretWord)
                    }
                ]
            }
            expect(newState).toEqual(expectedState);
        });

        test('updates state correctly for successful guess', () => {
            store.dispatch(guessWord(secretWord));
            const newState = store.getState();
            const expectedState = {
                ...initialState,
                secretWord,
                success: true,
                guessedWords: [...guessedWords, {guessedWord: secretWord, letterMatchCount: secretWord.length}]
            }
            expect(newState).toEqual(expectedState);
        });
    });
});