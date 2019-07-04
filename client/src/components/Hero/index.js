import React from "react";
import "./style.css";
// import sample from "./Regular_Speed.mp4";

function Hero(props) {

  return (
    <header>
      <div className="overlay"></div>
      <video className="./Regular_Speed.mp4" playsInline autoPlay loop muted>
        <source src="https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4" type="video/mp4" />
      </video>
    </header>
  )
}

export default Hero;