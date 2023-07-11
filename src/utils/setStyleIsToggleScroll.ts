export const setStyleIsToggleScroll = (
  body: HTMLElement,
  overflowY: string,
  paddingRight: string,
  theme: string
) => {
  body?.style?.setProperty('overflow-y', overflowY);
  body?.style?.setProperty('padding-right', paddingRight);
  body?.style?.setProperty('background-color', theme === 'dark' ? '#121212' : '#ffffff');
};
