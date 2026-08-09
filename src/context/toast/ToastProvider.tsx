import { cn } from "@/utility/cn";
import { useState, useRef, useEffect, type ReactNode } from "react";
import {
  ToastContext,
  ToastOptionsValidator,
  type ToastOptionsType,
  type ToastVariantType,
  type ToastPositionTuple,
} from "@/context/toast/ToastContext";

interface Toast {
  id: string;
  content: string;
  options: ToastOptionsType;
}

function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Map<string, number>>(new Map());

  const close = (id: string) => {
    const timer = timeoutsRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timeoutsRef.current.delete(id);
    }
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const openGlobal = (
    content: string,
    variant: ToastVariantType,
    autoClose: boolean,
    timeout: number,
    position: ToastPositionTuple,
  ): string => {
    const toastOptions = {
      toastPosition: position,
      toastVariant: variant,
    };

    const validated = ToastOptionsValidator.safeParse(toastOptions);
    const options = validated.success
      ? validated.data
      : {
        toastPosition: ["toast-start", "toast-middle"] as ToastPositionTuple,
        toastVariant: "alert-info" as ToastVariantType,
      };

    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, content, options }]);

    if (autoClose) {
      const timer = window.setTimeout(() => close(id), timeout);
      timeoutsRef.current.set(id, timer);
    }
    return id;
  };

  useEffect(() => () => timeoutsRef.current.forEach(clearTimeout), []);

  const groupedToasts = toasts.reduce(
    (acc, toast) => {
      const posKey = `${toast.options.toastPosition[1]} ${toast.options.toastPosition[0]}`;
      if (!acc[posKey]) acc[posKey] = [];
      acc[posKey].push(toast);
      return acc;
    },
    {} as Record<string, Toast[]>,
  );

  return (
    <ToastContext.Provider value={{ openGlobal, close }}>
      {children}
      {Object.entries(groupedToasts).map(([positionClasses, toastList]) => (
        <div key={positionClasses} className={cn("toast", positionClasses)}>
          {toastList.map(({ id, content, options }) => (
            <div key={id} className={cn("alert", options.toastVariant)}>
              {content}
            </div>
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
}

export default ToastProvider;