import React from "react";
import { Row, Col, Form, InputGroup, Button } from "react-bootstrap";
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
    url: yup.string().required(),

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
    lng:  "",

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

                  <Form.Group as={Col} md="6">
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Time</InputGroup.Text>
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
                        name="endTime"
                        value={values.endTime}
                        placeholder="End Time"
                        type="time"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.endTime}
                      />
                      <Form.Control.Feedback>{errors.endTime}</Form.Control.Feedback>
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
                        name="location.address"
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
                        name="location.city"
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
                        name="location.state"
                        value={values.state}
                        placeholder="State"
                        type="text"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={!!errors.state}
                      />

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
                      <Form.Control.Feedback>{errors.zip}</Form.Control.Feedback>
                    </InputGroup>
                  </Form.Group>
                </Form.Row>

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

                <Form.Row>
                  <Form.Group as={Col} md={12}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Looking For:</InputGroup.Text>
                      </InputGroup.Prepend>
                      <InputGroup.Prepend>
                        <Form.Control
                          required
                          name="numberOf"
                          value={values.number}
                          placeholder="Number of:"
                          type="number"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          isInvalid={!!errors.numberOf}
                        />
                        <Form.Control.Feedback>{errors.numberOf}</Form.Control.Feedback>
                      </InputGroup.Prepend>                      

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
                          <option>Gender:</option>
                          <option value="Men">Men</option>
                          <option value="Women">Women</option>
                          <option value="Men and Women">Men and Women</option>
                          <option value="Any">Any</option>
                        </Form.Control>
                        <Form.Control.Feedback>{errors.lookingFor}</Form.Control.Feedback>
                      </InputGroup.Prepend>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group as={Col} md={12}>
                    <InputGroup>
                      <InputGroup.Prepend>
                        <InputGroup.Text>Contract:</InputGroup.Text>
                      </InputGroup.Prepend>
                      <InputGroup.Prepend>
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
                        <Form.Control.Feedback>{errors.length}</Form.Control.Feedback>
                      </InputGroup.Prepend>
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
                        <Form.Control.Feedback>{errors.contract}</Form.Control.Feedback>
                      </InputGroup.Prepend>
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

export default Audition;