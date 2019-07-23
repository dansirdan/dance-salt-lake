import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import { AuthConsumer } from '../AuthContext';
import API from "../../utils/API";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";

function Space(props) {

  const schema = yup.object().shape({

    name: yup.string()
      .min(2, 'Too Short')
      .max(50, 'Too Long')
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
      .min(2, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    city: yup.string()
      .min(2, 'Too Short')
      .max(20, 'Too Long')
      .required('Required'),
    state: yup.string()
      .min(2, 'Too Short')
      .max(15, 'Too Long')
      .required('Required'),
    zip: yup.string()
      .length(5, "must be a valid zipcode")
      .matches(/^[0-9]*$/, "must be a valid zipcode")
      .required('Required'),

    description: yup.string()
      .min(3, "Too Short")
      .max(255, "That's a bit much...")
      .required("Required"),
    photoLink: yup.string()
      .url("valid url required")
      .required('Required'),
    url: yup.string()
      .url("valid url required")
      .required('Required'),

  });

  const initialValues = {

    UserId: props.user,
    name: "",
    email: "",
    rate: "",

    squareFootage: "",
    numPeople: "",

    address: "",
    city: "",
    state: "",
    zip: "",

    lat: "",
    lng: "",

    description: "",
    photoLink: "",
    url: ""
  }

  const handleQuery = (values, setValues, cb) => {

    let location = (({ address, city, state, zip }) => ({ address, city, state, zip }))(values);
    location = Object.values(location);
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

        API.newPost("space", payload)
          .then(res => {
            console.log(res.data);
            cb();
          })
          .catch(err => console.log(err));
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
          onSubmit={(values, { setSubmitting, setValues, resetForm }) => {
            handleQuery(values, setValues, () => {
              setTimeout(() => {
                resetForm(initialValues)
                props.clearPostType();
                setSubmitting(false);
              }, 500)
            });

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
                    isValid={touched.name && !errors.name}
                    onChange={handleChange}
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
                    isValid={touched.email && !errors.email}
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
                    isValid={touched.rate && !errors.rate}
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
                    isValid={touched.squareFootage && !errors.squareFootage}
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
                    isValid={touched.numPeople && !errors.numPeople}
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
                    isValid={touched.address && !errors.address}
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
                    isValid={touched.city && !errors.city}
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
                    isValid={touched.state && !errors.state}
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
                    isValid={touched.zip && !errors.zip}
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
                    isValid={touched.photoLink && !errors.photoLink}
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
                    isValid={touched.url && !errors.url}
                  />
                  {errors.url && touched.url && <div className="input-feedback">{errors.url}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    required
                    name="description"
                    value={values.description}
                    as="textarea"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.description}
                    isValid={touched.description && !errors.description}
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