import React from "react";
import { Col, Form, Button } from "react-bootstrap";
import { AuthConsumer } from '../AuthContext';
import API from "../../utils/API";
import axios from "axios";
import moment from "moment";
import { Formik } from "formik";
import * as yup from "yup";

function Class() {

  const today = moment().format("L");

  const schema = yup.object().shape({

    title: yup.string()
      .min(2, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    instructorName: yup.string()
      .min(2, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    style: yup.string()
      .required('Required'),
    level: yup.string()
      .required('Required'),
    master: yup.boolean()
      .required('Required'),

    date: yup.date()
      .min(today)
      .required('Required'),
    startTime: yup.string()
      .required('Required'),
    endTime: yup.string()
      .required('Required'),

    payment: yup.string()
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

    UserId: "1",
    title: "class",
    instructorName: "Fancy Nancy",
    style: "Disco",
    level: "Advanced",
    master: false,

    // payment: [],

    date: "",
    startTime: "15:00",
    endTime: "16:00",

    address: "519 E 4th Ave",
    city: "Salt Lake City",
    state: "Utah",
    zip: "84103",

    lat: "",
    lng: "",

    description: "asdf",
    photoLink: "http://lorempixel.com/640/480",
    url: "http://asdf.com"
  }

  const handleQuery = (values, setValues, cb) => {

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

        API.newPost("classes", payload)
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
                console.log("reset");

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
                    onChange={handleChange}
                    isValid={touched.title && !errors.title}
                    onBlur={handleBlur}
                  />
                  {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
                  <Form.Label>Instructor</Form.Label>
                  <Form.Control
                    required
                    name="instructorName"
                    value={values.instructorName}
                    placeholder="Name"
                    type="text"
                    isInvalid={!!errors.instructorName}
                    isValid={touched.instructorName && !errors.instructorName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.instructorName && touched.instructorName && <div className="input-feedback">{errors.instructorName}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
                  <Form.Label>Style</Form.Label>
                  <Form.Control
                    required
                    name="style"
                    value={values.style}
                    placeholder="Style"
                    type="text"
                    isInvalid={!!errors.style}
                    isValid={touched.style && !errors.style}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.instructorName && touched.instructorName && <div className="input-feedback">{errors.instructorName}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
                  <Form.Label>Level</Form.Label>
                  <Form.Control as="select"
                    required
                    name="level"
                    isInvalid={!!errors.level}
                    isValid={touched.level && !errors.level}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Andvanced">Andvanced</option>
                    <option value="Any">Any</option>
                  </Form.Control>
                  {errors.level && touched.level && <div className="input-feedback">{errors.level}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
                  <Form.Check
                    name="master[0]"
                    label="Master Class"
                    value="Master Class"
                    onChange={handleChange}
                  />
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
                    placeholder="Photo Link"
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


export default Class;