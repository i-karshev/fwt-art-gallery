import { Outlet } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';
import { useAutoScrollToTop } from '@/hooks/useAutoScrollToTop';
import { ToastLayout } from '@/layouts';

export const MainLayout = () => {
  useAutoScrollToTop();

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ScrollToTop />
      <ToastLayout />
    </>
  );
};
