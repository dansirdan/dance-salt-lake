import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import { AuthConsumer } from '../AuthContext';
import API from "../../utils/API";
import axios from "axios";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";

function Performance(props) {

  const today = moment().format("L");

  const schema = yup.object().shape({

    title: yup.string()
      .min(2, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    date: yup.date()
      .min(today)
      .required('Required'),
    startTime: yup.string()
      .required("Required"),
    length: yup.string()
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

    price: yup.number()
      .required("Required"),
    payment: yup.string(),
    
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

    UserId: "1",
    title: "performance",
    date: "2019-07-13",
    startTime: "15:00",
    length: "90",

    address: "519 E 4th Ave",
    city: "Salt Lake City",
    state: "Utah",
    zip: "84103",

    lat: "",
    lng: "",

    price: "90",
    payment: "",

    description: "asdf",
    photoLink: "http://lorempixel.com/640/480",
    url: "http://asdf.com"
  }

  const handleQuery = (values, setValues) => {

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

        API.newPost("performances", payload);
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
            handleQuery(values, setValues);
            setTimeout(() => {
              resetForm(initialValues)
              props.clearPostType();
              setSubmitting(false);
            }, 500)
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
                  value={user.id}
                  type="number"
                  onChange={handleChange}
                />
                <Form.Group as={Col} md="12">
                  <Form.Label>Post Title</Form.Label>
                  <Form.Control
                    required
                    name="title"
                    value={values.title}
                    placeholder="Title"
                    type="text"
                    isInvalid={!!errors.title}
                    isValid={touched.title && !errors.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    required
                    name="date"
                    value={values.date}
                    placeholder={today}
                    type="date"
                    isInvalid={!!errors.date}
                    isValid={touched.date && !errors.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.date && touched.date && <div className="input-feedback">{errors.date}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
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
                    isValid={touched.startTime && !errors.startTime}
                  />
                  {errors.startTime && touched.startTime && <div className="input-feedback">{errors.startTime}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
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
                    isValid={touched.length && !errors.length}
                  />
                  {errors.length && touched.length && <div className="input-feedback">{errors.length}</div>}
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
                  {errors.city && touched.city && <div className="input-feedback">{errors.city}</div>}
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
                    isValid={touched.price && !errors.price}
                  />
                  {errors.price && touched.price && <div className="input-feedback">{errors.price}</div>}
                </Form.Group>
                
                <Form.Group as={Col} md="12">
                  <Form.Label className="mr-3">Payment:</Form.Label>
                  <Form.Check
                    inline
                    name="payment"
                    value="Cash"
                    label="Cash"
                    onChange={handleChange}
                  />
                  <Form.Check
                    inline
                    name="payment"
                    value="Card"
                    label="Card"
                    onChange={handleChange}
                  />
                  <Form.Check
                    inline
                    default
                    name="payment"
                    value="Any"
                    label="Any"
                    onChange={handleChange}
                  />
                </Form.Group>

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
                    type="textarea"
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

export default Performance;