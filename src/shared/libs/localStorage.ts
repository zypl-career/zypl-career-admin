export const getAccessToken = () => {
  return localStorage.getItem('token');
};

export const setAccessToken = (token: string) => {
  return localStorage.setItem('token', token);
};

export const setExpiresToken = (token: number) => {
  const expiration = new Date();
  expiration.setSeconds(expiration.getSeconds() + token);

  return localStorage.setItem('tokenExpires', expiration.toISOString());
};

export const removeAccessToken = () => {
  return localStorage.removeItem('token');
};
