"use client";
import { Tag } from "@cubik/ui";
import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import ComponentHeading from "../../components/ComponentHeading";
import PageHOC from "../../components/pageHOC";

const Tags = () => {
  return (
    <PageHOC
      pages={[
        { name: "Component", href: "/component", current: false },
        { name: "Tags", href: "/component/tags", current: true },
      ]}
      heading={"Tags"}
      description={
        "Use the label component to add contextual metadata to a design."
      }
    >
      <Tag text="Pending" iconName="spinner" color="#000" />
    </PageHOC>
  );
};

export default Tags;
