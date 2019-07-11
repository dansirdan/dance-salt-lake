import React from "react";
import { Jumbotron } from "../components/Sections";

function NoMatch() {
  return (
    <div className="container">
      <Jumbotron>
        <h1>404 Page Not Found</h1>
        <h1>
          <span role="img" aria-label="Face With Rolling Eyes Emoji">
            🙄
        </span>
        </h1>
      </Jumbotron>
    </div>
  );
}

export default NoMatch;
