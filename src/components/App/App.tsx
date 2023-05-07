import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from 'components/pages/LandingPage/LandingPage';
import Quiz from 'components/pages/Quiz/Quiz';
import './App.scss'
import { Provider } from 'react-redux';
import { store } from 'redux/store';
import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from 'lucide-react';

type Mode = 'light' | 'dark';

function App() {
  const [mode, setMode] = useState<Mode>(localStorage.getItem('currentMode') as Mode || 'light');

  useEffect(() => {
    localStorage.setItem('currentMode', mode);
  }, [mode]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <main className={mode}>
          {mode === 'light'
            ? <SunIcon className="mode-switcher" onClick={() => setMode('dark')} />
            : <MoonIcon className="mode-switcher" onClick={() => setMode('light')} />
          }
          <img className="background-image" alt="" src="/stars.jpg" />
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
