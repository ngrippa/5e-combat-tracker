import { LibraryCharacter } from "../../types/Character.ts";
import {
  DefaultValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { saves as baseSaves } from "../../constants/saves.ts";
import { useGlobalState } from "../../state/State.tsx";
import { Box, Typography } from "@mui/material";
import { FormInput } from "../../components/FormInput.tsx";
import { InvisibleSubmit } from "../../components/Form.tsx";
import Button from "@mui/material/Button";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import { baseLibraryChar } from "../../constants/baseChar.ts";
import { FormCheckbox } from "../../components/FormCheckbox.tsx";

type CharacterForm = Omit<LibraryCharacter, "libraryId" | "maxHp"> & {
  maxHp: string;
};

const toFormChar = (char: LibraryCharacter): CharacterForm => ({
  ...char,
  maxHp: "1",
});

export const CharForm = (props: {
  character?: LibraryCharacter;
  onSuccess?: () => void;
}) => {
  const { setCharacterLibrary } = useGlobalState();
  const defaultValues = useMemo<DefaultValues<CharacterForm>>(() => {
    if (!props.character) return toFormChar(baseLibraryChar);
    return toFormChar(props.character);
  }, [props.character]);
  const methods = useForm<CharacterForm>({ defaultValues });
  const onSuccess: SubmitHandler<CharacterForm> = (form) => {
    const newCharacter: LibraryCharacter = {
      ...form,
      maxHp: +form.maxHp,
      libraryId: props.character?.libraryId ?? nanoid(),
      specialDamageEffects: {
        immunities: [],
        resistances: [],
        vulnerabilities: [],
      },
    };
    setCharacterLibrary((d) => {
      if (props.character) {
        const charIndex = d.findIndex(
          (c) => c.libraryId === props.character?.libraryId,
        );
        d[charIndex] = newCharacter;
      } else {
        d.push(newCharacter);
      }
    });
    props.onSuccess?.();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSuccess)}>
        <Typography variant="h6">General</Typography>

        <Box my={2}>
          <FormInput name="name" />
        </Box>
        <Box my={2}>
          <FormInput name="maxHp" type="number" />
        </Box>
        <Box my={2}>
          <FormInput name="ac" />
        </Box>
        <Box my={2}>
          <FormInput name="initiative" />
        </Box>
        <Typography variant="h6">Saves (optional)</Typography>
        <Box display="flex">
          {baseSaves.map((save) => (
            <Box m={1} key={save}>
              <FormInput name={`saves.${save}`} optional label={save} />
            </Box>
          ))}
        </Box>

        <Box my={2}>
          <FormCheckbox name="isPersistent" />
        </Box>

        <Box my={2}>
          <FormInput name="notes" area sx={{ width: "100%" }} />
        </Box>

        <InvisibleSubmit />
        <Button color="error" onClick={() => methods.reset()}>
          Zurücksetzen
        </Button>
        <Button type="submit">Save Character</Button>
      </form>
    </FormProvider>
  );
};
