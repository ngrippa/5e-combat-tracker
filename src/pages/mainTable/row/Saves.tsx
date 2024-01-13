import { Box, Typography } from "@mui/material";
import { useChar } from "../charContext.ts";

export const Saves = () => {
  const char = useChar();
  return (
    <Box display="flex">
      <Box pr={1}>
        <Typography variant="body2" noWrap>
          STR: {char.saves.STR}
        </Typography>
        <Typography variant="body2" noWrap>
          DEX: {char.saves.DEX}
        </Typography>
        <Typography variant="body2" noWrap>
          CON: {char.saves.CON}
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" noWrap>
          INT: {char.saves.INT}
        </Typography>
        <Typography variant="body2" noWrap>
          WIS: {char.saves.WIS}
        </Typography>
        <Typography variant="body2" noWrap>
          CHA: {char.saves.CHA}
        </Typography>
      </Box>
    </Box>
  );
};
