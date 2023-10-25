import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Button,
} from "@cubik/ui";
import React from "react";
import { TransactionsTableRows } from "./TransactionsTableRows";
export const TransactionsTable = () => {
  return (
    <>
      <Table className="">
        <TableHeader className="border-b-0">
          <TableRow className="text-base">
            <TableHead className="text-xs font-normal">Asset</TableHead>
            <TableHead className="text-xs font-normal">Transaction</TableHead>
            <TableHead className="text-xs font-normal">Signature</TableHead>
            <TableHead className="text-xs font-normal">Sending To</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TransactionsTableRows />
        </TableBody>
      </Table>
    </>
  );
};
