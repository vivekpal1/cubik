import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const ModalDialog: React.FC<
  { open: boolean; onClose: () => void } & PropsWithChildren<any>
> = ({ open, onClose: onCloseFunc, children }) => {
  const ref = useRef<HTMLDialogElement>(null);

  const [isLocalOpen, setIsLocalOpen] = useState(false);
  useEffect(() => {
    if (!isLocalOpen) setIsLocalOpen(open);

    if (isLocalOpen) {
      setTimeout(() => {
        setIsLocalOpen(open);
      }, 150);
    }
  }, [open]);

  const onClose = useCallback(() => {
    ref.current?.close();
    onCloseFunc();
  }, [onCloseFunc, ref]);

  useEffect(() => {
    if (ref.current) {
      if (isLocalOpen) {
        if (!ref.current.open) {
          ref.current.showModal();
        }
      } else {
        ref.current.close();
      }
    }

    // Make sure when `ESC` (browser default) is clicked, we close the dialog
    if (isLocalOpen) {
      const refNode = ref.current;
      refNode?.addEventListener('close', onClose);
      return () => {
        refNode?.removeEventListener('close', onClose);
      };
    }
  }, [onClose, isLocalOpen]);

  const baseClasses =
    'top-0 left-0 h-full w-full flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm cursor-auto z-50';
  const animationClasses =
    isLocalOpen && !open ? 'animate-fade-out opacity-0' : 'animate-fade-in';

  if (!isLocalOpen) return null;

  return (
    <dialog
      role="dialog"
      aria-modal="true"
      className={`${baseClasses} ${animationClasses}`}
      ref={ref}
    >
      {children}
    </dialog>
  );
};

export default ModalDialog;
