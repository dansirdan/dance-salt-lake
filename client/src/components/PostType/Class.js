import React, { Component } from "react";
import { Row, Col, Form, InputGroup, FormControl, Button } from "react-bootstrap";
import { AuthConsumer } from '../AuthContext';
import API from "../../utils/API";
import axios from "axios";

import { Formik } from "formik";
import * as yup from "yup";


function Class() {

  const schema = yup.object().shape({

    title: yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    instructorName: yup.string().required(),
    style: yup.string().required(),
    level: yup.string().required(),
    master: yup.boolean().required(),

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
    instructorName: "",
    style: "",
    level: "",
    master: false,

    date: "",
    startTime: "",
    endTime: "",

    location: {
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    lat: "",
    log: "",

    description: "",
    photoLink: "",
    url: ""
  }

  const handleQuery = (values, setValues) => {

    let location = Object.values(values.location)
    location = location.toString()
    location = location.split(" ").join("+")
    console.log(location);

    let cityLat, cityLng;
    let geoAddy = location
    const geoKey = "AIzaSyBwWAv336FT-ttOosMGCDcROKAsq_rhkbA"
    let geoQuery = `https://maps.googleapis.com/maps/api/geocode/json?address=${geoAddy}&key=${geoKey}`;

    axios.get(geoQuery)
      .then(response => {

        cityLat = parseFloat(response.data.results[0].geometry.location.lat);
        cityLng = parseFloat(response.data.results[0].geometry.location.lng);

        const payload = { ...values, lat: cityLat, lng: cityLng };

        setValues(payload);
        alert(JSON.stringify(payload, null, 2));
        API.newPost("classes", values)
      })
      .catch(err => {
        console.log(err);
      });
  }


  return (

    <AuthConsumer>
      {({ user }) => (

        <Formik
          validationSchema={schema}
          initialValues={initialValues}
          onSubmit={(values, { setSubmitting, setValues }) => {
            handleQuery(values, setValues);

            API.newPost("auditions", values)

            setTimeout(() => setSubmitting(false), 500)
          }}
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
                  <Form.Group as={Col} md="12">                    <InputGroup>
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

                  <Form.Group as={Col} md="6">
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
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md="6">
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
                </Form.Row>

                <Form.Row>
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
                        <InputGroup.Checkbox name="Master" label="Master Class" />
                      </InputGroup.Prepend>
                      <FormControl aria-label="Text input with checkbox" label="Master Class" />
                      {/* <Form.Text>Master Class</Form.Text> */}
                    </InputGroup>
                  </Form.Group>

                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md="4">                    <InputGroup>
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

                  <Form.Group as={Col} md="6">                    <InputGroup>
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
                  <Form.Group as={Col} md="12">                    <InputGroup>
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
                  <Form.Group as={Col} md="12">                    <InputGroup>
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
                  <Form.Group as={Col} md="12">                    <InputGroup>
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
      )}
    </AuthConsumer >
  )
}


export default Class;