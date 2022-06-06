import {mount} from "enzyme";
import App from "./App";
import {findByTestAttribute, storeFactory} from "../../../test/testUtils";
import {Provider} from "react-redux";

// activate global mock to make sure getSecretWord doesn't make a network request
jest.mock('../../actions');

const setup = (initialState = {}) => {
    const store = storeFactory(initialState);
    const wrapper = mount(
        <Provider store={store}>
            <App/>
        </Provider>
    );

    const inputBox = findByTestAttribute(wrapper, 'input-box');
    inputBox.simulate('change', {target: {value: 'train'}});

    const takeGuessButton = findByTestAttribute(wrapper, 'take-guess-button');
    takeGuessButton.simulate('click', {preventDefault: jest.fn()});

    return wrapper;
}

describe('no words guessed', () => {
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

describe('some words guessed', () => {
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

describe('secret word is guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({
            secretWord: 'party',
            success: false,
            guessedWords: [{guessedWord: 'agile', letterMatchCount: 1}]
        });

        const inputBox = findByTestAttribute(wrapper, 'input-box');
        inputBox.simulate('change', {target: {value: 'party'}});

        const takeGuessButton = findByTestAttribute(wrapper, 'take-guess-button');
        takeGuessButton.simulate('click', {preventDefault: jest.fn()});
    });

    test('creates GuessedWords table with 3 rows', () => {
        const guessedWordNodes = findByTestAttribute(wrapper, 'guessed-word');
        expect(guessedWordNodes).toHaveLength(3);
    });

    test('displays congrats component', () => {
        const congratsComponent = findByTestAttribute(wrapper, 'component-congrats');
        expect(congratsComponent.text().length).toBeGreaterThan(0);
    });

    test('does not display input component', () => {
        const inputComponent = findByTestAttribute(wrapper, 'input-component');
        expect(inputComponent.exists()).toBe(false);

        const takeGuessButton = findByTestAttribute(wrapper, 'take-guess-button');
        expect(takeGuessButton.exists()).toBe(false);
    })
});