import React from "react";
import "./style.css";
// import sample from "./Regular_Speed.mp4";

function Hero(props) {

  return (
    // setting up header component for css
    <header>
      <div className="hero">
        {/* overlay to control brightness */}
        <div className="overlay"></div>
        {/* notice the camelCase for the video controls */}
        <video className="./Regular_Speed.mp4" playsInline autoPlay loop muted>
          {/* src could be {sample} as well */}
          <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
        </video>
      </div>
    </header>
  )
}

export default Hero;