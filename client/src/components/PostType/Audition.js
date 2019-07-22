import React from "react";
import { Form, Col, InputGroup, Button } from "react-bootstrap";
import { AuthConsumer } from '../AuthContext';
import API from "../../utils/API";
import axios from "axios";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";


function Audition() {

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
      .required('Required'),
    endTime: yup.string()
      .required('Required'),

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

    numberOf: yup.number()
      .min(1, "Must be more than 0")
      .required('Required'),
    lookingFor: yup.string()
      .required('Required'),

    length: yup.number()
      .min(1, "Must be more than 0")
      .required('Required'),
    contract: yup.string()
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

    UserId: "1",
    title: "Audition",
    date: "",
    startTime: "15:00",
    endTime: "16:00",

    address: "519 E 4th Ave",
    city: "Salt Lake City",
    state: "Utah",
    zip: "84103",

    lat: "",
    lng: "",

    numberOf: "",
    lookingFor: "",

    length: "6",
    contract: "Month Contract",

    description: "asdf",
    photoLink: "http://lorempixel.com/640/480",
    url: "http://asdf.com"
  }

  const handleQuery = (values, setValues) => {

    let location = (({ address, city, state, zip }) => ({ address, city, state, zip }))(values);
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

        setValues(payload)
        API.newPost("auditions", payload);
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
              console.log("reset");

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
                    type="date"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.date}
                    isValid={touched.date && !errors.date}
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
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    required
                    name="endTime"
                    value={values.endTime}
                    placeholder="End Time"
                    type="time"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.endTime}
                    isValid={touched.endTime && !errors.endTime}
                  />
                  {errors.endTime && touched.endTime && <div className="input-feedback">{errors.endTime}</div>}
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
                    placeholder="City"
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
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                  <Form.Label>Looking For:</Form.Label>
                  <InputGroup>
                    <Form.Control
                      required
                      name="numberOf"
                      value={values.number}
                      placeholder="Number of"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.numberOf}
                      isValid={touched.numberOf && !errors.numberOf}
                    />

                    <InputGroup.Prepend>
                      <Form.Control
                        as="select"
                        required
                        name="lookingFor"
                        value={values.lookingFor}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.lookingFor}
                        isValid={touched.lookingFor && !errors.lookingFor}
                      >
                        <option>Gender</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Men and Women">Men and Women</option>
                        <option value="Any">Any</option>
                      </Form.Control>
                    </InputGroup.Prepend>
                  </InputGroup>
                  {errors.numberOf && touched.numberOf && <div className="input-feedback">{errors.numberOf}</div>}
                  {errors.lookingFor && touched.lookingFor && <div className="input-feedback">{errors.lookingFor}</div>}
                </Form.Group >

                <Form.Group as={Col} md="12">
                  <Form.Label>Contract:</Form.Label>
                  <InputGroup>
                    <Form.Control
                      required
                      name="length"
                      value={values.number}
                      placeholder="Length"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.length}
                      isValid={touched.length && !errors.length}
                    />
                    <InputGroup.Prepend>
                      <Form.Control
                        as="select"
                        required
                        name="contract"
                        value={values.contract}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.contract}
                        isValid={touched.contract && !errors.contract}
                      >
                        <option>Contract Type:</option>
                        <option value="Month Contract">Month Contract</option>
                        <option value="Year Contract">Year Contract</option>
                      </Form.Control>
                    </InputGroup.Prepend>
                  </InputGroup>
                    {errors.length && touched.length && <div className="input-feedback">{errors.length}</div>}
                      {errors.contract && touched.contract && <div className="input-feedback">{errors.contract}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
                  <Form.Label>Image link</Form.Label>
                  <Form.Control
                    required
                    name="photoLink"
                    value={values.photoLink}
                    placeholder="https://www.example.com"
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
                    placeholder="https://www.example.com"
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
    </AuthConsumer >
  )
}

export default Audition;