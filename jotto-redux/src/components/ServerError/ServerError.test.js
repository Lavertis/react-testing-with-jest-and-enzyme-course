import React from 'react';
import {shallow} from 'enzyme';
import ServerError from './ServerError';
import {findByTestAttribute} from "../../../test/testUtils";

test('renders without error', () => {
    const wrapper = shallow(<ServerError/>);
    const component = findByTestAttribute(wrapper, 'component-server-error');
    expect(component.length).toBe(1);
});

test('renders non-empty text', () => {
    const wrapper = shallow(<ServerError/>);
    const component = findByTestAttribute(wrapper, 'component-server-error');
    expect(component.text().length).not.toBe(0);
});