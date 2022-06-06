import React from 'react';
import {shallow} from 'enzyme';
import EnterWordForm from './EnterWordForm';
import {findByTestAttribute} from "../../../test/testUtils";

const defaultProps = {formAction: jest.fn()};

const setup = (props = {}) => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<EnterWordForm {...setupProps} />);
};

describe("render", () => {
    // the condition for this to render is within the App
    // component, so we don't need to test conditional rendering here
    test("renders without error", () => {
        const wrapper = setup();
        const component = findByTestAttribute(wrapper, "component-enter-word-form");
        expect(component.length).toBe(1);
    });

    test("renders instructions", () => {
        const wrapper = setup();
        const instructions = findByTestAttribute(wrapper, "enter-word-instructions");
        expect(instructions.length).toBe(1);
    });

    test("renders submit button", () => {
        const wrapper = setup();
        const submit = findByTestAttribute(wrapper, "submit-button");
        expect(submit.length).toBe(1);
    });

    test("renders input box", () => {
        const wrapper = setup();
        const input = findByTestAttribute(wrapper, "enter-word-input");
        expect(input.length).toBe(1);
    });
});

describe("submit click action", () => {
    let setUserSecretWordMock;
    let wrapper;
    const userSecretWord = "lunch";

    beforeEach(() => {
        // create a mock function for `setUserSecretWord`
        setUserSecretWordMock = jest.fn();

        // set up Input, with setUserSecretWordMock as a prop
        wrapper = setup({formAction: setUserSecretWordMock});

        // simulate the input
        const mockEvent = {target: {value: userSecretWord}};
        const inputBox = findByTestAttribute(wrapper, "enter-word-input");
        inputBox.simulate("change", mockEvent);

        // simulate click on submit button
        const submit = findByTestAttribute(wrapper, "submit-button");
        submit.simulate("click", {preventDefault: jest.fn()});
    });

    test("\'setUserSecretWord\' was called once", () => {
        const setUserSecretWordCallCount = setUserSecretWordMock.mock.calls.length;
        expect(setUserSecretWordCallCount).toBe(1);
    });

    test("\'setUserSecretWord\' was called with input value as argument", () => {
        const userSecretWordArg = setUserSecretWordMock.mock.calls[0][0];
        expect(userSecretWordArg).toBe(userSecretWord);
    });
});