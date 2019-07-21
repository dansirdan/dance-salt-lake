import React from "react";
import { Col, Form, Button } from "react-bootstrap";
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
    email: yup.string()
      .required("Required"),
    rate: yup.number()
      .required("Required"),

    squareFootage: yup.number()
      .required("Required"),
    numPeople: yup.number()
      .required("Required"),

    address: yup.string()
      .required("Required"),
    city: yup.string()
      .required("Required"),
    state: yup.string()
      .required("Required"),
    zip: yup.number()
      .min(8, "valid zipcode required")
      .required('Required'),

    description: yup.string()
      .min(3, "Too Short")
      .max(255, "That's a bit much...")
      .required("Required"),
    photoLInk: yup.string()
      .url("valid url required")
      .required('Required'),
    url: yup.string()
      .url("valid url required")
      .required('Required'),

  });

  const initialValues = {
    
    UserId: "1",
    name: "jess",
    email: "a@gmail.com",
    rate: "400",

    squareFootage: "600",
    numPeople: "4",

    address: "519 E 4th Ave",
    city: "Salt Lake City",
    state: "Utah",
    zip: "84103",

    lat: "",
    lng: "",

    description: "asdf",
    photoLink: "http://asdf.com",
    url: "http://asdf.com"
  }

  const handleQuery = (values, setValues) => {

    let location = (({ address, city, state, zip }) => ({ address, city, state, zip }))(values);
    location = Object.values(location);
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
        // alert(JSON.stringify(payload, null, 2));
        console.log(JSON.stringify(payload, null, 2));
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
            console.log("onSubmit");
            
            handleQuery(values, setValues);
            setTimeout(() => {
              API.newPost("space", values)
              setSubmitting(false)
            }, 500);
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
                <Form.Group as={Col} md="12">
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

                <Form.Group as={Col} md="12">
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

                <Form.Group as={Col} md="12">
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
              
                <Form.Group as={Col} md="12">
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
            
                <Form.Group as={Col} md="12">
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

                <Form.Group as={Col} md="12">
                  <Form.Label>Address</Form.Label>
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
                  {errors.address && touched.address && <div className="input-feedback">{errors.address}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
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
                  {errors.city && touched.city && <div className="input-feedback">{errors.city}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
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
                  {errors.state && touched.state && <div className="input-feedback">{errors.state}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
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

                <Form.Group as={Col} md="12">
                  <Form.Label>Image link</Form.Label>
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
                  {errors.photoLink && touched.photoLink && <div className="input-feedback">{errors.photoLink}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
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

                <Form.Group as={Col} md="12">
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