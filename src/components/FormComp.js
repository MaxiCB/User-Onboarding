import React from 'react';
import * as Yup from 'yup';
import axios from 'axios';

import {withFormik, Form, Field, Formik} from 'formik';
import {Button, Col, Row, Label, Input} from 'reactstrap';

export const DisplayFormikState = props =>
  <div style={{ margin: '1rem 0' }}>
    <h3 style={{ fontFamily: 'monospace' }} />
    <pre
      style={{
        background: '#f6f8fa',
        fontSize: '.65rem',
        padding: '.5rem',
      }}
    >
      <strong>props</strong> = {JSON.stringify(props, null, 2)}
    </pre>
  </div>;

const FormComp = (props) => {

    console.log(props);

    return (
      <Row>
        <Form>
          <Col>
            <Label>
              Name:
              {props.touched.name && props.errors.name && (
                <p>{props.errors.name}</p>
              )}
              {/* Use of the tag={Field} allows me to use reactstrap components inplace
                of Formik components and maintain access to the functionality. */}
              <Input
                tag={Field}
                type="text"
                name="name"
                placeholder="Full Name: "
              />
            </Label>
          </Col>
          <Col>
            <Label>
              Email:
              {props.touched.email && props.errors.email && (
                <p>{props.errors.email}</p>
              )}
              {/* Use of the tag={Field} allows me to use reactstrap components inplace
                of Formik components and maintain access to the functionality. */}
              <Input
                tag={Field}
                type="email"
                name="email"
                placeholder="Email: "
              />
            </Label>
          </Col>
          <Col>
            <Label>
              Password:
              {props.touched.password && props.errors.password && (
                <p>{props.errors.password}</p>
              )}
              {/* Use of the tag={Field} allows me to use reactstrap components inplace
                of Formik components and maintain access to the functionality. */}
              <Input
                tag={Field}
                type="text"
                name="password"
                placeholder="Password: "
              />
            </Label>
          </Col>
          <Col className="d-flex justify-content-center ml-2">
            <Field name="role" as="select" placeholder="Role">
              <option value="admin">Admin</option>
              <option value="dev">Dev</option>
              <option value="user">User</option>
            </Field>
          </Col>
          <Col className="d-flex justify-content-center ml-2">
            <Label check>
              <Input type="checkbox" id="checkbox2" />I Agree
            </Label>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button type="submit" className="mt-1">
              Submit!
            </Button>
          </Col>
          <Col>
            <DisplayFormikState {...props} />
          </Col>
        </Form>
      </Row>
    );
}

const FormikLogin = withFormik({

    mapPropsToValues({name, email, password, role}) {
        return{
            name: name || '',
            email: email || '',
            password: password || '',
            role: role || ''
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(3, 'Please enter your full name')
            .required('Name is required!'),
        email: Yup.string()
            .email('Email is not valid!')
            .matches('That email is already taken.', 'waffles@syrup.com')
            .required('Email is required!'),
        password: Yup.string()
            .min(6,'Choose a stronger password!')
            .required('A password is required!'),
    }),

    handleSubmit(values, {props}) {
        //this gives access to the callback function in FormComp
        const example = props.test;
        // console.log(values);
        axios
        .post('https://reqres.in/api/users', values)
        .then(res => {
            example(res.data);
            console.log(res.data);
        })
        .catch(err => {
            console.log(err)
        });
    }
})(FormComp);

export default FormikLogin