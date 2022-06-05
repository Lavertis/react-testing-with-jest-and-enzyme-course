import {shallow} from "enzyme";
import App from "./App";
import {findByTestAttribute} from "../../../test/testUtils";

const setup = () => {
    return shallow(<App/>);
}
test('renders without error', async () => {
    const wrapper = setup();
    const appComponent = await findByTestAttribute(wrapper, 'component-app');
    expect(appComponent).toHaveLength(1);
});