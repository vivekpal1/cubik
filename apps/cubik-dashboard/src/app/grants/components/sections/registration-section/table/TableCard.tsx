import { Tabs, TabsContent, TabsList, TabsTrigger } from "@cubik/ui";
import React, { useMemo } from "react";
import { RegistrationTable } from "./Table";
import { AccessScope } from "@cubik/common-types/src/admin";
import { getProjects } from "./getProjects";
import { useQuery } from "@tanstack/react-query";

interface Props {
  scope: AccessScope | null;
}
export const TableCard = ({ scope }: Props) => {
  const projectsQuery = useQuery({
    queryFn: () => getProjects(scope),
    enabled: scope ? true : false,
    queryKey: ["scope", "projects"],
  });
  const projects = useMemo(() => {
    if (projectsQuery.data) {
      return {
        approve: projectsQuery.data.filter((e) => e.status === "APPROVED"),
        rejected: projectsQuery.data.filter((e) => e.status === "REJECTED"),
        pending: projectsQuery.data.filter((e) => e.status === "PENDING"),
        totalProjects: projectsQuery.data.length || 0,
      };
    } else {
      return {
        approve: [],
        rejected: [],
        pending: [],
        totalProjects: 0,
      };
    }
  }, [scope, projectsQuery]);
  return (
    <>
      <div className="px-3">
        <div className="bg-neutral-800 w-full rounded-md">
          <div className="p-5 border-b border-b-surface-neutral-800">
            <p className="text-white text-2xl font-semibold">Projects</p>
          </div>
          <div className="h-20 flex justify-start gap-4 md:gap-20 py-5 px-10">
            <div className="font-normal flex justify-start items-start flex-col gap-3 text-surface-neutral-600">
              <p className="text-xl font-semibold ">
                <span className="text-3xl font-extrabold text-white">
                  {projects.approve.length}
                </span>
                /{projects.totalProjects}
              </p>
              <p className="text-xs">Projects Participating</p>
            </div>
            <div className="font-normal flex justify-start items-start flex-col gap-3 text-surface-neutral-600">
              <p className="text-xl font-semibold ">
                <span className="text-3xl font-extrabold text-white">
                  {projects.totalProjects}
                </span>
              </p>
              <p className="text-xs">Projects Applied</p>
            </div>
            <div className="font-normal flex justify-start items-start flex-col gap-3 text-surface-neutral-600">
              <p className="text-xl font-semibold ">
                <span className="text-3xl font-extrabold text-white">
                  12 hrs
                </span>
              </p>
              <p className="text-xs">Till registration closes</p>
            </div>
          </div>
          <div>
            <Tabs defaultValue="pending" className="my-6">
              <TabsList className="bg-neutral-800 w-full overflow-x-auto whitespace-nowrap">
                <div className="w-full max-w-7xl border-b border-b-surface-neutral-800 px-10">
                  <TabsTrigger value="pending">Pending</TabsTrigger>
                  <TabsTrigger value="rejected">Rejected</TabsTrigger>
                  <TabsTrigger value="accepted">Accepted</TabsTrigger>
                </div>
              </TabsList>
              <div className="w-full max-w-7xl mx-auto ">
                <TabsContent value="pending">
                  {projects.pending.length > 0 ? (
                    <RegistrationTable
                      tableType={"pending"}
                      projects={projects.pending}
                    />
                  ) : (
                    <div>No Project found</div>
                  )}
                </TabsContent>
                <TabsContent value="rejected">
                  {projects.rejected.length > 0 ? (
                    <RegistrationTable
                      tableType={"rejected"}
                      projects={projects.rejected}
                    />
                  ) : (
                    <div>No Project found</div>
                  )}
                </TabsContent>
                <TabsContent value="accepted">
                  {projects.approve.length > 0 ? (
                    <RegistrationTable
                      tableType={"accepted"}
                      projects={projects.approve}
                    />
                  ) : (
                    <div>No Project found</div>
                  )}
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};
