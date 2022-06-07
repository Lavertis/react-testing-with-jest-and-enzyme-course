import React from 'react';
import {shallow} from 'enzyme';
import Congrats from './Congrats';
import {findByTestAttribute} from "../../../test/testUtils";

const defaultProps = {success: false};

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<Congrats {...setupProps} />);
}

test('renders without crashing', () => {
    const wrapper = setup();
    const component = findByTestAttribute(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
});

test('renders no text when `success` prop is false', () => {
    const wrapper = setup({success: false});
    const component = findByTestAttribute(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
});

test('renders non-empty congrats message when `success` prop is true', () => {
    const wrapper = setup({success: true});
    const message = findByTestAttribute(wrapper, 'congrats-message');
    expect(message.text().length).not.toBe(0);
});