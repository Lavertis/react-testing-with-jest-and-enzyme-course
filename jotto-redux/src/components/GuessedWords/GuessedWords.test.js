import React from 'react';
import {shallow} from 'enzyme';
import GuessedWords from './GuessedWords';
import {findByTestAttribute} from "../../../test/testUtils";

const defaultProps = {
    guessedWords: [{guessedWord: 'train', letterMatchCount: 3}]
}

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<GuessedWords {...setupProps}/>);
}

describe('no words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({guessedWords: []});
    });

    test('renders without error', () => {
        const component = findByTestAttribute(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders instructions to guess a word', () => {
        const instructions = findByTestAttribute(wrapper, 'guess-instructions');
        expect(instructions.text().length).not.toBe(0);
    });
});

describe('some words guessed', () => {
    let wrapper;
    const guessedWords = [
        {guessedWord: 'train', letterMatchCount: 3},
        {guessedWord: 'agile', letterMatchCount: 1},
        {guessedWord: 'party', letterMatchCount: 5}
    ];

    beforeEach(() => {
        wrapper = setup({guessedWords});
    });

    test('renders without error', () => {
        const component = findByTestAttribute(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders guessed words section', () => {
        const guessedWordsElement = findByTestAttribute(wrapper, 'guessed-words');
        expect(guessedWordsElement.length).toBe(1);
    });

    test('correct number of guessed words', () => {
        const guessedWordElements = findByTestAttribute(wrapper, 'guessed-word');
        expect(guessedWordElements.length).toBe(guessedWords.length);
    });

    test('displays index for each guessed word', () => {
        const guessedWordIndexes = findByTestAttribute(wrapper, 'guessed-word-index');
        const indexes = [guessedWordIndexes.map(wrapper => wrapper.text())]
        const expectedIndexes = [guessedWords.map((word, index) => (index + 1).toString())];
        expect(indexes).toEqual(expectedIndexes);
    })
});