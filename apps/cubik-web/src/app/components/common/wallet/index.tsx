"use client";
import { useClipboard, Center, HStack, Text, useToast } from "@/utils/chakra";
import type { FC, SetStateAction } from "react";
import { useEffect } from "react";
import { SuccessToast } from "../../toasts/Toasts";
//import { TbCopy } from "react-icons/tb";

type PropsType = {
  size?: string;
  color?: string;
  copy?: boolean;
  walletAddress: string;
  children?: React.ReactNode;
};

export const WalletAddress: FC<PropsType> = ({
  size,
  color,
  walletAddress,
  children,
}: PropsType) => {
  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  const addr = walletAddress;
  const toast = useToast();
  useEffect(() => {
    if (addr) {
      setValue(addr as SetStateAction<string>);
    }
  }, [addr, hasCopied, setValue, value]);

  if (!addr) return <></>;

  let first = addr.slice(0, 4);
  let last = addr.slice(addr.length - 4, addr.length);
  let truncatedAddr = first + "..." + last;
  const fillColor = color ? color : "#A6A6A6";

  const propsSize = size ? size : "md";
  let logoSize = { base: 3, md: 3 };

  switch (propsSize) {
    case "xs":
      logoSize = { base: 3, md: 3 };
      break;
    case "sm":
      logoSize = { base: 3, md: 4 };
      break;
    case "md":
      logoSize = { base: 4, md: 6 };
      break;
    case "lg":
      logoSize = { base: 6, md: 8 };
      break;
    case "xl":
      logoSize = { base: 6, md: 8 };
      break;
    default:
      logoSize = { base: 4, md: 6 };
      break;
  }

  let textSize = { base: "sm", md: "md" };
  switch (propsSize) {
    case "xs":
      textSize = { base: "sm", md: "sm" };
      break;
    case "sm":
      textSize = { base: "sm", md: "md" };
      break;
    case "md":
      textSize = { base: "md", md: "lg" };
      break;
    case "lg":
      textSize = { base: "lg", md: "xl" };
      break;
    case "xl":
      textSize = { base: "lg", md: "xl" };
      break;
    default:
      textSize = { base: "md", md: "lg" };
      break;
  }

  return (
    <HStack
      w="100%"
      height={logoSize}
      transform={{ base: "translateX(-5px) scale(0.9)", sm: "none" }}
      justify={"space-between"}
    >
      <HStack>
        <Center height={logoSize} width={logoSize}>
          {children ? (
            children
          ) : (
            <svg
              width="30"
              height="22"
              viewBox="0 0 30 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.95617 0.123687C6.0368 0.0448914 6.15088 0 6.27047 0H28.5682C28.9404 0 29.1334 0.396374 28.8791 0.639027L24.0377 5.26011C23.9573 5.3369 23.8447 5.38051 23.7268 5.38051H1.54166C1.17175 5.38051 0.977956 4.98849 1.22737 4.74477L5.95617 0.123687Z"
                fill={fillColor}
              />
              <path
                d="M5.69251 16.735C5.77313 16.6562 5.88721 16.6113 6.0068 16.6113H28.3047C28.6768 16.6113 28.8696 17.0077 28.6155 17.2504L23.7741 21.8714C23.6935 21.9483 23.5809 21.9918 23.4632 21.9918H1.27798C0.908082 21.9918 0.714283 21.5997 0.963697 21.3561L5.69251 16.735Z"
                fill={fillColor}
              />
              <path
                d="M5.85174 13.5439C6.01333 13.7079 6.24627 13.8019 6.49104 13.8019H28.7225C29.0908 13.8019 29.2853 13.4126 29.0389 13.1682L24.3958 8.56466C24.1537 8.32458 23.8087 8.1875 23.4468 8.1875H1.51576C1.14967 8.1875 0.954423 8.57258 1.19611 8.81791L5.85174 13.5439Z"
                fill={fillColor}
              />
            </svg>
          )}
        </Center>
        <HStack>
          <Text fontSize={textSize} color={fillColor} fontWeight="600">
            {truncatedAddr}
          </Text>
          <Center
            onClick={() => {
              onCopy(); // todo: this is not working
              SuccessToast({ toast, message: "Wallet Address Copied" });
            }}
            transform={"scale(0.95)"}
            opacity={"0.8"}
            transition={"all 0.2s"}
            _hover={{
              transform: "scale(1)",
              opacity: "1",
              transition: "all 0.2s",
            }}
            as="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="#fff"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z"
              />
            </svg>
          </Center>
        </HStack>
      </HStack>
    </HStack>
  );
};

export const TruncatedAddr = ({
  walletAddress,
}: {
  walletAddress: string;
}): string => {
  const addr = walletAddress;

  let first = addr.slice(0, 4);
  let last = addr.slice(addr.length - 4, addr.length);
  let truncatedAdd = first + "..." + last;
  return truncatedAdd;
};
