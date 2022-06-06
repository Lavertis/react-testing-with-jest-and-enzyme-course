import React from 'react';
import {shallow} from 'enzyme';
import SecretWordReveal from './SecretWordReveal';
import {findByTestAttribute} from "../../../test/testUtils";

const secretWord = 'party';
const defaultProps = {display: false, secretWord};

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<SecretWordReveal {...setupProps} />);
};

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttribute(wrapper, 'component-secret-word-reveal');
    expect(component.length).toBe(1);
});

test('renders no text when \'display\' prop is false', () => {
    const wrapper = setup({display: false});
    const component = findByTestAttribute(wrapper, "component-secret-word-reveal");
    expect(component.text()).toBe('');
});

test("renders message containing secret word when `display` prop is true", () => {
    const wrapper = setup({display: true});
    const message = findByTestAttribute(wrapper, "reveal-message");
    expect(message.text()).toContain(secretWord);
});