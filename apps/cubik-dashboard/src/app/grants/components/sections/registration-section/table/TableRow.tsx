"use client";
import { TableCell, TableRow, SidePanel, Button, Icon } from "@cubik/ui";
import React, { useState } from "react";
import { ProjectInfo } from "../ProjectInfo";

import DeclineProjectModal from "../modals/DeclineProjectModal";
import AcceptProjectModal from "../modals/AcceptProjectModal";
import { GetProjectsReturnType } from "./getProjects";
import Image from "next/image";

interface Props {
  project: GetProjectsReturnType;
  tableType: "pending" | "accepted" | "rejected";
}

export const TableRows = ({ project }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDeclineDialogOpen, setIsDeclineDialogOpen] =
    useState<boolean>(false);
  const [isAcceptDialogOpen, setIsAcceptDialogOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<any>(null);

  const openModal = (content: any) => {
    setModalContent(content);
    setIsModalOpen(true);
  };
  return (
    <>
      <TableRow
        className="hover:bg-surface-neutral-820"
        onClick={() => openModal("Superteam Earn")}
      >
        <TableCell className="font-medium pl-10">
          <div className="flex justify-start items-center gap-3">
            <Image
              src={project.logo || ""}
              alt="project logo"
              width={40}
              height={40}
            />
            <div className="flex flex-col justify-start items-start">
              <p className="text-white text-base">{project.name}</p>
              <p className="text-surface-neutral-500 text-sm">
                {project.projectLink.slice(0, 40)}
              </p>
            </div>
          </div>
        </TableCell>
        <TableCell>
          <p className="text-surface-blue-500 text-sm font-medium underline underline-offset-4">
            {project.projectLink.slice(0, 30)}
          </p>
        </TableCell>
        <TableCell>
          <div className="flex gap-2 justify-start items-center">
            {/* <div className="w-5 h-5 bg-red-600 rounded-full" /> */}
            <Image
              src={project.owner.avatar || ""}
              alt="user avatar"
              width={20}
              height={20}
            />
            <p className="text-white text-base font-semibold">
              @{project.owner.username}
            </p>
          </div>
        </TableCell>
        <TableCell className="">
          <button className="text-white font-normal px-8 py-1 text-sm bg-violet-700 rounded-full">
            {project.status}
          </button>
        </TableCell>
        <TableCell className="text-white font-medium text-sm">
          1 day ago
        </TableCell>
      </TableRow>

      {isModalOpen && (
        <SidePanel open={isModalOpen} setOpen={setIsModalOpen}>
          <div className="flex h-full flex-col divide-y divide-gray-200 bg-[#141414] shadow-xl ">
            <div onClick={() => setIsModalOpen(false)}>
              <Icon
                name="cross"
                className="absolute right-8 top-4 cursor-pointer"
                fill="none"
                height={16}
                width={16}
                stroke="#fff"
              />
            </div>

            <ProjectInfo />
            <div className="flex w-full justify-start px-4 py-4 bg-neutral-600 border-none">
              <div className="flex w-full space-x-2 pb-4">
                <Button
                  variant="destructive"
                  className="flex-1 space-x-2"
                  size="sm"
                  onClick={(e) => {
                    // e.preventDefault();
                    setIsDeclineDialogOpen(true);
                    setIsModalOpen(false);
                  }}
                >
                  <p>Decline</p>
                  <Icon name="cross" height={14} width={14} fill="none" />
                </Button>

                <Button
                  className="bg-green-500 text-black flex-1 space-x-2"
                  size="sm"
                  onClick={() => {
                    // e.preventDefault();
                    setIsAcceptDialogOpen(true);
                    setIsModalOpen(false);
                  }}
                >
                  <p>Accept</p>
                  <Icon
                    name="doubleTick"
                    height={14}
                    width={14}
                    fill="none"
                    stroke="#000"
                  />
                </Button>
              </div>
            </div>
          </div>
        </SidePanel>
      )}

      <DeclineProjectModal
        isDeclineDialogOpen={isDeclineDialogOpen}
        setIsDeclineDialogOpen={setIsDeclineDialogOpen}
      />

      <AcceptProjectModal
        isAcceptDialogOpen={isAcceptDialogOpen}
        setIsAcceptDialogOpen={setIsAcceptDialogOpen}
      />
    </>
  );
};
