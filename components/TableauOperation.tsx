import { TrashIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import DeleteOperationConfirm from "./DeleteOperationConfirm";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const TableauOperation = ({ operations }) => {
  const [open, setOpen] = useState(false);
  const deleteOp = () => {
    setOpen(true);
  };
  return <></>;
};

export default TableauOperation;
