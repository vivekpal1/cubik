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
    <ul className="list-none pl-0">
      {navigationData.map((item) => (
        <li key={item.id} className="my-2">
          <div className={`block px-4 py-2 rounded `}>
            {item.children && (
              <span className="text-gray-400 uppercase tracking-widest text-md">
                {item.name}
              </span>
            )}
          </div>
          <ul className="list-none pl-4">
            {item.children &&
              item.children.map((subItem) => (
                <li key={subItem.id} className="my-1 ">
                  <Link href={subItem.link ? subItem.link : ""}>
                    <div
                      className={`block px-4 py-2 rounded ${
                        pathname === subItem.link
                          ? "bg-blue-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {subItem.children ? (
                        <button
                          onClick={() =>
                            setToggledSubItem(
                              toggledSubItem === subItem.id ? null : subItem.id
                            )
                          }
                          className="mr-2 flex flex-row items-center justify-between w-full"
                        >
                          <span className="text-gray-700 text-sm">
                            {subItem.name}
                          </span>
                          <DropdownIcon
                            isOpen={toggledSubItem === subItem.id}
                          />{" "}
                        </button>
                      ) : (
                        <div className="mr-2 flex flex-row items-center justify-between w-full">
                          <span className="text-gray-700 text-sm">
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
                                  ? "bg-gray-100 text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                                  : "hover:bg-gray-100"
                              }`}
                            >
                              {thirdItem.children ? (
                                <button
                                  onClick={() =>
                                    setToggledThirdItem(
                                      toggledThirdItem === thirdItem.id
                                        ? null
                                        : thirdItem.id
                                    )
                                  }
                                  className="mr-2 border-2"
                                >
                                  <span className="border text-gray-700 text-sm">
                                    {thirdItem.name}
                                  </span>{" "}
                                  <DropdownIcon
                                    isOpen={toggledThirdItem === thirdItem.id}
                                  />
                                </button>
                              ) : (
                                <div className="mr-2 flex flex-row items-center justify-between w-full">
                                  <span className=" text-gray-700 text-sm">
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
