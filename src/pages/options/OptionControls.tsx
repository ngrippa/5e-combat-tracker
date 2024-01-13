import { useGlobalState } from "../../state/State.tsx";
import { Box } from "@mui/material";
import { Options } from "../../types/Options.ts";
import Button from "@mui/material/Button";
import { ProgressTurn } from "./ProgressTurn.tsx";

export const OptionControls = () => {
  const { options, setOptions, setCharacters, setTurnInfo } = useGlobalState();
  const handleChange = (key: keyof Options) => () =>
    setOptions((d) => {
      d[key] = !d[key];
    });

  const resetFight = () => {
    setCharacters((chars) => {
      Object.values(chars).forEach((char) => {
        char.initiative = 0;
        char.effects.status = [];
        char.effects.preTurn = [];
        char.effects.postTurn = [];
      });
    });
    setOptions((o) => {
      o.enterInitiative = true;
    });
    setTurnInfo(null);
  };

  const longRest = () => {
    resetFight();
    setCharacters((chars) => {
      Object.values(chars).forEach((char) => {
        char.concentrated = false;
        char.currentHp = char.maxHp;
      });
    });
  };

  return (
    <Box mt={2} p={3}>
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
  );
};
