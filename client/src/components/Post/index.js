import React, { Component } from "react";
import { Dropdown } from "../Form";
import { Audition, Class, Performance, Space } from "../PostType"

class Post extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      postType: "",
    }
  }

  // handle change event
  handleSelectChange = (event) => {
    // set value
    event.preventDefault();
    this.setState({ postType: event.target.value })
  }

  handleClear = () => {
    this.setState({ postType: "" })
  }

  renderInputs = () => {
    switch (this.state.postType) {
      case "auditions":
        return <Audition user={this.props.user.id} clearPostType={this.handleClear} />;

      case "classes":
        return <Class user={this.props.user.id} clearPostType={this.handleClear} />;

      case "performances":
        return <Performance user={this.props.user.id} clearPostType={this.handleClear} />;

      case "space":
        return <Space user={this.props.user.id} clearPostType={this.handleClear} />;

      default:
        break
    }
  }

  render() {

    return (
      <>
        <Dropdown
          id="post-type"
          value={this.state.postType}
          onChange={this.handleSelectChange}
        >
          <option>New Post:</option>
          <option value="auditions">Auditions</option>
          <option value="classes">Classes</option>
          <option value="performances">Performances</option>
          <option value="space">Rental Space</option>
        </Dropdown>

        {this.renderInputs()}
      </>
    )
  }
}

export default Post;