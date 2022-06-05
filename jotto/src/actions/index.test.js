import moxios from 'moxios';
import {getSecretWord} from "./index";

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