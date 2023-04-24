import React from 'react';

import styles from './App.module.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { Gallery } from '../Gallery';

export const App = () => (
  <div className={styles.AppWrapper}>
    <div className={styles.AppContainer}>
      <Header />
      <Gallery />
      <Footer />
    </div>
  </div>
);
