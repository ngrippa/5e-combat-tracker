import { StyledTableCell, StyledTableRow } from "../../../components/Table.tsx";
import { DealDamage } from "./DealDamage.tsx";
import { useGlobalState } from "../../../state/State.tsx";
import { SmallTextField } from "../../../components/Form.tsx";
import { Saves } from "./Saves.tsx";
import { IconButton, Typography } from "@mui/material";
import PsychologyIcon from "@mui/icons-material/Psychology";
import { useChar } from "../charContext.ts";
import { StatusEffect } from "./StatusEffect.tsx";
import DeleteIcon from "@mui/icons-material/Delete";
import { openDndBeyond } from "../../../utils/openDndBeyond.ts";

export const CharacterRow = () => {
  const { options, setCharacters, turnInfo } = useGlobalState();
  const char = useChar();
  return (
    <StyledTableRow>
      <StyledTableCell component="th" scope="row">
        <Typography
          color={turnInfo?.currentChar === char.id ? "success.main" : undefined}
          sx={{
            cursor: char.link ? "pointer" : undefined,
          }}
          onClick={openDndBeyond(char)}
        >
          {char.name}
        </Typography>
      </StyledTableCell>
      {options.enterInitiative && (
        <StyledTableCell>
          <SmallTextField
            type="number"
            label={"Initiative"}
            value={char.initiative.toString()}
            onChange={(e) => {
              setCharacters((d) => {
                d[char.id].initiative = +e.target.value;
              });
            }}
          />
        </StyledTableCell>
      )}
      <StyledTableCell>
        <DealDamage />
      </StyledTableCell>
      <StyledTableCell>
        <Typography>{char.ac}</Typography>
      </StyledTableCell>
      <StyledTableCell>
        <IconButton
          color={char.concentrated ? "error" : undefined}
          onClick={() =>
            setCharacters((d) => {
              d[char.id].concentrated = !d[char.id].concentrated;
            })
          }
        >
          <PsychologyIcon />
        </IconButton>
      </StyledTableCell>
      <StyledTableCell>
        <Saves />
      </StyledTableCell>
      <StyledTableCell>
        <StatusEffect type="status" />{" "}
      </StyledTableCell>
      <StyledTableCell>
        <StatusEffect type="preTurn" />{" "}
      </StyledTableCell>
      <StyledTableCell>
        <StatusEffect type="postTurn" />
      </StyledTableCell>
      <StyledTableCell>
        <IconButton
          onClick={() => {
            setCharacters((d) => {
              delete d[char.id];
            });
          }}
        >
          <DeleteIcon />
        </IconButton>
      </StyledTableCell>
    </StyledTableRow>
  );
};
