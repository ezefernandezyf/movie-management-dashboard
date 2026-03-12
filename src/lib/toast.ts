import toast, { type ToastOptions } from 'react-hot-toast';

export function showSuccess(message: string, options?: ToastOptions) {
  return toast.success(message, options);
}

export function showError(message: string, options?: ToastOptions) {
  return toast.error(message, options);
}

export function showInfo(message: string, options?: ToastOptions) {
  return toast(message, { ...options });
}

export default {
  success: showSuccess,
  error: showError,
  info: showInfo,
};
