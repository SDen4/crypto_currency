import React, { useEffect, useState } from 'react';

import Slider from './components/Slider';
import InitHint from './components/InitHint';

import styles from './App.module.css';

function App() {
  const [appHeight, setAppHeight] = useState<number>(0);
  useEffect(() => setAppHeight(window.innerHeight), []);

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
    setTimeout(() => {
      setShowHint(false);
    }, 3000);
  }, []);
  window.addEventListener('touchstart', () => setShowHint(false));

  return (
    <div className={styles.App} style={{ minHeight: appHeight }}>
      <header className={styles.appHeader}>
        <h1>Crypto currency</h1>
      </header>

      <Slider />

      {showHint && (
        <div className={styles.initHintWrapper}>
          <InitHint />
        </div>
      )}
    </div>
  );
}

export default App;
