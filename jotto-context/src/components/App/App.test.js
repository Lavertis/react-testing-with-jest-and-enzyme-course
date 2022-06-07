import {mount} from "enzyme";
import React from "react";
import App from "./App";
import {findByTestAttribute} from "../../../test/testUtils";
import {getSecretWord as getSecretWordMock} from "../../actions";

// activate global mock to make sure getSecretWord doesn't make a network request
jest.mock('../../actions');


const setup = () => {
    return mount(<App/>);
}

describe.each([
    [null, true, false],
    ['party', false, true]
])
(
    'renders with secretWord as %s',
    (secretWord, loadingShows, appShows) => {
        let wrapper;
        let originalUseReducer;
        beforeEach(() => {
            originalUseReducer = React.useReducer;
            const useReducerMock = jest.fn().mockReturnValue([{secretWord}, jest.fn()])
            React.useReducer = useReducerMock;
            wrapper = setup();
        })

        afterEach(() => {
            React.useReducer = originalUseReducer;
        })

        test(`renders the app: ${appShows}`, () => {
            const appComponent = findByTestAttribute(wrapper, 'component-app');
            expect(appComponent.exists()).toBe(appShows);
        })

        test(`renders loading spinner: ${loadingShows}`, () => {
            const spinnerComponent = findByTestAttribute(wrapper, 'spinner');
            expect(spinnerComponent.exists()).toBe(loadingShows);
        })
    }
)

describe('getSecretWord', () => {
    beforeEach(() => {
        // clear the mock calls from previous tests
        getSecretWordMock.mockClear();
    });

    test('calls getSecretWord action on app mount', () => {
        const wrapper = setup();
        expect(getSecretWordMock).toHaveBeenCalledTimes(1);
    });

    test('does not call getSecretWord action on app update', () => {
        const wrapper = setup();
        getSecretWordMock.mockClear();

        // using setProps, because wrapper.update() doesn't trigger useEffect
        wrapper.setProps();

        expect(getSecretWordMock).not.toHaveBeenCalled();
    });
});