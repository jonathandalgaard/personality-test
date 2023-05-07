import renderer from 'react-test-renderer';
import Quiz from 'components/pages/Quiz/Quiz';
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { BrowserRouter } from 'react-router-dom';

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
  useGetQuestionsQuery: () => ({
    data: [
      {
        id: 1,
        title: 'First question',
        options: [
          {
            id: 1,
            title: 'First option',
            score: 1,
          },
          {
            id: 2,
            title: 'Second option',
            score: 4,
          }
        ],
      },
      {
        id: 2,
        title: 'Second question',
        options: [],
      },
    ],
  }),
}));

test('Renders Quiz correctly', () => {
  const component = renderer.create(
    <Provider store={store}>
      <BrowserRouter>
        <Quiz />
      </BrowserRouter>
    </Provider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
