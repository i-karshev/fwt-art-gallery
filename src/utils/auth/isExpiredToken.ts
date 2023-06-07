import jwt from 'jwt-decode';

export const isExpiredToken = (token: string | null): boolean => {
  if (!token) {
    return true;
  }

  const currentDate = new Date();
  const decodedToken: { exp: number } = jwt(token);

  return decodedToken.exp * 1000 < currentDate.getTime();
};
