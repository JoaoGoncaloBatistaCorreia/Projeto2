import { createContext, useState } from "react";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Error from "./components/Error";
import "./styles/theme.css";
import Dashboard from "./components/Dashboard";
import Registo from "./components/Registo";

export const ThemeContext = createContext<any>(null);
function App() {

  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Error" element={<Error />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Registo" element={<Registo />} />
          <Route path="*" element={<Error />} />
        </Routes>
    </ThemeContext.Provider>
  );
}

export default App;
