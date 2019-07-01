import React, { Component } from "react";
import API from "../../utils/API"

/**
* This is an example of how we might organize how data is returned to our tables.
*
* "this.state.postType" would be set depending on the link clicked by the user.
*
* The API.getPosts method is passed the postType which specifies the route it will use 
      * like this:
      *
      *    getPosts: function(postType) {
      *      return axios.get("/api/" + postType)
      *    }
      *
*/

class Results extends Component {

  state = {
    postType: "performances",
    results: []
  }

  componentDidMount() {
    API.getPosts(this.state.postType)
      .then(res => this.setState({ results: res.data }))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div>
        <h1>These are results</h1>
        {this.state.results.map(item => (
          <p>{item.title}</p>
        ))}
      </div>
    )
  }
}

export default Results;