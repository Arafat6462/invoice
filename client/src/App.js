import React from "react";
import Home from "./component/Page/Home/Home";
import Update from "./component/Page/Update/Update";
import Error from "./component/Page/Error";
import Header from "./component/Header/Header";
import Create from "./component/Page/Create/Create";
// "react-router-dom": "6",
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update/:id" element={<Update />} />
        <Route path="/create" element={<Create />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
