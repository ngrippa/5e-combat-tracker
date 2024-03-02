import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { CharForm } from "./CharForm.tsx";
import { LibraryCharacter } from "../../types/Character.ts";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

export const EditChar = (props: { character: LibraryCharacter }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon />
      </IconButton>
      <Dialog open={open} disableRestoreFocus onClose={() => setOpen(false)}>
        <DialogTitle variant="h5">Edit character</DialogTitle>
        <DialogContent>
          <CharForm
            onSuccess={() => setOpen(false)}
            character={props.character}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
