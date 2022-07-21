import React from "react";
import ReactDOM from "react-dom/client";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BucketList from "./routes/BucketList";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BucketList/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);