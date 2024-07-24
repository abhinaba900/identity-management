import React from "react";
import "../../css/Loading.css";

function Loading() {
  return (
    <div className="wrapper">
      <div className="container-loading">
        <h1 className="loading-text">Please Wait</h1>
        <div className="loading-wrapper">
          <div className="loader"></div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
