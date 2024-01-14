import { Box, IconButton } from "@mui/material";
import { useGlobalState } from "../../state/State.tsx";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { AddChar } from "./AddChar.tsx";
import { useMemo } from "react";
import { AddToCombat } from "./AddToCombat.tsx";
import DeleteIcon from "@mui/icons-material/Delete";

export const Library = () => {
  const { characterLibrary, setCharacterLibrary } = useGlobalState();

  const columns: GridColDef[] = useMemo(
    () => [
      { field: "name", headerName: "Name", flex: 12 },
      { field: "maxHp", headerName: "HP", width: 70 },
      { field: "ac", headerName: "AC", flex: 12 },
      {
        field: "actions",
        headerName: "Aktionen",
        type: "actions",
        renderCell: ({ id }) => {
          return (
            <Box>
              <AddToCombat id={id as string} />
              <IconButton
                onClick={() => {
                  setCharacterLibrary((d) => {
                    d.splice(
                      d.findIndex((c) => c.libraryId === id),
                      1,
                    );
                  });
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          );
        },
      },
    ],
    [setCharacterLibrary],
  );
  return (
    <Box>
      <Box my={1}>
        <DataGrid
          rows={characterLibrary}
          disableColumnFilter
          disableColumnSelector
          disableDensitySelector
          columns={columns}
          slots={{ toolbar: GridToolbar }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              csvOptions: { disableToolbarButton: true },
              printOptions: { disableToolbarButton: true },
            },
          }}
          getRowId={(char) => char.libraryId}
        />
      </Box>

      <AddChar />
    </Box>
  );
};
