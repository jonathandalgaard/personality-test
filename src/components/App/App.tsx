import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from 'components/pages/LandingPage/LandingPage';
import Quiz from 'components/pages/Quiz/Quiz';
import './App.scss'
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  return (
    <Provider store={store}>
      <BrowserRouter>
        <main className={mode}>
          {mode === 'light'
            ? <SunIcon className="mode-switcher" onClick={() => setMode('dark')} />
            : <MoonIcon className="mode-switcher" onClick={() => setMode('light')} />
          }
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/quiz/:quizId"
              element={<Quiz />}
            />
          </Routes>
        </main>
      </BrowserRouter>
    </Provider>
  )
}

export default App
