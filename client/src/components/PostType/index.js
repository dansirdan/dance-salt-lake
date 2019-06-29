import React from "react";
import { Input, TextArea, Dropdown } from "../Form";

// Function for class inputs
export function Classes() {
  return (
    <>
      <Input
        name="instructor"
        type="text"
        placeholder="Instructor"
      />
      <Input
        name="instructor-image"
        type="text"
        placeholder="Image link"
      />
      <Input
        name="style"
        type="text"
        placeholder="Dance Style"
      />
      <Dropdown name="level">
        <option>Level</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
        <option value="all-levels">All Levels</option>
      </Dropdown>
      <Input
        name="class-length"
        type="text"
        placeholder="Class Duration"
      />
      {dateTimeLocation()}
      <Input
        name="payment-method"
        type="text"
        placeholder="Payment Method"
      />
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
        name="performance-image"
        type="text"
        placeholder="Image Link"
      />
      <TextArea
        name="performance-notes"
        type="text"
        placeholder="Notes:"
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
      <Input
        name="openings"
        type="number"
        placeholder="Number of Openings"
      />
      <Dropdown>
        <option>Gig Type</option>
        <option value="contract">Contract</option>
        <option value="project">Project Based</option>
        <option value="fulltime">Fulltime</option>
      </Dropdown>

      <TextArea
        name="audtion-notes"
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
        name="location"
        type="text"
        placeholder="Location"
      />
      <Input
        name="sqfootage"
        type="number"
        placeholder="Square Footage"
      />
      <Input
        name="rate"
        type="number"
        placeholder="Price"
      />
      <Input
        name="link"
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
        placeholder="Webpage Link"
      />
    </>
  )
}
