import React from 'react';
import {shallow} from 'enzyme';
import Congrats from './Congrats';
import {findByTestAttribute} from "../../../test/testUtils";

const defaultProps = {success: false};

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<Congrats {...setupProps} />);
}

test('renders without crashing', async () => {
    const wrapper = setup();
    const component = await findByTestAttribute(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
});

test('renders no text when `successReducer` prop is false', async () => {
    const wrapper = setup({success: false});
    const component = await findByTestAttribute(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
});

test('renders non-empty congrats message when `successReducer` prop is true', async () => {
    const wrapper = setup({success: true});
    const message = await findByTestAttribute(wrapper, 'congrats-message');
    expect(message.text().length).not.toBe(0);
});