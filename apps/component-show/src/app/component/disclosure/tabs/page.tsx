"use client";
import React from "react";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@cubik/ui";
const TabComponentPage = () => {
  return (
    <div>
      <Tabs defaultValue="details" className="">
        <TabsList className="w-full overflow-x-auto whitespace-nowrap">
          <div className="w-full max-w-7xl mx-auto">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="registrations">Registrations</TabsTrigger>
            <TabsTrigger value="multisigs">Multisigs</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </div>
        </TabsList>
        <div className="w-full max-w-7xl mx-auto">
          <TabsContent value="details">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="registrations"></TabsContent>
          <TabsContent value="multisigs"></TabsContent>
          <TabsContent value="analytics">
            Change your password here.
          </TabsContent>
          <TabsContent value="settings">Change your password here.</TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TabComponentPage;
