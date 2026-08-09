import ToastProvider from "@/context/toast/ToastProvider";
import ThemeProvider from "@/context/theme/ThemeProvider";
import ModalProvider from "@/context/modal/ModalProvider";
import type { ReactNode } from "react";

export default ({ children }: { children: ReactNode }) => {
  return (
    <ToastProvider>
      <ThemeProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}