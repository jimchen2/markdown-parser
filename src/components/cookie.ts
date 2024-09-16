// utils/cookie.ts
import Cookies from 'js-cookie';

export const setCookie = (key: string) => {
  Cookies.set('authKey', key, { expires: 100 }); 
};

