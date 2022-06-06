import {mount} from "enzyme";
import App from "./App";
import {findByTestAttribute} from "../../../test/testUtils";
import {getSecretWord as getSecretWordMock} from "../../actions";

// activate global mock to make sure getSecretWord doesn't make a network request
jest.mock('../../actions');


const setup = () => {
    return mount(<App/>);
}
test('renders without error', () => {
    const wrapper = setup();
    const appComponent = findByTestAttribute(wrapper, 'component-app');
    expect(appComponent).toHaveLength(1);
});

describe('getSecretWord', () => {
    beforeEach(() => {
        // clear the mock calls from previous tests
        getSecretWordMock.mockClear();
    });

    test('calls getSecretWord action on app mount', () => {
        const wrapper = setup();
        expect(getSecretWordMock).toHaveBeenCalledTimes(1);
    });

    test('does not call getSecretWord action on app update', () => {
        const wrapper = setup();
        getSecretWordMock.mockClear();

        // using setProps, because wrapper.update() doesn't trigger useEffect
        wrapper.setProps();

        expect(getSecretWordMock).not.toHaveBeenCalled();
    });
});