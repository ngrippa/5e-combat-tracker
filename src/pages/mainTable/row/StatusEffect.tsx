import { useChar } from "../charContext.ts";
import { Character } from "../../../types/Character.ts";
import { Chip } from "@mui/material";
import { useGlobalState } from "../../../state/State.tsx";
import { SingleExpandedField } from "../../../components/SingleExpandedField.tsx";
import { nanoid } from "nanoid";

export const StatusEffect = ({
  type,
}: {
  type: keyof Character["effects"];
}) => {
  const char = useChar();
  const { setCharacters } = useGlobalState();

  const handleDelete = (id: string) => () => {
    setCharacters((d) => {
      d[char.id].effects[type] = d[char.id].effects[type].filter(
        (e) => e.id !== id,
      );
    });
  };

  return (
    <>
      <SingleExpandedField
        title={"Add effect"}
        success={(value) =>
          setCharacters((d) => {
            const c = d[char.id];
            c.effects[type].push({ id: nanoid(), label: value });
          })
        }
        inputProps={{ label: "Effect" }}
      />

      {char.effects[type].map((e) => (
        <Chip
          key={e.id}
          sx={{ m: 0.5 }}
          label={e.label}
          onDelete={handleDelete(e.id)}
        />
      ))}
    </>
  );
};
