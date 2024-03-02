import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { CharForm } from "./CharForm.tsx";

export const AddChar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        onClick={() => setOpen(true)}
        sx={{ mt: 1, mx: 3 }}
      >
        Add Character
      </Button>
      <Dialog open={open} disableRestoreFocus onClose={() => setOpen(false)}>
        <DialogTitle variant="h5">Add character</DialogTitle>
        <DialogContent>
          <CharForm onSuccess={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
};
