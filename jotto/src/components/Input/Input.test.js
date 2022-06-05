import React from 'react';
import {shallow} from 'enzyme';
import Input from './Input';
import {findByTestAttribute} from "../../../test/testUtils";

// mock entire module for destructuring useState on import
// const mockSetCurrentGuess = jest.fn();
// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: (initialState) => [initialState, mockSetCurrentGuess]
// }))

const setup = (success = false, secretWord = 'party') => {
    return shallow(<Input success={success} secretWord={secretWord}/>);
}

describe('render', () => {
    describe('success is true', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup(true);
        });

        test('renders without error', async () => {
            const inputComponent = await findByTestAttribute(wrapper, 'component-input');
            expect(inputComponent.length).toBe(1);
        });

        test('input box does not show', async () => {
            const inputBox = await findByTestAttribute(wrapper, 'input-box');
            expect(inputBox.exists()).toBe(false);
        })

        test('submit button does not show', async () => {
            const submitButton = await findByTestAttribute(wrapper, 'submit-button');
            expect(submitButton.exists()).toBe(false);
        });
    });

    describe('success is false', () => {
        let wrapper;
        beforeEach(() => {
            wrapper = setup(false);
        });

        test('renders without error', async () => {
            const inputComponent = await findByTestAttribute(wrapper, 'component-input');
            expect(inputComponent.length).toBe(1);
        });

        test('input box shows', async () => {
            const inputBox = await findByTestAttribute(wrapper, 'input-box');
            expect(inputBox.exists()).toBe(true);
        })

        test('submit button shows', async () => {
            const submitButton = await findByTestAttribute(wrapper, 'submit-button');
            expect(submitButton.exists()).toBe(true);
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
        wrapper = setup();
    });

    afterEach(() => {
        React.useState = originalUseState;
    });

    test('state updates with value of input box upon change', async () => {
        const value = 'train';
        const mockEvent = {target: {value: value}};

        const inputBox = await findByTestAttribute(wrapper, 'input-box');
        inputBox.simulate('change', mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith(value);
    });

    test('field is cleared upon submit button click', async () => {
        const mockEvent = {preventDefault: jest.fn()};

        const submitButton = await findByTestAttribute(wrapper, 'submit-button');
        submitButton.simulate('click', mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
    });
});