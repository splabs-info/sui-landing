import CryptoJS from 'crypto-js';

export const ACCESS_TOKEN_KEY = 'CBt3gpbqeMdWPNG1';
export const SCOPES_KEY = 'AhBcmvr1EkMdPnL5';

export const isLoggedIn = () => {
    return localStorage.getItem(ACCESS_TOKEN_KEY) != null;
};

export const logoutReturnTo = () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(SCOPES_KEY);
    localStorage.removeItem('wallet');
    window.location.reload();
};

export const logout = () => {
    localStorage.removeItem('wallet');
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(SCOPES_KEY);
    // window.location.reload();
};

export const setAccessToken = (accessToken) => {
    localStorage.setItem(ACCESS_TOKEN_KEY, Encrypt(accessToken, ACCESS_TOKEN_KEY));
};

export const getAccessToken = () => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!accessToken) return null;
    return Decrypt(accessToken, ACCESS_TOKEN_KEY);
    // return window.localStorage.getItem("MEGA_ACCESS_TOKEN");
};

export const setScopes = (scopes) => {
    localStorage.setItem(SCOPES_KEY, Encrypt(JSON.stringify(scopes), SCOPES_KEY));
};

export const checkScope = (scope) => {
    const scopesData = localStorage.getItem(SCOPES_KEY);
    if (!scopesData) return null;
    var scopes = JSON.parse(Decrypt(scopesData, SCOPES_KEY));
    return scopes.indexOf(scope) >= 0;
};

export const Encrypt = (message, privateKey) => CryptoJS.AES.encrypt(message, privateKey).toString();

export const Decrypt = (ciphertext, privateKey) => {
    var bytes = CryptoJS.AES.decrypt(ciphertext, privateKey);
    return bytes.toString(CryptoJS.enc.Utf8);
};
