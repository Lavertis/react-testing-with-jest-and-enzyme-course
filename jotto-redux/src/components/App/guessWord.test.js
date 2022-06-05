import {mount} from "enzyme";
import App from "./App";
import {findByTestAttribute} from "../../../test/testUtils";

const setup = async () => {
    // TODO: apply the state to the component
    const wrapper = mount(<App/>);

    const inputBox = await findByTestAttribute(wrapper, 'input-box');
    inputBox.simulate('change', {target: {value: 'train'}});

    const submitButton = await findByTestAttribute(wrapper, 'submit-button');
    submitButton.simulate('click', {preventDefault: jest.fn()});

    return wrapper;
}

describe.skip('no words guessed', () => {
    let wrapper;
    beforeEach(async () => {
        wrapper = await setup({
            secretWord: 'party',
            success: false,
            guessedWords: []
        });
    });

    test('creates GuessedWords table with 1 row', async () => {
        const guessedWordNodes = await findByTestAttribute(wrapper, 'guessed-word');
        expect(guessedWordNodes).toHaveLength(1);
    });
})

describe.skip('some words guessed', () => {
    let wrapper;
    beforeEach(async () => {
        wrapper = await setup({
            secretWord: 'party',
            success: false,
            guessedWords: [{guessedWord: 'agile', letterMatchCount: 1}]
        });
    });

    test('creates GuessedWords table with 2 rows', async () => {
        const guessedWordNodes = await findByTestAttribute(wrapper, 'guessed-word');
        expect(guessedWordNodes).toHaveLength(2);
    });
});

describe.skip('secret word is guessed', () => {
    let wrapper;
    beforeEach(async () => {
        wrapper = await setup({
            secretWord: 'party',
            success: false,
            guessedWords: [{guessedWord: 'agile', letterMatchCount: 1}]
        });

        const inputBox = await findByTestAttribute(wrapper, 'input-box');
        inputBox.simulate('change', {target: {value: 'party'}});

        const submitButton = await findByTestAttribute(wrapper, 'submit-button');
        submitButton.simulate('click', {preventDefault: jest.fn()});
    });

    test('creates GuessedWords table with 3 rows', async () => {
        const guessedWordNodes = await findByTestAttribute(wrapper, 'guessed-word');
        expect(guessedWordNodes).toHaveLength(3);
    });

    test('displays congrats component', async () => {
        const congratsComponent = await findByTestAttribute(wrapper, 'congrats-component');
        expect(congratsComponent.text()).toBeGreaterThan(0);
    });

    test('does not display input component', async () => {
        const inputComponent = await findByTestAttribute(wrapper, 'input-component');
        expect(inputComponent.exists()).toBe(false);

        const submitButton = await findByTestAttribute(wrapper, 'submit-button');
        expect(submitButton.exists()).toBe(false);
    })
});