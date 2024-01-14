import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { MainTable } from "./pages/mainTable/MainTable.tsx";
import { StateProvider } from "./state/StateProvider.tsx";
import { OptionControls } from "./pages/options/OptionControls.tsx";
import { Library } from "./pages/library/Library.tsx";
import { SnackbarProvider } from "notistack";

const theme = createTheme({ palette: { mode: "dark" } });
export const App = () => {
  return (
    <SnackbarProvider maxSnack={3}>
      <StateProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainTable />
          <OptionControls />
          <Library />
        </ThemeProvider>
      </StateProvider>
    </SnackbarProvider>
  );
};
