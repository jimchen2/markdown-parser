// utils/cookie.ts
import Cookies from 'js-cookie';

export const setLocalStorage = (key: string) => {
  localStorage.setItem('authKey', key);
};
