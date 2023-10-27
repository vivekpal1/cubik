import React from "react";
import BreadCrumb from "./components/BreadCrumb";
import navigationData from "../navigationData";
import Link from "next/link";

export default function ComponentPage() {
  console.log("navigation data - ", navigationData);
  return (
    <div className="flex justify-start px-10 flex-col gap-5">
      <div className="m-12">
        <BreadCrumb
          pages={[{ name: "Component", href: "/comp", current: true }]}
        />
        <div className="flex flex-col gap-6">
          <p className="text-6xl">Component</p>
          <div className="text-xl">
            All components for squares design system
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {navigationData.map(
          (component) =>
            component.name === "Components" &&
            component.children?.map((subItem) => (
              <li key={subItem.id} className="my-1 ">
                <Link href={subItem.link ? subItem.link : ""}>
                  <div className={`block px-4 py-2 rounded`}>
                    {subItem.children ? (
                      <span className="text-gray-700 text-sm">
                        {subItem.name}
                      </span>
                    ) : (
                      <div className="mr-2 flex flex-row items-center justify-between w-full">
                        <span className="text-gray-700 text-sm">
                          {subItem.name}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
                {subItem.children && (
                  <ul className="list-none pl-4">
                    {subItem.children.map((thirdItem) => (
                      <li key={thirdItem.id} className="my-1">
                        <Link href={thirdItem.link ? thirdItem.link : "#"}>
                          <div className={`block px-4 py-2 rounded  `}>
                            {thirdItem.children ? (
                              <span className="border text-gray-700 text-sm">
                                {thirdItem.name}
                              </span>
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
            ))
        )}
      </div>
    </div>
  );
}
