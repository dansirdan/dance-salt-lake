import React, { Component } from "react";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
import { AuthConsumer } from '../AuthContext';
import API from "../../utils/API";
import axios from "axios";

import { Formik } from "formik";
import * as yup from "yup";


function Performance() {

  const schema = yup.object().shape({

    title: yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    date: yup.date().required(),
    startTime: yup.string().required(),
    length: yup.string().required(),

    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),

    price: yup.string().required(),
    payment: yup.string().required(),
    special: yup.string().required(),

    description: yup.string().required(),
    img: yup.string().required(),
    url: yup.string().required(),

  });

  const initialValues = {
    title: "",
    date: "",
    startTime: "",
    length: "",

    location: {
      address: "",
      city: "",
      state: "",
      zip: "",
    },
    lat: "",
    lon: "",

    price: "",
    payment: "",

    description: "",
    img: "",
    url: ""
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
            API.newPost("performances", values);
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
                  <Form.Label>Post Title</Form.Label>
                  <Form.Control
                    required
                    name="title"
                    value={values.title}
                    placeholder="Title"
                    type="text"
                    isInvalid={!!errors.title}
                    onChange={handleChange}
                    isValid={touched.title && !errors.title}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Date</Form.Label>
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
                  {errors.date && touched.date && <div className="input-feedback">{errors.date}</div>}
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Start Time</Form.Label>
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
                  {errors.startTime && touched.startTime && <div className="input-feedback">{errors.startTime}</div>}
                </Form.Group>

                <Form.Group as={Col} md="2">
                  <Form.Label>Length</Form.Label>
                  <Form.Control
                    required
                    name="length"
                    value={values.length}
                    placeholder="Length in minutes"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.length}
                  />
                  {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
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
                  <Form.Label>Price:</Form.Label>
                  <Form.Control
                    required
                    name="price"
                    value={values.price}
                    placeholder="Price"
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.price}
                  />
                  {errors.price && touched.price && <div className="input-feedback">{errors.price}</div>}
                </Form.Group>

                <Form.Group as={Col} md="6">
                  <Form.Label>Payment:</Form.Label>
                  <InputGroup.Checkbox name="payment" label="Cash" />
                  <InputGroup.Checkbox name="payment" label="Card" />
                  <InputGroup.Checkbox name="payment" label="Any" />
                </Form.Group>

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
                  {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
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
                  {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
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
                  {errors.title && touched.title && <div className="input-feedback">{errors.description}</div>}
                </Form.Group>

                <Button type="submit">Submit</Button>
              </Form>
            )}
        </Formik>
      )}
    </AuthConsumer>
  )
}

export default Performance;