import React from 'react';
import cn from 'classnames/bind';
import { Route, Routes } from 'react-router-dom';

import { MainLayout } from '@/layouts';
import { MainPage } from '@/pages/MainPage';
import { ArtistPage } from '@/pages/ArtistPage/ArtistPage';
import styles from './App.module.scss';

const cx = cn.bind(styles);

export const App = () => (
  <div className={cx('app-wrapper')}>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<MainPage />} />
        <Route path="/artists/:id" element={<ArtistPage />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Route>
    </Routes>
  </div>
);
