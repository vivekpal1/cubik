"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";
import navigationData from "../navigationData";

const DropdownIcon = ({ isOpen }: { isOpen: boolean }) => (
  <svg
    width="10"
    height="6"
    viewBox="0 0 10 6"
    fill="none"
    transform={isOpen ? "rotate(180)" : ""}
  >
    <path
      d="M1 1L5 5L9 1"
      stroke="#4A4A4A"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
const NavigationItems: FC = () => {
  const pathname = usePathname();
  const [toggledItem, setToggledItem] = useState<number | null>(null);
  const [toggledSubItem, setToggledSubItem] = useState<number | null>(null);
  const [toggledThirdItem, setToggledThirdItem] = useState<number | null>(null);

  return (
    <ul className="list-none pl-0 w-fit flex flex-col gap-4">
      {navigationData.map((item) => (
        <li key={item.id} className="flex flex-col gap-2">
          {/* top level element */}
          <div className={`block rounded gap-4`}>
            {item.children && (
              <span className="text-[#808080] uppercase tracking-[3px] font-medium text-[14px]">
                {item.name}
              </span>
            )}
          </div>
          <ul className="list-none flex flex-col gap-2">
            {item.children &&
              item.children.map((subItem) => (
                <li
                  key={subItem.id}
                  className="flex flex-col gap-2 min-w-[220px]"
                >
                  <Link href={subItem.link ? subItem.link : ""}>
                    <div
                      className={`block px-4 py-2 rounded ${
                        pathname === subItem.link
                          ? "bg-purple-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {/* 2nd level element */}
                      {subItem.children ? (
                        <button
                          onClick={() =>
                            setToggledSubItem(
                              toggledSubItem === subItem.id ? null : subItem.id
                            )
                          }
                          className="mr-2 flex flex-row items-center justify-between w-full"
                        >
                          <span className="text-black text-[14px] font-regular">
                            {subItem.name}
                          </span>
                          <DropdownIcon
                            isOpen={toggledSubItem === subItem.id}
                          />{" "}
                        </button>
                      ) : (
                        <div className="mr-2 flex flex-row items-center justify-between w-full">
                          <span className="text-black text-[14px] font-regular">
                            {subItem.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>
                  {subItem.children && toggledSubItem === subItem.id && (
                    <ul className="list-none pl-4">
                      {subItem.children.map((thirdItem) => (
                        <li key={thirdItem.id} className="my-1">
                          <Link href={thirdItem.link ? thirdItem.link : "#"}>
                            <div
                              className={`block px-4 py-2 rounded ${
                                pathname === thirdItem.link
                                  ? "bg-purple-50 text-purple-700 font-medium focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition duration-300"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              {thirdItem.children ? (
                                // this is of no use rn
                                <button
                                  onClick={() =>
                                    setToggledThirdItem(
                                      toggledThirdItem === thirdItem.id
                                        ? null
                                        : thirdItem.id
                                    )
                                  }
                                  className="mr-2"
                                >
                                  <span
                                    className={`${
                                      pathname === thirdItem.link
                                        ? "text-purple-500"
                                        : "text-black"
                                    } text-[14px]`}
                                  >
                                    {thirdItem.name}
                                  </span>{" "}
                                  <DropdownIcon
                                    isOpen={toggledThirdItem === thirdItem.id}
                                  />
                                </button>
                              ) : (
                                // this is where you change to change the final children
                                <div className="mr-2 flex flex-row items-center justify-between w-full">
                                  <span
                                    className={`${
                                      pathname === thirdItem.link
                                        ? "text-purple-500"
                                        : "text-black"
                                    } text-[14px]`}
                                  >
                                    {thirdItem.name}
                                  </span>
                                </div>
                              )}
                            </div>
                          </Link>
                          {/* Implement logic for fourth level here if needed */}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
          </ul>
        </li>
      ))}
    </ul>
  );
};
export default NavigationItems;
