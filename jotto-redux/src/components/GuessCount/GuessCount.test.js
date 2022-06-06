import React from 'react';
import {shallow} from 'enzyme';
import GuessCount from './GuessCount';
import {findByTestAttribute} from "../../../test/testUtils";

const defaultProps = {guessCount: 0};

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<GuessCount {...setupProps}/>)
}

describe('no words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup();
    })

    test('renders without error', () => {
        const component = findByTestAttribute(wrapper, 'component-guess-count');
        expect(component).toHaveLength(1);
    });

    test('does not display guess count', () => {
        const guessCount = findByTestAttribute(wrapper, 'guess-count');
        expect(guessCount).toHaveLength(0);
    });
});

describe('some words guessed', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = setup({guessCount: 3});
    })

    test('renders without error', () => {
        const component = findByTestAttribute(wrapper, 'component-guess-count');
        expect(component).toHaveLength(1);
    });

    test('displays correct guess count', () => {
        const guessCount = findByTestAttribute(wrapper, 'guess-count');
        expect(guessCount.text()).toBe('3');
    });
});