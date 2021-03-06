import React from "react";
import { Input, TextArea, Checkbox, Dropdown } from "../Form";

// Function for class inputs
export function Classes() {
  return (
    <>
      {dateTimeLocation()}
      <Input
        name="instructorName"
        type="text"
        placeholder="Instructor"
      />
      <Input
        name="style"
        type="text"
        placeholder="Dance Style"
      />
      <Checkbox
        name="master"
        lable="Master Class"
      />
      <Dropdown name="level">
        <option>Level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
        <option value="all-levels">All Levels</option>
      </Dropdown>

      <Input
        type="submit"
        value="Submit"
        className="btn"
      />
    </>
  )
}

// Function for performance inputs
export function Performances() {
  return (
    <>
      {dateTimeLocation()}
      <Input
        name="price"
        type="number"
        placeholder="Ticket Price"
      />
      <Input
        name="special"
        type="text"
        placeholder="Special"
      />
      <Input
        type="submit"
        value="Submit"
        className="btn"
      />
    </>
  )
}

// Function for audition inputs
export function Auditions() {
  return (
    <>
      {dateTimeLocation()}
      <Dropdown name="lookingFor">
        <option>Gender</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
        <option value="both">Men and Women</option>
        <option value="other">Other</option>
      </Dropdown>
      <Input
        name="length"
        type="number"
        placeholder="Duration of Contract"
      />
      <Dropdown name="gig">
        <option>Gig Type</option>
        <option value="month">Month/s</option>
        <option value="year">Year/s</option>
      </Dropdown>
      <TextArea
        name="audtioNotes"
        type="text"
        placeholder="Notes"
      />
      <Input
        type="submit"
        value="Submit"
        className="btn"
      />
    </>
  )
}

// Function for rental space inputs
export function Rental() {
  return (
    <>
      <Input
        name="name"
        type="text"
        placeholder="Name"
      />
      <Input
        name="location"
        type="text"
        placeholder="Location"
      />
      <Input
        name="squareFootage"
        type="number"
        placeholder="Square Footage"
      />
      <Input
        name="rate"
        type="number"
        placeholder="Price"
      />
      <Input
        name="number_of_people"
        type="num"
        placeholder="Number of People"
      />
      <Input
        name="url"
        type="text"
        placeholder="Webpage Link"
      />
      <Input
        type="submit"
        value="Submit"
        className="btn"
      />
    </>
  )
}

// funciton for repetitive post data
function dateTimeLocation() {
  return (
    <>
      <Input
        name="title"
        type="text"
        placeholder="Title"
      />
      <TextArea
        name="description"
        type="text"
        placeholder="Description"
      />
      <Input
        name="photoLink"
        type="text"
        placeholder="Image link"
      />
      <Input
        name="date"
        type="date"
        defaultValue="2019-07-01" //remove after testing
      />
      <Input
        name="time"
        type="time"
      />
      <Input
        name="payment"
        type="text"
        placeholder="Payment Method"
      />
      <Input
        name="address"
        type="text"
        placeholder="Address"
      />
      <Input
        name="url"
        type="text"
        placeholder="Webpage Link"
      />
    </>
  )
}
