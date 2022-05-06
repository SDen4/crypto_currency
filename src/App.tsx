import React, { useEffect, useState } from 'react';

import AppWs from './components/AppWs';

import { symbols } from './constant/symbols';

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

  return (
    <div className={styles.App} style={{ minHeight: appHeight }}>
      <header className={styles.appHeader}>
        <h1>Crypto currency</h1>
      </header>

      <AppWs symbol={symbols[0]} />
    </div>
  );
}

export default App;
