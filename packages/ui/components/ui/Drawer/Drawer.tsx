import * as React from 'react';
import * as Dialog from 'vaul';

interface WithFadeFromProps {
  snapPoints: (number | string)[];
  fadeFromIndex: number;
}
interface WithoutFadeFromProps {
  snapPoints?: (number | string)[];
  fadeFromIndex?: never;
}

type DrawerProps = {
  activeSnapPoint?: number | string | null;
  setActiveSnapPoint?: (snapPoint: number | string | null) => void;
  children?: React.ReactNode;
  open?: boolean;
  closeThreshold?: number;
  onOpenChange?: (open: boolean) => void;
  shouldScaleBackground?: boolean;
  scrollLockTimeout?: number;
  fixed?: boolean;
  dismissible?: boolean;
  onDrag?: (
    event: React.PointerEvent<HTMLDivElement>,
    percentageDragged: number,
  ) => void;
  onRelease?: (
    event: React.PointerEvent<HTMLDivElement>,
    open: boolean,
  ) => void;
  modal?: boolean;
  nested?: boolean;
  onClose?: () => void;
} & (WithFadeFromProps | WithoutFadeFromProps);

interface DrawerPortalProps {
  children: React.ReactNode;
}
interface DrawerContentProps {
  children: React.ReactNode;
}
interface DrawerHeaderProps {
  children: React.ReactNode;
}
interface DrawerBodyProps {
  children: React.ReactNode;
}
interface DrawerFooterProps {
  children: React.ReactNode;
}

const Drawer = ({ open, children, onOpenChange, ...props }: DrawerProps) => (
  <Dialog.Drawer.Root open={open} onOpenChange={onOpenChange} {...props}>
    {children}
  </Dialog.Drawer.Root>
);
const DrawerPortal = ({ children }: DrawerPortalProps) => {
  return <Dialog.Drawer.Portal>{children}</Dialog.Drawer.Portal>;
};

const DrawerOverlay = () => (
  <Dialog.Drawer.Overlay className="fixed inset-0 bg-black/60" />
);

const DrawerContent = ({ children }: DrawerContentProps) => (
  <Dialog.Drawer.Content className="fixed rounded-t-lg overflow-hidden z-[100] mt-24 bottom-[-200px] w-screen bg-[var(--color-bg-secondary)] h-full">
    {children}
  </Dialog.Drawer.Content>
);

const DrawerCloseButton = () => (
  <Dialog.Drawer.Close className="drawerCloseButton">X</Dialog.Drawer.Close>
);

const DrawerHeader = ({ children, ...props }: DrawerHeaderProps) => (
  <div className="drawerHeader" {...props}>
    {children}
  </div>
);

const DrawerBody = ({ children, ...props }: DrawerBodyProps) => (
  <div {...props}>{children}</div>
);

const DrawerFooter = ({ children, ...props }: DrawerFooterProps) => (
  <div className="drawerFooter" {...props}>
    {children}
  </div>
);

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
};
