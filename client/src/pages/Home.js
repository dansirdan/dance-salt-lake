import React from "react";
import Jumbotron from "../components/Jumbotron"
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="container">
      <Jumbotron>
        <h1 className="display-4">Hello, world!</h1>
        <p className="lead">This is a React-App with Authentication</p>
        <hr className="my-4" />
        <p>It uses passport, sessions, and bcrypt along with sequelize, mysql, node, and other npm packages.</p>
        <p className="lead">
          <Link className="btn btn-primary btn-lg" to="/register" role="button">
            Register
          </Link>
        </p>
      </Jumbotron>
    </div>
  )
}

export default Home;
