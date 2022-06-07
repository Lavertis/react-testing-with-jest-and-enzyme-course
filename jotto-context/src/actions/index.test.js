import moxios from 'moxios';
import {getSecretWord} from "./index";

describe('getSecretWord', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });

    test('returns the secret word', async () => {
        const response = 'party'
        moxios.wait(() => {
            const request = moxios.requests.mostRecent();
            request.respondWith({
                status: 200,
                response: response
            });
        });

        const setSecretWordMock = jest.fn();
        await getSecretWord(setSecretWordMock);
        expect(setSecretWordMock).toHaveBeenCalledWith(response);
    });
});