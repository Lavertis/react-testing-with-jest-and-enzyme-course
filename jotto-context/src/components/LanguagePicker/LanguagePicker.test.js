import React from 'react';
import {shallow} from 'enzyme';
import LanguagePicker from './LanguagePicker';
import {findByTestAttribute} from "../../../test/testUtils";

const setLanguageMock = jest.fn();

const setup = () => {
    return shallow(<LanguagePicker setLanguage={setLanguageMock}/>)
}

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttribute(wrapper, 'component-language-picker');
    expect(component.exists()).toBeTruthy();
})

test('renders non-zero language icons', () => {
    const wrapper = setup();
    const languageIcons = findByTestAttribute(wrapper, 'language-icon');
    expect(languageIcons.length).toBeGreaterThan(0);
})

test('calls setLanguage prop upon click', () => {
    const wrapper = setup();
    const languageIcons = findByTestAttribute(wrapper, 'language-icon');

    const firstIcon = languageIcons.first();
    firstIcon.simulate('click');

    expect(setLanguageMock).toHaveBeenCalled();
})