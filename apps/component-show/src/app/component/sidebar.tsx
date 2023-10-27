import React from "react";
import NavigationItems from "./navigationItems";

const SideMenu: React.FC = () => {
  return (
    <div className="flex flex-col w-64 h-screen p-4 border-r">
      <nav>
        <NavigationItems />
      </nav>
    </div>
  );
};

export default SideMenu;
