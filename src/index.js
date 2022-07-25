import React from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BucketList from "./routes/BucketList";
import Login from "./routes/Login";
import BucketObjectList from "./routes/BucketObjectList";
import TimeAgo from "javascript-time-ago";

// English.
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);

// Create formatter (English).
const timeAgo = new TimeAgo("en-US");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BucketList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/bucket">
          <Route path=":bucketName" element={<BucketObjectList timeAgo={timeAgo}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
