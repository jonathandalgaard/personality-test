import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { store } from 'redux/store.ts';
import { BrowserRouter } from 'react-router-dom';
import LandingPage from 'components/pages/LandingPage/LandingPage';

jest.mock('redux/store', () => ({
  __esModule: true,
  store: {
    getState: () => null,
    subscribe: () => null,
    dispatch: () => null,
  },
}));

jest.mock('redux/api', () => ({
  __esModule: true,
  default: () => null,
  useGetQuizzesQuery: () => ({
    data: [
      { id: 1, title: 'First quiz' },
      { id: 2, title: 'Second quiz' },
    ],
  }),
}));

test('Renders App correctly', () => {
  const component = renderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <LandingPage />
      </BrowserRouter>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
