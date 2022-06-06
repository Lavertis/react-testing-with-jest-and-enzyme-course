import React from 'react';
import {shallow} from 'enzyme';
import NewWordButton from './NewWordButton';
import {findByTestAttribute} from "../../../test/testUtils";

const defaultProps = {display: false, resetAction: jest.fn()};

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<NewWordButton {...setupProps} />);
}

describe('render', () => {
    test('renders without error', () => {
        const wrapper = setup();
        const component = findByTestAttribute(wrapper, 'component-new-word-button');
        expect(component).toHaveLength(1);
    })

    test('renders no text when \'display\' prop is false', () => {
        const wrapper = setup({display: false});
        const component = findByTestAttribute(wrapper, 'component-new-word-button');
        expect(component.text()).toBe('');
    })

    test('renders non-empty text when \'display\' prop is true', () => {
        const wrapper = setup({display: true});
        const component = findByTestAttribute(wrapper, 'component-new-word-button');
        expect(component.text().length).toBeGreaterThan(0);
    })
});

test('calls \'resetAction\' prop on button click', () => {
    const resetActionMock = jest.fn();
    const wrapper = setup({display: true, resetAction: resetActionMock});
    const newWordButton = findByTestAttribute(wrapper, 'component-new-word-button');
    newWordButton.simulate('click');
    expect(resetActionMock).toHaveBeenCalled();
})