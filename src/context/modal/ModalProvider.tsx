import { type FC, useRef, useCallback, useMemo } from "react";
import { type ModalProviderProps, ModalContext } from "@/context/modal/ModalContext";

const ModalProvider: FC<ModalProviderProps> = ({ children }) => {

  const modalRef = useRef<HTMLDialogElement>(null);

  // 1. Use useCallback to keep these functions stable across renders
  const openModal = useCallback((): void => {
    modalRef.current && modalRef.current.showModal();
  }, []);

  const closeModal = useCallback((): void => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  }, []);

  // 2. Wrap the value in useMemo to prevent unnecessary re-renders in consumers
  const value = useMemo(
    () => ({ modalRef, openModal, closeModal }),
    [openModal, closeModal]
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
