import React from "react";
import "./spinner.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="loading-text">Fetching questions</div>
      <div className="loading-spinner"></div>
    </div>
  );
}