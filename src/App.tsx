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

      <div className={styles.sliderContainer}>
        <ul className={styles.list}>
          {symbols.map((el, i) => (
            <li className={styles.listItem} key={el}>
              <AppWs symbol={symbols[i]} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
