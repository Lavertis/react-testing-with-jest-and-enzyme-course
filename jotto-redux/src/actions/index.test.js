import moxios from 'moxios';
import {actionTypes, correctGuess, getSecretWord} from "./index";

describe('correctGuess', function () {
    test('returns an action with type "CORRECT_GUESS"', () => {
        const action = correctGuess();
        expect(action).toStrictEqual({type: actionTypes.CORRECT_GUESS});
    });
});

describe('getSecretWord', function () {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('returns the secret word', async () => {
        await moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: 'party'
            });
        });

        // update to test app in Redux/Context sections
        return getSecretWord()
            .then(secretWord => {
                expect(secretWord).toBe('party');
            })
    });
});