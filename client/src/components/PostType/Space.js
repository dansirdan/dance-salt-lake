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
                <Form.Control
                  required
                  hidden
                  name="UserId"
                  value={values.UserId}
                  type="number"
                  onChange={handleChange}
                />
                <Form.Group as={Col} md="6">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    required
                    name="name"
                    value={values.name}
                    placeholder="Name"
                    type="text"
                    isInvalid={!!errors.name}
                    onChange={handleChange}
                    isValid={touched.name && !errors.name}
                    onBlur={handleBlur}
                  />
                  {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    required
                    name="email"
                    value={values.email}
                    placeholder="Email Address"
                    type="text"
                    isInvalid={!!errors.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Rate</Form.Label>
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
                  {errors.rate && touched.rate && <div className="input-feedback">{errors.rate}</div>}
                </Form.Group>
              
                <Form.Group as={Col} md="2">
                  <Form.Label>Sq.ft.</Form.Label>
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
                  {errors.squareFootage && touched.squareFootage && <div className="input-feedback">{errors.squareFootage}</div>}
                </Form.Group>
            
                <Form.Group as={Col} md="2">
                  <Form.Label>Capacity</Form.Label>
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
                  {errors.numPeople && touched.numPeople && <div className="input-feedback">{errors.numPeople}</div>}
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    required
                    name="location.address"
                    value={values.address}
                    placeholder="Address"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.address}
                  />
                  {errors.address && touched.address && <div className="input-feedback">{errors.address}</div>}
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Control
                    required
                    name="location.city"
                    value={values.city}
                    placeholder="City"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.city}
                  />
                  {errors.city && touched.city && <div className="input-feedback">{errors.city}</div>}
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Control
                    required
                    name="location.state"
                    value={values.state}
                    placeholder="State"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.state}
                  />
                  {errors.city && touched.city && <div className="input-feedback">{errors.city}</div>}
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Control
                    required
                    name="location.zip"
                    value={values.zip}
                    placeholder="Zip"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.zip}
                  />
                  {errors.zip && touched.zip && <div className="input-feedback">{errors.zip}</div>}
                </Form.Group>

                <Form.Control
                  required
                  hidden
                  name="lat"
                  value={values.lat}
                  type="number"
                  onChange={handleChange}
                />

                <Form.Control
                  required
                  hidden
                  name="lng"
                  value={values.lon}
                  type="number"
                  onChange={handleChange}
                />

                <Form.Group as={Col} md="6">
                  <Form.Label>Image link</Form.Label>
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
                  {errors.img && touched.img && <div className="input-feedback">{errors.img}</div>}
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <Form.Label>Image link</Form.Label>
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
                  {errors.url && touched.url && <div className="input-feedback">{errors.url}</div>}
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    name="description"
                    value={values.description}
                    type="textarea"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.description}
                  />
                  {errors.description && touched.description && <div className="input-feedback">{errors.description}</div>}
                </Form.Group>

                <Button type="submit">Submit</Button>
              </Form>
            )}
        </Formik>
      )}
    </AuthConsumer>
  )
}

export default Space;