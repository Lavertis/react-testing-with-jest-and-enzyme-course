import {mount} from "enzyme";
import {findByTestAttribute} from "../../../test/testUtils";
import successContext from "../../contexts/success/successContext";
import guessedWordsContext from "../../contexts/guessedWords/guessedWordsContext";
import Congrats from "../Congrats/Congrats";
import Input from "../Input/Input";
import GuessedWords from "../GuessedWords/GuessedWords";

const setup = ({secretWord, guessedWords}) => {
    const wrapper = mount(
        <guessedWordsContext.GuessedWordsProvider>
            <successContext.SuccessProvider>
                <Congrats/>
                <Input secretWord={secretWord}/>
                <GuessedWords/>
            </successContext.SuccessProvider>
        </guessedWordsContext.GuessedWordsProvider>
    );

    const inputBox = findByTestAttribute(wrapper, 'input-box');
    inputBox.simulate('change', {target: {value: 'train'}});

    const submitButton = findByTestAttribute(wrapper, 'submit-button');
    submitButton.simulate('click', {preventDefault: jest.fn()});

    guessedWords.map(guess => {
        const mockEvent = {target: {value: guess.guessedWord}}
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click', {preventDefault: jest.fn()});
    })

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

        const submitButton = findByTestAttribute(wrapper, 'submit-button');
        submitButton.simulate('click', {preventDefault: jest.fn()});
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
        const inputBox = findByTestAttribute(wrapper, 'input-box');
        expect(inputBox.exists()).toBe(false);

        const submitButton = findByTestAttribute(wrapper, 'submit-button');
        expect(submitButton.exists()).toBe(false);
    })
});