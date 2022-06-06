import React from 'react';
import {shallow} from 'enzyme';
import EnterWordButton from './EnterWordButton';
import {findByTestAttribute} from "../../../test/testUtils";

const defaultProps = {display: true};

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<EnterWordButton {...setupProps} />)
}

describe('render', () => {
    test('renders without error', () => {
        const wrapper = setup();
        const component = findByTestAttribute(wrapper, 'component-enter-word-button');
        expect(component.length).toBe(1);
    });

    test('renders no text when \'display\' prop is false', () => {
        const wrapper = setup({display: false});
        const component = findByTestAttribute(wrapper, 'component-enter-word-button');
        expect(component.text()).toBe('');
    });

    test('renders non-empty text when \'display\' prop is true', () => {
        const wrapper = setup({display: true, buttonAction: jest.fn()});
        const component = findByTestAttribute(wrapper, 'component-enter-word-button');
        expect(component.text().length).not.toBe(0);
    });
});

test('calls \'buttonAction\' prop upon button click', () => {
    // create a mock function, so we can see whether it's called on click
    const buttonActionMock = jest.fn();
    const wrapper = setup({display: true, buttonAction: buttonActionMock});

    // find the button (which is the top level element of this component)
    const resetButton = findByTestAttribute(wrapper, 'component-enter-word-button');
    resetButton.simulate('click');

    // expect the mock to have been called once
    expect(buttonActionMock.mock.calls.length).toBe(1);
});