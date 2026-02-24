import { createContext, useContext, type Context } from "react";
import { z } from 'zod';

export const ToastOptionsValidator = z.strictObject({
  toastVariant: z.enum(['alert-info', 'alert-success', 'alert-warning', 'alert-error']),
  toastPosition: z.tuple([
    z.enum(['', 'toast-start', 'toast-end', 'toast-center']),
    z.enum(['', 'toast-top', 'toast-bottom', 'toast-middle'])
  ]).refine(
    v => (v[0] === "") ? (v[1] === v[0]) : true, {
    message: "Both toast position should be empty or defined."
  })
});

export type ToastOptionsType = z.infer<typeof ToastOptionsValidator>;
type ToastContextProps = {
  /**
   * @param component string message to be displayed in the toast
   * @param autoClose? boolean if true, the toast will close automatically after the timeout
   * @param timeout? number the time in ms after which the toast will close default is 1000ms
   * @param toastOptions ToastOptionsType the options for the toast customization alert-info is the default variant
   * @returns string
   */
  open: (component: string, autoClose?: boolean, timeout?: number, toastOptions?: ToastOptionsType) => string;
  close: (id: string) => void;
};
export const ToastContext: Context<ToastContextProps> = createContext<ToastContextProps>({
  open: (
    component: string,
    autoClose: boolean = true,
    timeout: number = 1000,
    toastOptions: ToastOptionsType = {
      toastPosition: ["", ""],
      toastVariant: "alert-info"
    }
  ) => {
    console.log(component, timeout, toastOptions, autoClose);
    return '';
  },
  close: (id: string) => { console.log(id); },
});
export const useToast = () => useContext(ToastContext);

export const DefaultToastPosition: ToastOptionsType['toastPosition'] = ['toast-start', 'toast-bottom'];
type DefaultoptionsType = Record<("error" | "success" | "info" | "warning"), ToastOptionsType>
export const DefaultOptions: DefaultoptionsType = {
  error: { toastPosition: DefaultToastPosition, toastVariant: 'alert-error' },
  success: { toastPosition: DefaultToastPosition, toastVariant: 'alert-success' },
  info: { toastPosition: DefaultToastPosition, toastVariant: 'alert-info' },
  warning: { toastPosition: DefaultToastPosition, toastVariant: 'alert-warning' }
};