import { lazy, Suspense, useEffect, useState } from 'react';

import { Slider } from './components/Slider/Slider';

import cl from './App.module.css';

const LazyInitHint = lazy(() => import('./components/InitHint/InitHint'));

function App() {
  const [appHeight, setAppHeight] = useState(0);

  useEffect(() => setAppHeight(window.innerHeight), []);

  // resize
  window.addEventListener(
    'resize',
    () => setAppHeight(window.innerHeight),
    true,
  );

  // show initHint
  let [showHint, setShowHint] = useState(false);
  useEffect(() => {
    if (window.innerWidth < 490) {
      setShowHint(true);
    }
    const timer = setTimeout(() => {
      setShowHint(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
  window.addEventListener('touchstart', () => setShowHint(false));

  return (
    <div className={cl.app} style={{ minHeight: appHeight }}>
      <header className={cl.appHeader}>
        <h1>Crypto Currency</h1>
      </header>

      <Slider />

      {showHint && (
        <div className={cl.initHintWrapper}>
          <Suspense fallback={<p>Loading...</p>}>
            <LazyInitHint />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default App;
