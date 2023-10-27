import React from "react";
import NavigationItems from "./navigationItems";

const SideMenu: React.FC = () => {
  return (
    <div className="bg-white flex flex-col w-fit h-screen border-r p-8">
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default SideMenu;
