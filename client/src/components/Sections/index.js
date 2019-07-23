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

export function Section({ children, className }) {
  return (
    <section className="container">
      <div className={className}>
       {children}

      </div>
    </section>
  );
}

export function Banner({ children, className }) {
  return ( 
    <div className="banner">
      <div className={className}>
        {children}
      </div>
    </div>
  )
}
