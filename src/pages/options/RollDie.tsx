import { useImmer } from "use-immer";
import { Box, Typography } from "@mui/material";
import { SmallTextField } from "../../components/Form.tsx";
import { useCallback, useState } from "react";
import { rollDieString } from "../../dies/rollDieString.ts";
import Button from "@mui/material/Button";

export const RollDie = () => {
  const [history, setHistory] = useImmer<number[]>([]);
  const [val, setVal] = useState<string>("");
  const rollDie = useCallback(() => {
    const result = rollDieString(val);
    setHistory((d) => {
      d.unshift(result);
      d.splice(5, 1);
    });
  }, [setHistory, val]);
  return (
    <Box display="flex" alignItems="center">
      <SmallTextField
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => {
          if (e.key !== "Enter") return;
          rollDie();
        }}
        label={"Roll Dice"}
      />
      <Button onClick={rollDie}>Roll Dice</Button>
      <Typography ml={2}>{history.join(", ")}</Typography>
    </Box>
  );
};
