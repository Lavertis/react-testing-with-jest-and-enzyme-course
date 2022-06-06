import moxios from 'moxios';
import {getSecretWord} from "./index";
import {storeFactory} from "../../test/testUtils";


describe('getSecretWord', function () {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('returns the secret word', () => {
        const store = storeFactory();

        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: 'party'
            });
        });

        // update to test app in Redux/Context sections
        return store.dispatch(getSecretWord())
            .then(() => {
                const secretWord = store.getState().secretWord;
                expect(secretWord).toBe('party');
            })
    });
});