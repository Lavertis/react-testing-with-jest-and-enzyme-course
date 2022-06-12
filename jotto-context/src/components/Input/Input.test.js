import React from 'react';
import {mount} from 'enzyme';
import Input from './Input';
import {findByTestAttribute} from "../../../test/testUtils";
import languageContext from "../../contexts/language/languageContext";
import successContext from "../../contexts/success/successContext";
import guessedWordsContext from "../../contexts/guessedWords/guessedWordsContext";

// mock entire module for destructuring useState on import
// const mockSetCurrentGuess = jest.fn();
// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useState: (initialState) => [initialState, mockSetCurrentGuess]
// }))

const setup = ({language = 'en', secretWord = 'party', success = false}) => {
    return mount(
        <languageContext.Provider value={language}>
            <successContext.SuccessProvider value={[success, jest.fn()]}>
                <guessedWordsContext.GuessedWordsProvider>
                    <Input secretWord={secretWord}/>
                </guessedWordsContext.GuessedWordsProvider>
            </successContext.SuccessProvider>
        </languageContext.Provider>
    );
}

describe('languagePicker', () => {
    test('renders submit string in English', () => {
        const wrapper = setup({});
        const submitButton = findByTestAttribute(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('Submit')
    })
    test('renders submit string in English', () => {
        const wrapper = setup({language: 'emoji'});
        const submitButton = findByTestAttribute(wrapper, 'submit-button');
        expect(submitButton.text()).toBe('🚀');
    })
});

describe('render', () => {
    describe('success is true', () => {
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
            const submitButton = findByTestAttribute(wrapper, 'submit-button');
            expect(submitButton.exists()).toBe(false);
        });
    });

    describe('success is false', () => {
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
            const submitButton = findByTestAttribute(wrapper, 'submit-button');
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
        wrapper = setup({});
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

        const submitButton = findByTestAttribute(wrapper, 'submit-button');
        submitButton.simulate('click', mockEvent);

        expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
    });
});