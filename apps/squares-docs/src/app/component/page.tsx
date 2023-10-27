import React from "react";
import BreadCrumb from "./components/BreadCrumb";
import navigationData from "../navigationData";
import Link from "next/link";
import ComponentHeading from "./components/ComponentHeading";

export default function ComponentPage() {
  console.log("navigation data - ", navigationData);
  return (
    <div className="w-full max-w-[1200px] mx-auto flex justify-start flex-col gap-12">
      <BreadCrumb
        pages={[{ name: "Components", href: "/component", current: true }]}
      />
      <ComponentHeading
        heading={"Components"}
        description={
          "Squares provides prebuilt components to help you build faster. Here is an overview of the component categories"
        }
      />
      {navigationData.map(
        (component) =>
          component.name === "Components" &&
          component.children?.map((subItem) => (
            <div key={subItem.id} className="flex flex-col gap-6">
              <div className={`block text-[#0D0D0D] text-xl`}>
                {subItem.name}
              </div>
              {subItem.children && (
                // this is a card
                <ul className="list-none flex flex-row gap-6 flex-wrap">
                  {subItem.children.map((thirdItem) => (
                    <Link
                      key={thirdItem.id}
                      href={thirdItem.link ? thirdItem.link : "#"}
                    >
                      <li className="flex flex-col gap-3">
                        <div className="border border-[#E6E6E6] w-[230px] h-[180px] rounded-[8px] bg-white"></div>
                        <span className=" text-[#0D0D0D] text-md">
                          {thirdItem.name}
                        </span>
                        {/* Implement logic for fourth level here if needed */}
                      </li>
                    </Link>
                  ))}
                </ul>
              )}
            </div>
          ))
      )}
    </div>
  );
}
