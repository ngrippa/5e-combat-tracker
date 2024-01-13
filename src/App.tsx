import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { MainTable } from "./pages/mainTable/MainTable.tsx";
import { StateProvider } from "./state/StateProvider.tsx";
import { OptionControls } from "./pages/options/OptionControls.tsx";
import { Library } from "./pages/library/Library.tsx";

const theme = createTheme({ palette: { mode: "dark" } });
export const App = () => {
  return (
    <StateProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <MainTable />
        <OptionControls />
        <Library />
      </ThemeProvider>
    </StateProvider>
  );
};
