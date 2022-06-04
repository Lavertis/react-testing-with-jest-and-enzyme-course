import App from './App';
import Enzyme, {shallow} from 'enzyme';
import EnzymeAdapter from '@cfaester/enzyme-adapter-react-18'

Enzyme.configure({adapter: new EnzymeAdapter()});

test('renders non-empty component without crashing', () => {
  const wrapper = shallow(<App/>);
  expect(wrapper.exists()).toBe(true);
});
