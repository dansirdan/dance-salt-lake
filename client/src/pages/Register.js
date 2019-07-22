import React from "react";
import { Banner } from "../components/Sections";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Input } from "../components/Form";
import { Formik } from "formik";
import * as yup from "yup";
import API from "../utils/API";
const axios = require("axios");

function Register() {


  // componentWillMount() {
  //   this.props.handleLogo();
  // }

  const schema = yup.object().shape({
    name: yup.string()
      .min(2, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    logo: yup.string()
      .url("must be avalid url")
      .required('Required'),
    website: yup.string()
      .url("must be avalid url")
      .required('Required'),
    address: yup.string()
      .min(2, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    city: yup.string()
      .min(2, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    state: yup.string()
      .min(2, 'Too Short')
      .max(50, 'Too Long')
      .required('Required'),
    zip: yup.number()
      .min(5, "valid zipcode required")
      .required('Required'),
    phone: yup.string()
      .min(10, 'Too Short')
      .max(11, 'Too Long')
      .required('Required'),
    email: yup.string()
      .email(2, 'Too Short')
      .required('Required'),
    password: yup.string()
      .min(8, 'Too Short')
      .max(15, 'Too Long')
      .required('Required'),
  });

  const initialValues = {
    name: 'Daniel',
    logo: 'https://scontent.faus1-1.fna.fbcdn',
    website: 'https://www.facebook.com/dmonteton',
    address: '8 E Hillside Ave',
    city: "Salt Lake City",
    state: "Utah",
    zip: "84103",
    lat: "",
    lng: "",
    phone: '3032049046',
    email: 'dmont@gmail.com',
    password: '111111'
  }

  const handleRegister = (userData) => {
    API.signUp(userData).then(function (res) {
      console.log(res.data);
    }).catch(err => console.log(err));
  }


  // const handleRegister = (userData) => {
  //   API.auth("signup", userData).then(function (data) {
  //     console.log(data);
  //   }).catch(err => console.log(err));
  // }

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

  const handleQuery = (values, setValues) => {

    let location = (({ address, city, state, zip }) => ({ address, city, state, zip }))(values);

    location = Object.values(location)
    location = location.toString()
    location = location.split(" ").join("+")
    console.log(location);

    let cityLat;
    let cityLng;
    let geoAddy = location;
    // const geoKey = `${process.env.RREACT_APP_GOOGLE_API_KEY}`
    const geoKey = "AIzaSyBwWAv336FT-ttOosMGCDcROKAsq_rhkbA"
    let geoQuery = `https://maps.googleapis.com/maps/api/geocode/json?address=${geoAddy}&key=${geoKey}`;

    axios.get(geoQuery)
      .then(response => {
        cityLat = parseFloat(response.data.results[0].geometry.location.lat);
        cityLng = parseFloat(response.data.results[0].geometry.location.lng);

        console.log(response);
        console.log(cityLat, cityLng)

        const payload = { ...values, lat: cityLat, lng: cityLng };

        setValues(payload);
        handleRegister(payload)
        console.log(JSON.stringify(payload, null, 2));
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center">
          <Col md="12" lg="8">
            <Banner className="register-section">
              <h3>Register</h3>
              <h6>Please fill out the form below to create an account</h6>
            </Banner>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row className="justify-content-center">
          <Col md="10" lg="6">

            <Formik
              validationSchema={schema}
              initialValues={initialValues}
              onSubmit={(values, { setSubmitting, setValues }) => {
                handleQuery(values, setValues);
                setTimeout(() => {

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
                    <Form.Group as={Col} md="12">
                      <Form.Label>Organization / Artist</Form.Label>
                      <Form.Control
                        required
                        value={values.name}
                        name="name"
                        type="text"
                        placeholder="Name"
                        isInvalid={!!errors.name}
                        isValid={touched.name && !errors.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}
                    </Form.Group>

                    <Form.Group as={Col} md="12">
                      <Form.Label>Link to Logo</Form.Label>
                      <Form.Control
                        value={values.logo}
                        name="logo"
                        type="text"
                        placeholder="http://www.example.com"
                        isInvalid={!!errors.logo}
                        isValid={touched.logo && !errors.logo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.logo && touched.logo && <div className="input-feedback">{errors.logo}</div>}
                    </Form.Group>

                    <Form.Group as={Col} md="12">
                      <Form.Label>Link to Webpage</Form.Label>
                      <Form.Control
                        value={values.website}
                        name="website"
                        type="text"
                        placeholder="http://www.example.com"
                        isInvalid={!!errors.website}
                        isValid={touched.website && !errors.website}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.website && touched.website && <div className="input-feedback">{errors.website}</div>}
                    </Form.Group>

                    <Form.Group as={Col} md="12">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        value={values.address}
                        name="address"
                        type="text"
                        placeholder="Address"
                        isInvalid={!!errors.address}
                        isValid={touched.address && !errors.address}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.address && touched.address && <div className="input-feedback">{errors.address}</div>}
                    </Form.Group>
                    <Form.Group as={Col} md="12">
                      <Form.Control
                        value={values.city}
                        name="city"
                        type="text"
                        placeholder="City"
                        isInvalid={!!errors.city}
                        isValid={touched.city && !errors.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.city && touched.city && <div className="input-feedback">{errors.city}</div>}
                    </Form.Group>

                    <Form.Group as={Col} md="12">
                      <Form.Control
                        value={values.state}
                        name="state"
                        type="text"
                        placeholder="State"
                        isInvalid={!!errors.state}
                        isValid={touched.state && !errors.state}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.state && touched.state && <div className="input-feedback">{errors.state}</div>}
                    </Form.Group>

                    <Form.Group as={Col} md="12">
                      <Form.Control
                        value={values.zip}
                        name="zip"
                        type="text"
                        placeholder="Zip"
                        isInvalid={!!errors.zip}
                        isValid={touched.zip && !errors.zip}
                        onChange={handleChange}
                        onBlur={handleBlur}
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
                      value={values.lng}
                      type="number"
                      onChange={handleChange}
                    />

                    <Form.Group as={Col} md="12">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        value={values.phone}
                        name="phone"
                        type="tel"
                        placeholder="Phone"
                        isInvalid={!!errors.phone}
                        isValid={touched.phone && !errors.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.phone && touched.phone && <div className="input-feedback">{errors.phone}</div>}
                    </Form.Group>
                    <Form.Group as={Col} md="12">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        value={values.email}
                        type="email"
                        name="email"
                        placeholder="info@example.com"
                        isInvalid={!!errors.email}
                        isValid={touched.email && !errors.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
                    </Form.Group>
                    <Form.Group as={Col} md="12">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        value={values.password}
                        type="password"
                        name="password"
                        placeholder="Password"
                        isInvalid={!!errors.password}
                        isValid={touched.password && !errors.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.password && touched.password && <div className="input-feedback">{errors.password}</div>}
                    </Form.Group>
                    <Button onClick={handleSubmit}>Register</Button>
                  </Form>
                )}
            </Formik>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Register;
