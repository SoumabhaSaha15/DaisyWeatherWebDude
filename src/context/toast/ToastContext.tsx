import { z } from "zod";
import { createContext, useContext, type Context } from "react";

export const ToastOptionsValidator = z.strictObject({
  toastVariant: z.enum([
    "alert-info",
    "alert-success",
    "alert-warning",
    "alert-error",
  ]),
  toastPosition: z
    .tuple([
      z.enum(["", "toast-start", "toast-end", "toast-center"]),
      z.enum(["", "toast-top", "toast-bottom", "toast-middle"]),
    ])
    .refine(
      (v) => (v[0] === "" && v[1] === "") || (v[0] !== "" && v[1] !== ""),
      {
        message: "Both position values must be empty or both must be defined.",
      },
    ),
});

export type ToastOptionsType = z.infer<typeof ToastOptionsValidator>;
export type ToastVariantType = ToastOptionsType["toastVariant"];
export type ToastPositionTuple = ToastOptionsType["toastPosition"];

export type ToastPositionParam = {
  vertical?: "toast-top" | "toast-middle" | "toast-bottom" | "";
  horizontal?: "toast-start" | "toast-end" | "toast-center" | "";
};

export type ToastContextProps = {
  openGlobal: (
    content: string,
    variant: ToastVariantType,
    autoClose: boolean,
    timeout: number,
    position: ToastPositionTuple,
  ) => string;
  close: (id: string) => void;
};

export const ToastContext: Context<ToastContextProps> =
  createContext<ToastContextProps>({
    openGlobal: () => {
      console.warn("ToastContext.openGlobal called outside of ToastProvider");
      return "";
    },
    close: () => {
      console.warn("ToastContext.close called outside of ToastProvider");
    },
  });

export const useToast = (
  config: ToastPositionParam = {
    vertical: "toast-bottom",
    horizontal: "toast-end",
  },
) => {
  const context = useContext(ToastContext);

  const vertical = (config.vertical ?? "toast-bottom") as ToastPositionTuple[1];
  const horizontal = (config.horizontal ??
    "toast-end") as ToastPositionTuple[0];

  const open = (
    content: string,
    variant: ToastVariantType = "alert-info",
    autoClose = true,
    timeout = 3000,
  ): string => {
    return context.openGlobal(content, variant, autoClose, timeout, [
      horizontal,
      vertical,
    ]);
  };

  return { open, close: context.close };
};