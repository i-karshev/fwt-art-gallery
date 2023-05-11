import React, { useContext } from 'react';
import cn from 'classnames/bind';
import { Route, Routes } from 'react-router-dom';

import { ThemeContext } from '@/context/ThemeProvider';
import { MainLayout } from '@/layouts';
import { MainPage } from '@/pages/MainPage';
import { ArtistPage } from '@/pages/ArtistPage/ArtistPage';
import styles from './App.module.scss';

const cx = cn.bind(styles);

export const App = () => {
  const { isDarkTheme } = useContext(ThemeContext);

  return (
    <div className={cx('app-wrapper', { 'app-wrapper_dark': isDarkTheme })}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/artists/:id" element={<ArtistPage />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Route>
      </Routes>
    </div>
  );
};
