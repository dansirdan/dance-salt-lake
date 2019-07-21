import React from "react";
import { Col, Form, InputGroup, Button } from "react-bootstrap";
import { AuthConsumer } from '../AuthContext';
import API from "../../utils/API";
import axios from "axios";
import { Formik } from "formik";
import * as yup from "yup";

function Class() {

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
      .required('Required'),
    startTime: yup.string()
      .required('Required'),
    endTime: yup.string()
      .required('Required'),

    address: yup.string()
      .required('Required'),
    city: yup.string()
      .required('Required'),
    state: yup.string()
      .required('Required'),
    zip: yup.number()
      .min(8, "valid zipcode required")
      .required('Required'),

    description: yup.string()
      .min(3, "Too Short")
      .max(255, "That's a bit much...")
      .required("Required"),
    img: yup.string()
      .url("valid url required")
      .required('Required'),
    url: yup.string()
      .url("valid url required")
      .required('Required'),

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
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.instructorName && touched.instructorName && <div className="input-feedback">{errors.instructorName}</div>}
                </Form.Group>
              
                <Form.Group as={Col} md="12">
                  <Form.Label>Instructor</Form.Label>
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
                  {errors.instructorName && touched.instructorName && <div className="input-feedback">{errors.instructorName}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
                  <Form.Label>Style</Form.Label>
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
                  {errors.style && touched.style && <div className="input-feedback">{errors.style}</div>}
                </Form.Group>
               
                <Form.Group as={Col} md="12">
                  <Form.Label>Level</Form.Label>
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
                  {errors.level && touched.level && <div className="input-feedback">{errors.level}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
                  <InputGroup.Checkbox name="Master" label="Master Class" />
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
                  />
                  {errors.endTime && touched.endTime && <div className="input-feedback">{errors.endTime}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
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
                  {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
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
                  {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
                </Form.Group>

                <Form.Group as={Col} md="12">
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
                </Form.Group>

                <Form.Group as={Col} md="12">
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
                  {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
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
                    name="img"
                    value={values.img}
                    placeholder="Photo Link"
                    type="text"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={!!errors.img}
                  />
                  {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
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
                  {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
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


export default Class;