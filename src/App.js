import React from "react";
import { ButtonAppBar } from "./components/ButtonAppBar";
import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { Scan } from "./routes/Scan";
import { NotFound } from "./routes/NotFound";
import { Temp } from "./routes/Temp";

const App = () => {
  return (
    <div className="App">
      <ButtonAppBar />
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/scan" element={ <Scan /> } />
        <Route path="/temp/:uid" element={ <Temp message="36.8" /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
    </div>
  )
}

export default App;
