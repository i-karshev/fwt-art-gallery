export const setStyleIsToggleModal = (
  body: HTMLElement,
  overflowY: string,
  paddingRight: string,
  isDarkTheme: boolean
) => {
  body?.style?.setProperty('overflow-y', overflowY);
  body?.style?.setProperty('padding-right', paddingRight);
  body?.style?.setProperty('background-color', isDarkTheme ? '#121212' : '#ffffff');
};
