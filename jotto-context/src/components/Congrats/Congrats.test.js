import React from 'react';
import {mount} from 'enzyme';
import Congrats from './Congrats';
import {findByTestAttribute} from "../../../test/testUtils";
import languageContext from "../../contexts/language/languageContext";

const setup = ({success = false, language = 'en'}) => {
    return mount(
        <languageContext.Provider value={language}>
            <Congrats success={success}/>
        </languageContext.Provider>
    )
}

describe('languagePicker', () => {
    test('renders congrats string in English', () => {
        const wrapper = setup({success: true});
        expect(wrapper.text()).toBe('Congratulations! You guessed the word!')
    })
    test('renders congrats string in Emoji', () => {
        const wrapper = setup({success: true, language: 'emoji'});
        expect(wrapper.text()).toBe('🎯🎉')
    })
});

test('renders without crashing', () => {
    const wrapper = setup({});
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