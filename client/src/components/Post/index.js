import React, { useState } from "react";
import { Form, Input, TextArea, Dropdown } from "../Form";
import { Classes, Performances, Auditions, Rental } from "../PostType";

function Post(props) {

  // expected from props:
  // post route
  // user info foriegn key

  const [postType, setPostType] = useState();
  const postTypeInputs;

  switch(postType) {
    case "classes":
      return postTypeInputs = <Classes />;
      break;

    case "performances":
      return postTypeInputs = <Performances />;
      break;

    case "auditions":
      return postTypeInputs = <Auditions />;
      break;

    case "rental":
      return postTypeInputs = <Rental />;
      break;
  }

  return (
    <Form action={props.route}>

      <Dropdown name="post-type">
        <option>New Post:</option>
        <option value="classes">Classes</option>
        <option value="performances">Performances</option>
        <option value="auditions">Auditions</option>
        <option value="rental">Rental Space</option>
      </Dropdown>

      <Input
        name="date"
        type="date"
      />
      <Input
        name="time"
        type="time"
      />
      <Input
        name="location"
        type="text"
        placeholder="Location"
      />
      <Input
        name="link"
        type="text"
        placeholder="Website Link"
      />

      {postTypeInputs}

      <Input 
        type="submit"
        value="Submit"
        className="btn"
      />

    </Form>
  )
}

export default Post