import React, { PropsWithChildren } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

export const ExpandedField = (
  props: PropsWithChildren<{
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    icon?: React.ReactNode;
  }>,
) => {
  return (
    <>
      <IconButton onClick={() => props.setOpen(true)}>
        {props.icon || <AddIcon />}
      </IconButton>

      <Dialog
        open={props.open}
        aria-labelledby={props.title}
        disableRestoreFocus
        onClose={() => props.setOpen(false)}
      >
        <DialogTitle variant="h5">{props.title}</DialogTitle>
        <DialogContent>{props.children}</DialogContent>
      </Dialog>
    </>
  );
};
