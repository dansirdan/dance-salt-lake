import React, { Component } from "react";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap"
import API from "../../utils/API";
import axios from "axios";

import { Formik } from "formik";
import * as yup from "yup";


function Class() {

  const schema = yup.object().shape({

    title: yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    style: yup.string().required(),
    level: yup.string().required(),
    master: yup.boolean().required(),
    instructorName: yup.string().required(),

    date: yup.string().required(),
    startTime: yup.string().required(),
    endTime: yup.string().required(),

    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),

    description: yup.string().required(),
    photoLink: yup.string().required(),
    url: yup.string().required(),

  });

  const initialValues = {

    UserId: "",
    title: "",
    style: "",
    level: "",
    master: false,
    instructorName: "",

    date: "",
    startTime: "",
    endTime: "",

    address: "",
    city: "",
    state: "",
    zip: "",
    lat: "",
    log: "",

    description: "",
    photoLink: "",
    url: ""
  }


  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={console.log}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        isValid,
        errors,
      }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="8" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Title</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    name="title"
                    value={values.title}
                    placeholder="Title"
                    type="text"
                    isInvalid={!!errors.title}
                    onChange={handleChange}
                  ///* onBlur={handleBlur} */}
                  />
                  {errors.title && touched.title ? (<Form.Control.Feedback>{errors.title}</Form.Control.Feedback>) : null}
                </InputGroup>

              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Style</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    name="style"
                    value={values.style}
                    placeholder="Style"
                    type="text"
                    isInvalid={!!errors.style}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Level</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control as="select"
                    required
                    name="level"
                    isInvalid={!!errors.level}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Andvanced">Andvanced</option>
                    <option value="Any">Any</option>
                  </Form.Control>
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Instructor</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    name="instructorName"
                    value={values.instructorName}
                    placeholder="Name"
                    type="text"
                    isInvalid={!!errors.instructorName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </InputGroup>
              </Form.Group>

              <Form.Group>
                <Form.Check type="checkbox" label="Master Class" />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="4" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Date</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    name="date"
                    value={values.date}
                    placeholder="Date"
                    type="date"
                    isInvalid={!!errors.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <Form.Control.Feedback>{errors.date}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Time</InputGroup.Text>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <Form.Control
                      required
                      name="startTime"
                      value={values.startTime}
                      placeholder="Start Time"
                      type="time"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.startTime}
                    />
                    <Form.Control.Feedback>{errors.startTime}</Form.Control.Feedback>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    name="endTime"
                    value={values.endTime}
                    placeholder="End Time"
                    type="time"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.endTime}
                  />
                  <Form.Control.Feedback>{errors.endTime}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="8" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Address</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    name="address"
                    value={values.address}
                    placeholder="Address"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback>{errors.address}</Form.Control.Feedback>

                  <Form.Control
                    required
                    name="city"
                    value={values.city}
                    placeholder="City"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.city}
                  />
                  <Form.Control.Feedback>{errors.city}</Form.Control.Feedback>

                  <Form.Control
                    required
                    name="state"
                    value={values.state}
                    placeholder="State"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.state}
                    default="Utah"
                  />

                  <Form.Control
                    required
                    name="zip"
                    value={values.zip}
                    placeholder="Zip"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.zip}
                  />
                  <Form.Control.Feedback>{errors.zip}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="8" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Description</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    name="description"
                    value={values.description}
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.description}
                  />
                  <Form.Control.Feedback>{errors.description}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="8" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Links</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    name="photoLink"
                    value={values.img}
                    placeholder="Photo Link"
                    type="url"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.img}
                  />
                  <Form.Control.Feedback>{errors.img}</Form.Control.Feedback>

                  <Form.Control
                    required
                    name="url"
                    value={values.url}
                    placeholder="Website URL"
                    type="url"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.url}
                  />
                  <Form.Control.Feedback>{errors.url}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Button type="submit">Submit</Button>
          </Form>
        )}
    </Formik>
  )
}

export default Class;