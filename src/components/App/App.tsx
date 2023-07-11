import React, { useContext } from 'react';
import cn from 'classnames/bind';
import { Route, Routes, useLocation } from 'react-router-dom';

import { ThemeContext } from '@/context/ThemeProvider';
import { MainLayout } from '@/layouts';
import { MainPage } from '@/pages/MainPage';
import { ArtistPage } from '@/pages/ArtistPage/ArtistPage';
import { RegisterModal } from '@/components/RegisterModal';
import { LoginModal } from '@/components/LoginModal';

import styles from './App.module.scss';

const cx = cn.bind(styles);

export const App = () => {
  const { theme } = useContext(ThemeContext);

  const location = useLocation();
  const state = location.state as { background?: Location };

  return (
    <div className={cx('app-wrapper', `app-wrapper_${theme}`)}>
      <Routes location={state?.background || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="/artists/:id" element={<ArtistPage />} />
          <Route path="/login" element={<LoginModal theme={theme} />} />
          <Route path="/register" element={<RegisterModal theme={theme} />} />
          <Route path="*" element={<p>Not Found</p>} />
        </Route>
      </Routes>

      {state?.background && (
        <Routes>
          <Route path="/login" element={<LoginModal theme={theme} />} />
          <Route path="/register" element={<RegisterModal theme={theme} />} />
        </Routes>
      )}
    </div>
  );
};
