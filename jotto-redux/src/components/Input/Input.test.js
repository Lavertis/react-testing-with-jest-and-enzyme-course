import React from 'react';
import {mount} from 'enzyme';
import Input from './Input';
import {findByTestAttribute, storeFactory} from "../../../test/testUtils";
import {Provider} from "react-redux";

// mock entire module for destructuring useState on import
// const mockSetCurrentGuess = jest.fn();
// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: (initialState) => [initialState, mockSetCurrentGuess]
// }))

const setup = (initialState = {}, secretWord = 'party') => {
    const store = storeFactory(initialState);
    return mount(
        <Provider store={store}>
            <Input secretWord={secretWord}/>
        </Provider>
    );
}

describe('render', () => {
    describe('successReducer is true', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup({success: true});
        });

        test('renders without error', () => {
            const inputComponent = findByTestAttribute(wrapper, 'component-input');
            expect(inputComponent.length).toBe(1);
        });

        test('input box does not show', () => {
            const inputBox = findByTestAttribute(wrapper, 'input-box');
            expect(inputBox.exists()).toBe(false);
        })

        test('submit button does not show', () => {
            const takeGuessButton = findByTestAttribute(wrapper, 'take-guess-button');
            expect(takeGuessButton.exists()).toBe(false);
        });
    });

    describe('successReducer is false', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup({success: false});
        });

        test('renders without error', () => {
            const inputComponent = findByTestAttribute(wrapper, 'component-input');
            expect(inputComponent.length).toBe(1);
        });

        test('input box shows', () => {
            const inputBox = findByTestAttribute(wrapper, 'input-box');
            expect(inputBox.exists()).toBe(true);
        })

        test('submit button shows', () => {
            const takeGuessButton = findByTestAttribute(wrapper, 'take-guess-button');
            expect(takeGuessButton.exists()).toBe(true);
        });
    });
});

describe('state controlled input field', () => {
    const mockSetCurrentGuess = jest.fn();
    let originalUseState;
    let wrapper;

    beforeEach(() => {
        mockSetCurrentGuess.mockClear();
        originalUseState = React.useState;
        React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
        wrapper = setup({success: false});
    });

    afterEach(() => {
        React.useState = originalUseState;
    });

    test('state updates with value of input box upon change', () => {
        const value = 'train';
        const mockEvent = {target: {value: value}};

        const inputBox = findByTestAttribute(wrapper, 'input-box');
        inputBox.simulate('change', mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith(value);
    });

    test('field is cleared upon submit button click', () => {
        const mockEvent = {preventDefault: jest.fn()};

        const takeGuessButton = findByTestAttribute(wrapper, 'take-guess-button');
        takeGuessButton.simulate('click', mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
    });
});