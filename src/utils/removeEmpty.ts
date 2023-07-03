export const removeEmpty = (obj: object) =>
  Object.fromEntries(Object.entries(obj).filter(([_, val]) => val));
