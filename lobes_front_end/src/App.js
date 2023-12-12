import "./App.css";

import { Route, Routes } from "react-router-dom";

import { ColorContextMode, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import CustomSideBar from "./Scenes/Global/CustomSideBar";
import Topbar from "./Scenes/Global/Topbar";
import Cohorts from "./Scenes/Cohorts";
import Home from "./Scenes/Home";
import { useState } from "react";
import Covariates from "./Scenes/Covariates";
import Summary from "./Scenes/Summary";
import Projects from "./Scenes/Projects";

function App() {
  const [theme, colorMode] = useMode();
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <ColorContextMode.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={`app ${isCollapsed ? "collapsed" : "expanded"}`}>
          <CustomSideBar
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
          <main className="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/cohorts" element={<Cohorts />} />
              <Route path="/covar" element={<Covariates />} />
              {/* <Route path="/summary" element={<Summary />} /> */}
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorContextMode.Provider>
  );
}

export default App;
