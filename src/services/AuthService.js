import  api  from "./api";
import Cookie from 'js-cookie';

export const getLogin = async (data) => {
  return await api.post(`/auth/login/`, data);
};

export const onLogout = async () => {
  const refreshToken = Cookie.get('refreshToken');
  if (refreshToken) {
    return await api.post(`/auth/logout/`, { refresh: refreshToken });
  }
  return Promise.resolve();
};

export async function apiSignUp(data) {
  return await api.post(`/auth/sign-up/`, data);
}

export async function apiSignOut() {
  const refreshToken = Cookie.get('refreshToken');
  if (refreshToken) {
    return await api.post(`/auth/sign-out/`, { refresh: refreshToken });
  }
  return Promise.resolve();
}

export async function apiForgotPassword(data) {
  return await api.post(`/auth/forgot-password/`, data);
}

export async function apiResetPassword(data) {
  return await api.post(`/auth/reset-password/`, data);
}
