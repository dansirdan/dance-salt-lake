import React from "react";
import "./style.css"

export function Jumbotron({ children }) {
  return (
    <div
      style={{ clear: "both", marginTop: 100, textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export function Section({ children }) {
  return (
    <section className="calendar-container">
      {children}
    </section>
  );
}


