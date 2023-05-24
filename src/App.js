import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";

const App = () => {
  return (
    <div className="App">
      <h1>こうよう祭</h1>
      <Routes>
        <Route path="/" element={ <Home /> } />
      </Routes>
    </div>
  )
}

export default App;
