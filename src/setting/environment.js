const Local = {
    // API: "http://10.209.166.111:5000/api/v1",
    API: 'https://apiyousui.feliciastation.com/api/v1',
    CAPTCHA_KEY: '6LfcUkQgAAAAAOZgwycv6Os6yZ6aTu-_aggp6E4D',
};

const Production = {
    API: 'https://apiyousui.feliciastation.com/api/v1',
    CAPTCHA_KEY: '6LddmUkgAAAAAB_vTeRY2j6G-PwGhu6uGBF75ZV8',
};

export const isProduction =
    window.location.hostname.indexOf('yousui.io') >= 0;
export const isBeta =
    window.location.hostname.indexOf('beta.yousui.io') >= 0;

export const API = isProduction ? Production.API : Local.API;

export const CAPTCHA_KEY = isProduction ? Production.CAPTCHA_KEY : Local.CAPTCHA_KEY;
