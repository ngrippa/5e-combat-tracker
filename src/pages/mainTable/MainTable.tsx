import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGlobalState } from "../../state/State.tsx";
import { StyledTableCell } from "../../components/Table.tsx";
import { CharacterRow } from "./row/CharacterRow.tsx";
import { Typography } from "@mui/material";
import { charContext } from "./charContext.ts";

export const MainTable = () => {
  const { characters, options } = useGlobalState();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>
              <Typography>Name</Typography>
            </StyledTableCell>
            {options.enterInitiative && (
              <StyledTableCell>
                <Typography>Initiative</Typography>
              </StyledTableCell>
            )}
            <StyledTableCell>
              <Typography>HP</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography>AC</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography>Conc</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography>Saves</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography>Status</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography>Pre-Turn</Typography>
            </StyledTableCell>
            <StyledTableCell>
              <Typography>Post-Turn</Typography>
            </StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {characters.map((char) => (
            <charContext.Provider value={char} key={char.id}>
              <CharacterRow />
            </charContext.Provider>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
