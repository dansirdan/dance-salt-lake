import React from "react";

function Calendar({ children }) {
  return (
    <div
      style={{ clear: "both", marginTop: 50, textAlign: "center" }}
      className="jumbotron"
    >
      {children}
    </div>
  );
}

export default Calendar;
