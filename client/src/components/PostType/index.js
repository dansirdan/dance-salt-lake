import React from "react";
import { Input, TextArea, Dropdown } from "../Form";

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
        placeholder="Instructor photo link"
      />
      <Input
        name="style"
        type="text"
        placeholder="Dance Style"
      />
      <Input
        name="class-length"
        type="time"
        placeholder="Class Duration"
      />
      <Input
        name="payment-method"
        type="text"
        placeholder="Payment Method"
      />
      <Dropdown name="level">
        <option>Level</option>
        <option value="beginner">beginner</option>
        <option value="intermediate">intermediate</option>
        <option value="advanced">Advanced</option>
        <option value="all-levels">All Levels</option>
      </Dropdown>
    </>
  )
}

export function Performances() {
  return (
    <>
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
    </>
  )
}

export function Auditions() {
  return (
    <>
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
    </>
  )
}

export function Rental() {
  return (
    <>
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
    </>
  )
}
