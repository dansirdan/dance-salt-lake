import React, { Component } from "react";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { AuthConsumer } from '../AuthContext';
import API from "../../utils/API";
import axios from "axios";

import { Formik } from "formik";
import * as yup from "yup";


function Space() {

  const schema = yup.object().shape({

    name: yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: yup.string().required(),
    rate: yup.date().required(),

    squareFootage: yup.date().required(),
    numPeople: yup.date().required(),

    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),

    photoLink: yup.string().required(),
    description: yup.string().required(),
    url: yup.string().required(),

  });

  const initialValues = {
    name: "",
    email: "",
    rate: "",

    squareFootage: "",
    numPeople: "",

    location: {
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    lat: "",
    lon: "",

    photoLink: "",
    description: "",
    url: "",
  }

  const handleQuery = (values, setValues) => {

    let location = Object.values(values.location)
    location = location.toString()
    location = location.split(" ").join("+")

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
            API.newPost("auditions", values);
            setTimeout(() => setSubmitting(false), 500);
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

                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Name</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        required
                        name="name"
                        value={values.name}
                        placeholder="Name"
                        type="text"
                        isInvalid={!!errors.name}
                        onChange={handleChange}
                      ///* onBlur={handleBlur} */}
                      />
                      {errors.name && touched.name ? (<Form.Control.Feedback>{errors.name}</Form.Control.Feedback>) : null}
                    </InputGroup>
                  </Form.Group>
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Email</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        required
                        name="email"
                        value={values.email}
                        placeholder="Email Address"
                        type="text"
                        isInvalid={!!errors.email}
                        onChange={handleChange}
                      ///* onBlur={handleBlur} */}
                      />
                      {errors.name && touched.name ? (<Form.Control.Feedback>{errors.name}</Form.Control.Feedback>) : null}
                    </InputGroup>
                  </Form.Group>

                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md="2">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        required
                        name="rate"
                        value={values.rate}
                        placeholder="Rate"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.rate}
                      />
                      <Form.Control.Feedback>{errors.rate}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} md="4">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Sq. ft.</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        required
                        name="squareFootage"
                        value={values.squareFootage}
                        placeholder="Square Footage"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.squareFootage}
                      />
                      <Form.Control.Feedback>{errors.squareFootage}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} >
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Capacity</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        required
                        name="numPeople"
                        value={values.numPeople}
                        placeholder="Maximum Capacity Allowed"
                        type="number"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.numPeople}
                      />
                      <Form.Control.Feedback>{errors.numPeople}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col}>
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
                  <Form.Group as={Col}>
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
                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Links</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        required
                        name="photoLink"
                        value={values.photoLink}
                        placeholder="Image Link"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.photoLink}
                      />
                      <Form.Control.Feedback>{errors.photoLink}</Form.Control.Feedback>

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
      )}
    </AuthConsumer>
  )
}

export default Space;