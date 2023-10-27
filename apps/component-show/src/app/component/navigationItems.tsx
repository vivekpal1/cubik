"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useState } from "react";

interface NavItem {
  id: number;
  name: string;
  link?: string;
  icon?: string;
  children?: NavItem[];
}

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

const navigationData: NavItem[] = [
  {
    id: 1,
    name: "Foundations",
    children: [
      { id: 11, name: "Colors", link: "/foundations/colors" },
      { id: 12, name: "Border Radius", link: "/foundations/border-radius" },
      { id: 13, name: "Spacing", link: "/foundations/spacing" },
      { id: 14, name: "Typography", link: "/foundations/typography" },
    ],
  },
  {
    id: 2,
    name: "Components",
    children: [
      {
        id: 21,
        name: "Data Display",
        children: [{ id: 211, name: "Tag", link: "/com/data-display/tag" }],
      },
      {
        id: 22,
        name: "Disclosure",
        children: [
          { id: 221, name: "Tabs", link: "/com/disclosure/tabs" },
          { id: 222, name: "Accordion", link: "/com/disclosure/accordion" },
        ],
      },
      {
        id: 23,
        name: "Feedback",
        children: [
          {
            id: 231,
            name: "Alert",
            link: "/com/feedback/alert",
          },
          {
            id: 132,
            name: "Toast",
            link: "/com/feedback/toast",
          },
        ],
      },
      {
        id: 24,
        name: "Media & Icons",
        children: [
          { id: 241, name: "Avatar", link: "/com/media/avatar" },
          { id: 242, name: "Icons", link: "/com/media/icons" },
          { id: 243, name: "Images", link: "/com/media/images" },
        ],
      },
      {
        id: 25,
        name: "Overlay",
        children: [
          { id: 251, name: "Avatar", link: "/com/overlay/avatar" },
          { id: 252, name: "Icons", link: "/com/overlay/icons" },
          { id: 253, name: "Images", link: "/com/overlay/images" },
        ],
      },
    ],
  },
];

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
