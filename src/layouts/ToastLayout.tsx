import { useCallback, useContext, useEffect } from 'react';
import { toast, Toaster } from 'react-hot-toast';

import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { ThemeContext } from '@/context/ThemeProvider';
import { notificationActions } from '@/store/reducers/NotificationSlice';

import { Toast } from '@/components/ui/Toast';

export const ToastLayout = () => {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext);
  const message = useAppSelector((state) => state.notificationReducer.message);

  const handleClose = useCallback(
    (toastId: string) => () => {
      dispatch(notificationActions.deleteNotification());
      toast.dismiss(toastId);
    },
    []
  );

  useEffect(() => {
    if (message) {
      toast.custom(
        (t) => (
          <Toast
            theme={theme}
            message={message}
            onClose={handleClose(t.id)}
            duration={t.duration}
          />
        ),
        {
          position: 'bottom-right',
        }
      );
    }
  }, [message]);

  return <Toaster />;
};
