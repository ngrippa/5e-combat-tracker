import { Box, Typography } from "@mui/material";
import { useChar } from "../charContext.ts";

export const Saves = () => {
  const char = useChar();
  return (
    <Box display="flex">
      <Box pr={1}>
        <Typography noWrap>STR: {char.saves.STR}</Typography>
        <Typography noWrap>DEX: {char.saves.DEX}</Typography>
        <Typography noWrap>CON: {char.saves.CON}</Typography>
      </Box>
      <Box>
        <Typography noWrap>INT: {char.saves.INT}</Typography>
        <Typography noWrap>WIS: {char.saves.WIS}</Typography>
        <Typography noWrap>CHA: {char.saves.CHA}</Typography>
      </Box>
    </Box>
  );
};
