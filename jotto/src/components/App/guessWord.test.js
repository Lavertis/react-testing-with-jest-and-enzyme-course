import {mount} from "enzyme";
import App from "./App";
import {findByTestAttribute} from "../../../test/testUtils";

const setup = (state = {}) => {
    // TODO: apply the state to the component
    const wrapper = mount(<App/>);

    const inputBox = findByTestAttribute(wrapper, 'input-box');
    inputBox.simulate('change', {target: {value: 'train'}});

    const submitButton = findByTestAttribute(wrapper, 'submit-button');
    submitButton.simulate('click', {preventDefault: jest.fn()});

    return wrapper;
}

describe.skip('no words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: []
        });
    });

    test('creates GuessedWords table with 1 row', () => {
        const guessedWordNodes = findByTestAttribute(wrapper, 'guessed-word');
        expect(guessedWordNodes).toHaveLength(1);
    });
})

describe.skip('some words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: [{guessedWord: 'agile', letterMatchCount: 1}]
        });
    });

    test('creates GuessedWords table with 2 rows', () => {
        const guessedWordNodes = findByTestAttribute(wrapper, 'guessed-word');
        expect(guessedWordNodes).toHaveLength(2);
    });
});

describe.skip('secret word is guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: [{guessedWord: 'agile', letterMatchCount: 1}]
        });

        const inputBox = findByTestAttribute(wrapper, 'input-box');
        inputBox.simulate('change', {target: {value: 'party'}});

        const submitButton = findByTestAttribute(wrapper, 'submit-button');
        submitButton.simulate('click', {preventDefault: jest.fn()});
    });

    test('creates GuessedWords table with 3 rows', () => {
        const guessedWordNodes = findByTestAttribute(wrapper, 'guessed-word');
        expect(guessedWordNodes).toHaveLength(3);
    });

    test('displays congrats component', () => {
        const congratsComponent = findByTestAttribute(wrapper, 'congrats-component');
        expect(congratsComponent.text().length).toBeGreaterThan(0);
    });

    test('does not display input component', () => {
        const inputComponent = findByTestAttribute(wrapper, 'input-component');
        expect(inputComponent.exists()).toBe(false);

        const submitButton = findByTestAttribute(wrapper, 'submit-button');
        expect(submitButton.exists()).toBe(false);
    })
});