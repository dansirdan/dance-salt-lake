import React from "react";
import { Row, Form, Col, InputGroup, Button } from "react-bootstrap";
import { AuthConsumer } from '../AuthContext';
import API from "../../utils/API";
import axios from "axios";

import { Formik } from "formik";
import * as yup from "yup";


function Audition() {

  const schema = yup.object().shape({

    title: yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    date: yup.date().required(),
    startTime: yup.string().required(),
    endTime: yup.string().required(),

    address: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zip: yup.string().required(),

    // location: {
    //   address: yup.string().required(),
    //   city: yup.string().required(),
    //   state: yup.string().required(),
    //   zip: yup.string().required(),
    // },

    numberOf: yup.string().required(),
    lookingFor: yup.string().required(),

    length: yup.string().required(),
    contract: yup.string().required(),

    description: yup.string().required(),
    img: yup.string().required(),
    url: yup.string()
      .url()
      .required(),

  });

  const initialValues = {

    UserId: "1",
    title: "asdf",
    date: "2019-07-13",
    startTime: "15:00",
    endTime: "16:00",

    location: {
      address: "519 E 4th Ave",
      city: "Salt Lake City",
      state: "Utah",
      zip: "84103",
    },
    lat: "",
    lng: "",

    numberOf: "4",
    lookingFor: "Both",

    length: "6",
    contract: "Month Contract",

    description: "asdf",
    img: "asdf.com",
    url: "asdf.com"
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
                      {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
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
                      {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
                    </Form.Group>

                    <Form.Group  as={Col} md="2">
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
                      {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
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
                      {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
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

                    <Form.Group as={Col} md="6">
                      <Form.Label>Looking For:</Form.Label>
                      <InputGroup>
                        <Form.Control
                          required
                          name="numberOf"
                          value={values.number}
                          placeholder="Number of"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.numberOf}
                        />
                        {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}

                        <InputGroup.Prepend>
                          <Form.Control
                            as="select"
                            required
                            name="lookingFor"
                            value={values.lookingFor}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.lookingFor}
                          >
                            <option>Gender</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                            <option value="Men and Women">Men and Women</option>
                            <option value="Any">Any</option>
                          </Form.Control>
                          {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
                        </InputGroup.Prepend>
                      </InputGroup>
                    </Form.Group>

                    <Form.Group as={Col} md="6">
                      <Form.Label>Contract:</Form.Label>
                      <InputGroup>
                        <Form.Control
                          required
                          name="length"
                          value={values.number}
                          placeholder="Length"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.length}
                        />
                        {errors.title && touched.title && <div className="input-feedback">{errors.title}</div>}
                        <InputGroup.Prepend>
                          <Form.Control
                            as="select"
                            required
                            name="contract"
                            value={values.contract}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            isInvalid={!!errors.contract}
                          >
                            <option>Contract Type:</option>
                            <option value="Month Contract">Month Contract</option>
                            <option value="Year Contract">Year Contract</option>
                          </Form.Control>
                          {errors.title && touched.title && <div className="input-feedback">{errors.contract}</div>}
                        </InputGroup.Prepend>
                      </InputGroup>
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

export default Audition;