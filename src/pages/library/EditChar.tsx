import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import { CharForm } from "./CharForm.tsx";
import { LibraryCharacter } from "../../types/Character.ts";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";

export const EditChar = (props: { character?: LibraryCharacter }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {props.character ? (
        <IconButton onClick={() => setOpen(true)}>
          <EditIcon />
        </IconButton>
      ) : (
        <Button
          variant="outlined"
          onClick={() => setOpen(true)}
          sx={{ mt: 1, mx: 3 }}
        >
          Add Character
        </Button>
      )}
      <Dialog
        open={open}
        disableRestoreFocus
        onClose={() => setOpen(false)}
        maxWidth="xl"
      >
        <DialogTitle variant="h5">
          {props.character ? "Edit" : "Add"} character
        </DialogTitle>
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
