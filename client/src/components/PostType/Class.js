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
    master: yup.boolean().required(),
    instructorName: yup.string().required(),

    startTime: yup.string().required(),
    endTime: yup.string().required(),
    
    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),

    numberOf: yup.string().required(),
    lookingFor: yup.string().required(),
    length: yup.string().required(),
    contract: yup.string().required(),

    description: yup.string().required(),
    photoLink: yup.string().required(),
    url: yup.string().required(),

  });

  const initialValues = {
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    numberOf: "",
    lookingFor: "",
    length: "",
    contract: "",
    description: "",
    img: "",
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
                  <Form.Control.Feedback>{errors.state}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="8" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Looking For:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <Form.Control
                      required
                      name="numberOf"
                      value={values.number}
                      placeholder="Number of:"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.numberOf}
                    />
                    <Form.Control.Feedback>{errors.numberOf}</Form.Control.Feedback>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <Form.Control
                      as="select"
                      required
                      name="lookingFor"
                      value={values.lookingFor}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.lookingFor}
                    >
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Both">Both</option>
                      <option value="Any">Any</option>
                    </Form.Control>
                    <Form.Control.Feedback>{errors.lookingFor}</Form.Control.Feedback>
                  </InputGroup.Prepend>
                </InputGroup>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md="8" controlId="">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Contract Length:</InputGroup.Text>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <Form.Control
                      required
                      name="length"
                      value={values.number}
                      placeholder="Duration"
                      type="number"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.length}
                    />
                    <Form.Control.Feedback>{errors.length}</Form.Control.Feedback>
                  </InputGroup.Prepend>
                  <InputGroup.Prepend>
                    <Form.Control
                      as="select"
                      required
                      name="contract"
                      value={values.contract}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.contract}
                    >
                      <option value="Month Contract">Month Contract</option>
                      <option value="Year Contract">Year Contract</option>
                    </Form.Control>
                    <Form.Control.Feedback>{errors.contract}</Form.Control.Feedback>
                  </InputGroup.Prepend>
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
                    name="img"
                    value={values.img}
                    placeholder="Image Link"
                    type="text"
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
                    type="text"
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