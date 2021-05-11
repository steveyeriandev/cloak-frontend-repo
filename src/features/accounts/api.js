import { baseUrl } from "../api";

const authBase = `${baseUrl}auth/`;

export const loginUrl = `${authBase}login/`;
export const registrationUrl = `${authBase}registration/`;
export const loginGoogleUrl = `${authBase}google/`;
export const verifyUrl = `${authBase}token/verify/`;
export const refreshTokenUrl = `${authBase}token/refresh/`;
export const forgotPasswordUrl = `${authBase}password/reset/`;
export const resetPasswordUrl = `${authBase}password/reset/confirm/`;
export const changePasswordUrl = `${authBase}password/change/`;
export const meUrl = `${authBase}user/`;
