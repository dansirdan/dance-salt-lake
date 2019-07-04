import React from "react";
// import Jumbotron from "../components/Jumbotron"
// import { Link } from "react-router-dom";
import Post from "../components/Post"
import Hero from "../components/Hero";

function Home() {
  return (
    <div className="container">
      <Hero />
      <Post />
    </div>
  )
}

export default Home;
