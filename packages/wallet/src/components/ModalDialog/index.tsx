'use client';

import React, {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const ModalDialog: React.FC<
  { open: boolean; onClose: () => void } & PropsWithChildren
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
  }, [isLocalOpen, open]);

  const onClose = useCallback(() => {
    ref.current?.close();
    onCloseFunc();
  }, [onCloseFunc, ref]);

  useEffect(() => {
    const refNode = ref.current;
    if (refNode) {
      if (isLocalOpen) {
        if (!refNode.open) {
          refNode.showModal();
        }
      } else {
        refNode.close();
      }

      // Add the event listener when the modal is open
      refNode.addEventListener('close', onClose);

      // Clean-up function to remove the event listener
      return () => {
        refNode.removeEventListener('close', onClose);
      };
    }
  }, [onClose, isLocalOpen]);

  if (!isLocalOpen) return null;
  return (
    <dialog
      role="dialog"
      aria-modal="true"
      className={`top-0 left-0 h-full w-full flex items-center justify-center bg-white opacity-40 backdrop-blur-sm animate-fade-in cursor-auto z-50 ${
        isLocalOpen && !open ? 'animate-fade-out opacity-40' : ''
      }`}
      ref={ref}
    >
      {children}
    </dialog>
  );
};

export default ModalDialog;
