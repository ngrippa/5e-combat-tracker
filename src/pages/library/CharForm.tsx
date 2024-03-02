import { LibraryCharacter } from "../../types/Character.ts";
import {
  DefaultValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import {
  abilityScores,
  saves,
  saves as baseSaves,
} from "../../constants/saves.ts";
import { useGlobalState } from "../../state/State.tsx";
import { Box, Typography } from "@mui/material";
import { FormInput } from "../../components/FormInput.tsx";
import { InvisibleSubmit } from "../../components/Form.tsx";
import Button from "@mui/material/Button";
import { nanoid } from "nanoid";
import { useMemo } from "react";
import { baseLibraryChar } from "../../constants/baseChar.ts";
import { FormCheckbox } from "../../components/FormCheckbox.tsx";
import { Monster, MonsterDetails } from "../../api/loadMonsters.ts";
import { baseUrl, dndBeyond } from "../../api/5e-bits.ts";
import { getModifier } from "../../utils/getModifier.ts";
import { toSignedString } from "../../utils/toSignedString.ts";

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
  const { setCharacterLibrary, monsters } = useGlobalState();
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

  const loadMonster = async (monsterInfo: Monster) => {
    const res = await fetch(baseUrl + monsterInfo.url);
    const monster: MonsterDetails = await res.json();
    methods.setValue("name", monster.name);
    methods.setValue("link", dndBeyond + monsterInfo.index);
    methods.setValue("maxHp", monster.hit_points.toString());
    methods.setValue("ac", monster.armor_class[0].value.toString());
    methods.setValue(
      "initiative",
      "d20" + toSignedString(getModifier(monster.dexterity)),
    );
    saves.forEach((save, index) => {
      let modifier: number;
      const prof = monster.proficiencies.find(
        (p) => p.proficiency.index === `saving-throw-${save.toLowerCase()}`,
      );
      if (prof) {
        modifier = prof.value;
      } else {
        const score = abilityScores[index];
        modifier = getModifier(monster[score]);
      }
      methods.setValue(`saves.${save}`, toSignedString(modifier));
    });
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSuccess)}>
        <Typography variant="h6">General</Typography>

        <Box my={2}>
          <FormInput
            name="name"
            autocompleteProps={{
              options: monsters,
              getOptionLabel: (option) => (option as Monster).name,
              onChange: (_, monster) => loadMonster(monster as Monster),
            }}
          />
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
        <Box display="flex" mt={1}>
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
          <FormInput name="notes" optional area sx={{ width: "100%" }} />
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
