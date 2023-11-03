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
      style={{
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        backdropFilter: 'blur(4px)',
        borderRadius: '8px',
        animation: `${isLocalOpen && !open ? 'fade-out' : 'fade-in'} 3s`,
        cursor: 'auto',
        zIndex: 50,
        overflow: 'hidden',
      }}
      ref={ref}
    >
      {children}
    </dialog>
  );
};

export default ModalDialog;
