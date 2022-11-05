import React, { Suspense, useEffect, useState } from 'react';

import { Slider } from './components/Slider/Slider';
import { stat } from './utils/stat';

import styles from './App.module.css';

const LazyInitHint = React.lazy(() => import('./components/InitHint/InitHint'));

function App() {
  const [appHeight, setAppHeight] = useState<number>(0);

  useEffect(() => {
    // statistic (test)
    stat();

    setAppHeight(window.innerHeight);
  }, []);

  // resize
  window.addEventListener(
    'resize',
    () => setAppHeight(window.innerHeight),
    true,
  );

  // show initHint
  let [showHint, setShowHint] = useState<boolean>(false);
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
    <div className={styles.App} style={{ minHeight: appHeight }}>
      <header className={styles.appHeader}>
        <h1>Crypto Currency</h1>
      </header>

      <Slider />

      {showHint && (
        <div className={styles.initHintWrapper}>
          <Suspense fallback={<p>Loading...</p>}>
            <LazyInitHint />
          </Suspense>
        </div>
      )}
    </div>
  );
}

export default App;
