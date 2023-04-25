import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@/src/components/Header';
import { Footer } from '@/src/components/Footer';

export const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);
