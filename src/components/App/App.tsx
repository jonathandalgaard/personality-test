import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from 'components/pages/LandingPage/LandingPage';
import Quiz from 'components/pages/Quiz/Quiz';
import './App.scss'
import { Provider } from 'react-redux';
import { store } from 'redux/store.ts';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/quiz"
            element={<Quiz />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
