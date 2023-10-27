"use client";
import { Tag } from "@cubik/ui";
import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import ComponentHeading from "../../components/ComponentHeading";

const Tags = () => {
  return (
    <div className="flex justify-start px-10 flex-col gap-5">
      <div className="m-12">
        <BreadCrumb
          pages={[
            { name: "Component", href: "/comp", current: false },
            { name: "Tags", href: "/comp/tags", current: true },
          ]}
        />
        <div className="flex flex-col gap-6">
          <p className="text-6xl">Tag</p>
          <div className="text-xl">
            Use the label component to add contextual metadata to a design.
          </div>
        </div>
      </div>
      <ComponentHeading />
      <div className="space-y-2">
        <Tag text="Pending" iconName="spinner" color="#000" />
      </div>
    </div>
  );
};

export default Tags;
