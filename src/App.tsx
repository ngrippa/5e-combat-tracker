import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";

const theme = createTheme({palette: {mode: 'dark'}});
export const App = () => {
  return <ThemeProvider theme={theme}>
<CssBaseline />
    <main>This app is using the dark mode</main>
  </ThemeProvider>
}

