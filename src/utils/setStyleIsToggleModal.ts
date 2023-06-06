import { RefObject } from 'react';

export const setStyleIsToggleModal = (
  modalRef: RefObject<HTMLElement>,
  overflowY: string,
  paddingRight: string,
  isDarkTheme: boolean
) => {
  modalRef.current?.style?.setProperty('overflow-y', overflowY);
  modalRef.current?.style?.setProperty('padding-right', paddingRight);
  modalRef.current?.style?.setProperty('background-color', isDarkTheme ? '#121212' : '#ffffff');
};
