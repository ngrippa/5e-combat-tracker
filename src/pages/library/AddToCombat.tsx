import { ExpandedField } from "../../components/ExpandedField.tsx";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  FormProvider,
  SubmitHandler,
  useFieldArray,
  useForm,
} from "react-hook-form";
import { LibraryCharacter } from "../../types/Character.ts";
import { nanoid } from "nanoid";
import { FormInput } from "../../components/FormInput.tsx";
import { Box, IconButton } from "@mui/material";
import { useGlobalState } from "../../state/State.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { createChar } from "../../constants/baseChar.ts";

type AddToCombatForm = {
  characters: {
    usp: string;
  }[];
};

export const AddToCombat = (props: { id: LibraryCharacter["libraryId"] }) => {
  const [open, setOpen] = useState("");
  const { setCharacters, characterLibrary } = useGlobalState();

  const methods = useForm<AddToCombatForm>({
    defaultValues: { characters: [{ usp: "" }] },
  });
  const { fields, append, remove } = useFieldArray({
    control: methods.control, // control props comes from useForm (optional: if you are using FormContext)
    name: "characters", // unique name for your Field Array
  });

  useEffect(() => {
    const subscription = methods.watch(({ characters }) => {
      if (characters?.every((field) => field?.usp)) append({ usp: "" });
    });
    return () => subscription.unsubscribe();
  }, [methods, append]);

  const onSuccess: SubmitHandler<AddToCombatForm> = ({ characters }) => {
    const usps = characters.map((u) => u.usp).filter(Boolean);
    if (!usps.length) usps.push("");
    const rootCharacter = characterLibrary.find(
      (c) => c.libraryId === props.id,
    );
    if (!rootCharacter) return;
    const newCharacters = usps.map((c) =>
      createChar({
        ...rootCharacter,
        name: c ? `${rootCharacter.name} (${c})` : rootCharacter.name,
        id: nanoid(),
        currentHp: rootCharacter.maxHp,
        concentrated: false,
        initiative: 0,
        effects: { preTurn: [], status: [], postTurn: [] },
      }),
    );
    setCharacters((d) => {
      newCharacters.forEach((c) => (d[c.id] = c));
    });
    methods.reset();
    setOpen("");
  };

  return (
    <>
      <ExpandedField
        title={"Add to combat"}
        open={!!open}
        setOpen={(open) => setOpen(open ? props.id : "")}
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSuccess)}>
            {fields.map((field, index) => (
              <Box
                key={field.id}
                p={1}
                justifyContent="center"
                alignItems="center"
                display="flex"
              >
                <FormInput
                  name={`characters.${index}.usp`}
                  label={"What makes this monster special?"}
                  optional
                  sx={{ width: 300 }}
                />
                <IconButton onClick={() => remove(index)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            <Button type="submit">Add characters</Button>
          </form>
        </FormProvider>
      </ExpandedField>
    </>
  );
};
