import "./App.css";

import { Route, Routes } from "react-router-dom";

import { ColorContextMode, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import CustomSideBar from "./Scenes/Global/CustomSideBar";
import Topbar from "./Scenes/Global/Topbar";
import Cohorts from "./Scenes/Cohorts";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorContextMode.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <CustomSideBar />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<p>Home</p>} />
              <Route path="/cohorts" element={<Cohorts />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorContextMode.Provider>
  );
}

export default App;
