import React, { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { InvisibleSubmit } from "../../components/Form.tsx";
import { useGlobalState } from "../../state/State.tsx";
import { nanoid } from "nanoid";
import { FormInput } from "../../components/FormInput.tsx";
import { LibraryCharacter } from "../../types/Character.ts";
import { saves as baseSaves } from "../../constants/saves.ts";
import { Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";

type CharacterForm = {
  name: string;
  maxHp: string;
  ac: string;
} & LibraryCharacter["saves"];

export const AddChar = () => {
  const { setCharacterLibrary } = useGlobalState();
  const [open, setOpen] = useState(false);

  const methods = useForm<CharacterForm>();

  const onSuccess: SubmitHandler<CharacterForm> = ({
    name,
    maxHp,
    ac,
    ...rest
  }) => {
    console.log("trigger");
    setCharacterLibrary((d) => {
      const saves = Object.fromEntries(
        baseSaves.map((s) => [s, rest[s] ?? "?"]),
      ) as LibraryCharacter["saves"];
      d.push({
        name,
        isPersistent: false,
        maxHp: +maxHp,
        ac,
        saves,
        libraryId: nanoid(),
        specialDamageEffects: {
          resistances: [],
          immunities: [],
          vulnerabilities: [],
        },
      });
    });
    setOpen(false);
  };

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
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSuccess)}>
              <Typography variant="h6">General</Typography>

              <Box my={1}>
                <FormInput name="name" />
              </Box>
              <Box my={1}>
                <FormInput name="maxHp" type="number" />{" "}
              </Box>
              <Box my={1}>
                <FormInput name="ac" />{" "}
              </Box>
              <Typography variant="h6">Saves (optional)</Typography>
              <Box display="flex">
                {baseSaves.map((save) => (
                  <Box m={1}>
                    <FormInput key={save} name={save} optional />
                  </Box>
                ))}
              </Box>

              <InvisibleSubmit />
              <Button color="error" onClick={() => methods.reset()}>
                Zurücksetzen
              </Button>
              <Button type="submit">Save Character</Button>
            </form>
          </FormProvider>
        </DialogContent>
      </Dialog>
    </>
  );
};
