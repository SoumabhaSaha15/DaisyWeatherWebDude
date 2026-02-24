import React, { createContext, useContext, type Context, type ReactNode } from "react";

type ModalContextType = {
  modalRef: React.RefObject<HTMLDialogElement | null>;
  openModal: () => void;
  closeModal: () => void;
};

export type ModalProviderProps = {
  children: ReactNode;
};

export const ModalContext: Context<ModalContextType> = createContext<ModalContextType>({
  modalRef: { current: null },
  openModal: () => { },
  closeModal: () => { },
});
export const useModal = (): ModalContextType => useContext<ModalContextType>(ModalContext);
