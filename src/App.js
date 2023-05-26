import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { Scan } from "./routes/Scan";
import { NotFound } from "./routes/NotFound";
import { Temp } from "./routes/Temp";
import { Footer } from "./components/Footer";

const App = () => {
  return (
    <div className="App">
      <h1>こうよう祭</h1>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/scan" element={ <Scan /> } />
        <Route path="/temp" element={ <Temp message="36.8" /> } />
        <Route path="*" element={ <NotFound /> } />
      </Routes>
      <Footer />
    </div>
  )
}

export default App;
