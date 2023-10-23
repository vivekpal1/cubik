import { Table, TableHeader, TableRow, TableHead, TableBody } from "@cubik/ui";
import React from "react";
import { TableRows } from "./TableRow";
import { GetProjectsReturnType } from "./getProjects";

interface Props {
  projects: GetProjectsReturnType[];
  tableType: "pending" | "accepted" | "rejected";
}
export const RegistrationTable = ({ projects, tableType }: Props) => {
  return (
    <>
      <Table className="mt-5 ">
        <TableHeader>
          <TableRow className="text-base">
            <TableHead className="pl-10">Project</TableHead>
            <TableHead>Project Link</TableHead>
            <TableHead>Creator</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => {
            return (
              <>
                <TableRows tableType={tableType} project={project} />
              </>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};
