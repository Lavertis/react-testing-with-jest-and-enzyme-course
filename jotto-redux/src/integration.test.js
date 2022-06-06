import {storeFactory} from "../test/testUtils";
import {guessWord, setUserSecretWord} from "./actions";
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
                gaveUp: false,
                userEnter: null,
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
                gaveUp: false,
                userEnter: null,
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
                gaveUp: false,
                userEnter: null,
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
                gaveUp: false,
                userEnter: null,
                guessedWords: [...guessedWords, {guessedWord: secretWord, letterMatchCount: secretWord.length}]
            }
            expect(newState).toEqual(expectedState);
        });
    });
});

describe('setUserSecretWord action dispatcher', () => {
    // this is in the integration test section because it
    // involves the setUserSecretWord action creator and two reducers
    let store;
    let newState;

    // this represents the word the user entered
    const userSecretWord = 'lunch';

    // this represents the word we got from the server
    const initialState = {secretWord: 'party'};

    // here I will run the action in the beforeEach, and
    // check on each relevant piece of state separately
    beforeEach(() => {
        store = storeFactory(initialState);
        store.dispatch(setUserSecretWord(userSecretWord));
        newState = store.getState();
    });

    test('updates `secretWord` state correctly after entered word', () => {
        expect(newState.secretWord).toBe(userSecretWord);
    });

    test('updates `userEnter` state correctly after entered word', () => {
        expect(newState.userEnter).toBe('done');
    });
});