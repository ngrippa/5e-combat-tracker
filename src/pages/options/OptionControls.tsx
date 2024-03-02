import { useGlobalState } from "../../state/State.tsx";
import { Box, Typography } from "@mui/material";
import { Options } from "../../types/Options.ts";
import Button from "@mui/material/Button";
import { ProgressTurn } from "./ProgressTurn.tsx";
import { Stopwatch } from "./Stopwatch.tsx";
import { RollDie } from "./RollDie.tsx";
import { libToCombatChar } from "../../constants/baseChar.ts";

export const OptionControls = () => {
  const {
    options,
    setOptions,
    setCharacters,
    setTurnInfo,
    turnInfo,
    characterLibrary,
  } = useGlobalState();
  const handleChange = (key: keyof Options) => () =>
    setOptions((d) => {
      d[key] = !d[key];
    });

  const resetFight = () => {
    setCharacters((chars) => {
      Object.keys(chars).forEach((charId) => {
        const char = chars[charId];
        if (char.isPersistent) {
          char.initiative = 0;
          char.effects.status = [];
          char.effects.preTurn = [];
          char.effects.postTurn = [];
        } else {
          delete chars[charId];
        }
      });
    });
    setOptions((o) => {
      o.enterInitiative = true;
    });
    setTurnInfo(null);
  };

  const longRest = () => {
    resetFight();
    const newChars = characterLibrary
      .filter((c) => c.isPersistent)
      .map((c) => libToCombatChar(c));
    setCharacters(() => Object.fromEntries(newChars.map((c) => [c.id, c])));
  };

  return (
    <Box mt={2} p={3}>
      <Box mb={2}>
        <Typography mr={1} component="span">
          Turn {turnInfo?.turnNumber}
        </Typography>
        {turnInfo && <Stopwatch />}
        <ProgressTurn />
        <Button
          variant="outlined"
          onClick={handleChange("enterInitiative")}
          sx={{ ml: 1 }}
        >
          {options.enterInitiative ? "Sort initiative" : "Enter initiative"}
        </Button>
        <Button variant="outlined" onClick={resetFight} sx={{ ml: 1 }}>
          Reset Combat
        </Button>
        <Button variant="outlined" onClick={longRest} sx={{ ml: 1 }}>
          Long Rest
        </Button>
      </Box>
      <RollDie />
    </Box>
  );
};
