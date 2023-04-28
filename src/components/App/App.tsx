import React from 'react';
import cn from 'classnames/bind';

import { Header } from '../Header';
import { Footer } from '../Footer';
import { Gallery } from '../Gallery';

import styles from './App.module.scss';

const cx = cn.bind(styles);

export const App = () => (
  <div className={cx('app-wrapper')}>
    <Header />
    <Gallery artists={[]} />
    <Footer />
  </div>
);
