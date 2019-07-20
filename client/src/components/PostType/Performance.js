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
                <Form.Row>
                  <Form.Group as={Col} md="12">
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
                  <Form.Group as={Col} md="4">
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

                  <Form.Group as={Col}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Start Time</InputGroup.Text>
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
                        name="length"
                        value={values.length}
                        placeholder="Length"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.length}
                      />
                      <Form.Control.Feedback>{errors.length}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md="12">
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
                  <Form.Group as={Col} md="3">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>$</InputGroup.Text>
                      </InputGroup.Prepend>
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
                      <Form.Control.Feedback>{errors.numberOf}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} md="5">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Payment Method</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        as="select"
                        required
                        name="payment"
                        value={values.payment}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.payment}
                      >
                        <option value="Cash">Cash Only</option>
                        <option value="Card">Card</option>
                        <option value="Any">Any</option>
                      </Form.Control>

                      <Form.Control.Feedback>{errors.lookingFor}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>

                </Form.Row>

                <Form.Row>
                  <Form.Group as={Col} md="12">
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
                  <Form.Group as={Col} md="12">
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
      )}
    </AuthConsumer>
  )
}

export default Performance;