import React, { useState } from "react";
import { Form, Input, Dropdown } from "../Form";
import { Classes, Performances, Auditions, Rental } from "../PostType";

function Post(props) {

  // setup hook
  const [postType, setPostType] = useState();

  // handle change event
  function handleSelectChange(event) {
    // set value
    setPostType(event.target.value);
  }

  // conditional rendering
  function renderInputs() {
    switch (postType) {
      case "classes":
        return <Classes />;
        break;

      case "performances":
        return <Performances />;
        break;

      case "auditions":
        return <Auditions />;
        break;

      case "space":
        return <Rental />;
        break;
    }
  }

  return (
    // form with POST method and route adjusting to postType value
    <Form
      method="POST"
      action={"/api/" + postType}>

      <Input
        name="user-id"
        type="text"
        //value={props.user.id}
        hidden
      />

      <Dropdown
        id="post-type"
        onChange={handleSelectChange}
      >
        <option>New Post:</option>
        <option value="auditions">Auditions</option>
        <option value="classes">Classes</option>
        <option value="performances">Performances</option>
        <option value="space">Rental Space</option>
      </Dropdown>

      {renderInputs()}

    </ Form>
  )
}

export default Post