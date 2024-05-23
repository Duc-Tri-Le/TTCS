import React from "react";
import Sidebar from "../StackOverFlow/Sidebar";
import "./index.css";
import MainQuestion from "./MainQuestion.js";

function Index() {
  return (
    <div className="stack-index">
      <div className="stack-index-content">
        <Sidebar />
        <MainQuestion />
      </div>
    </div>
  );
}

export default Index;