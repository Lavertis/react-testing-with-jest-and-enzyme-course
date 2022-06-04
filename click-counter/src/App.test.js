import React from "react";
import App from './App';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@cfaester/enzyme-adapter-react-18'

Enzyme.configure({adapter: new EnzymeAdapter()});

const setup = () => shallow(<App/>);

const findByTestAttribute = (wrapper, value) => wrapper.find(`[data-test='${value}']`);

test('renders without error', async () => {
    const wrapper = setup();
    const appComponent = await findByTestAttribute(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
});

describe('counter display', () => {
    test('renders counter display', async () => {
        const wrapper = setup();
        const counterDisplay = await findByTestAttribute(wrapper, 'counter-display');
        expect(counterDisplay.length).toBe(1);
    });

    test('counter display starts at 0', async () => {
        const wrapper = setup();
        const count = (await findByTestAttribute(wrapper, 'count')).text();
        expect(count).toBe('0');
    });
});

describe('increment', () => {
    test('renders increment button', async () => {
        const wrapper = setup();
        const incrementButton = await findByTestAttribute(wrapper, 'increment-button');
        expect(incrementButton.length).toBe(1);
    })

    test('clicking increment button increments counter display', async () => {
        const wrapper = setup();

        const incrementButton = await findByTestAttribute(wrapper, 'increment-button');
        incrementButton.simulate('click');

        const count = (await findByTestAttribute(wrapper, 'count')).text();
        expect(count).toBe('1');
    });
});

describe('decrement', () => {
    test('renders decrement button', async () => {
        const wrapper = setup();
        const decrementButton = await findByTestAttribute(wrapper, 'decrement-button');
        expect(decrementButton.length).toBe(1);
    });

    test('clicking decrement button decrements counter display', async () => {
        const wrapper = setup();

        const incrementButton = await findByTestAttribute(wrapper, 'increment-button');
        incrementButton.simulate('click');

        const decrementButton = await findByTestAttribute(wrapper, 'decrement-button');
        decrementButton.simulate('click');

        const count = (await findByTestAttribute(wrapper, 'count')).text();
        expect(count).toBe('0');
    });
});

describe('error when decrementing below 0', () => {
    test('error does not show when counter is not below 0', async () => {
        const wrapper = setup();
        const errorElement = await findByTestAttribute(wrapper, 'error-message');
        expect(errorElement.length).toBe(0);
    });

    describe('counter is 0 and decrement button is clicked', () => {
        let wrapper;
        beforeEach(async () => {
            wrapper = setup();
            const decrementButton = await findByTestAttribute(wrapper, 'decrement-button');
            decrementButton.simulate('click');
        });

        test('shows error', async () => {
            const errorElement = await findByTestAttribute(wrapper, 'error-message');
            expect(errorElement.length).toBe(1);
        });

        test('counter still displays 0', async () => {
            const count = (await findByTestAttribute(wrapper, 'count')).text();
            expect(count).toBe('0');
        });

        test('clicking increment clears the error message', async () => {
            const incrementButton = await findByTestAttribute(wrapper, 'increment-button');
            incrementButton.simulate('click');

            const errorElement = await findByTestAttribute(wrapper, 'error-message');
            expect(errorElement.length).toBe(0);
        });
    });
});