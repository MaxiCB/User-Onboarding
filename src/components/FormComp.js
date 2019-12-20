import React, {useState} from 'react';
import * as Yup from 'yup';

import {withFormik, Form, Field} from 'formik';
import {Button, Col, Row, Label, Input} from 'reactstrap';

const FormComp = ({errors, touched}) => {
    return(
    <Row>
        <Form>
        <Col>
            <Label>
                Name:
                {touched.name && errors.name && <p>{errors.name}</p>}
                {/* Use of the tag={Field} allows me to use reactstrap components inplace
                of Formik components and maintain access to the functionality. */}
                <Input tag={Field} type='text' name='name' placeholder='Full Name: '/>
            </Label>
        </Col>
        <Col>
            <Label>
                Email:
                {touched.email && errors.email && <p>{errors.email}</p>}
                {/* Use of the tag={Field} allows me to use reactstrap components inplace
                of Formik components and maintain access to the functionality. */}
                <Input tag={Field} type='email' name='email' placeholder='Email: '/>
            </Label>
            </Col>
            <Col>
            <Label>
                Password:
                {touched.password && errors.password && <p>{errors.password}</p>}
                {/* Use of the tag={Field} allows me to use reactstrap components inplace
                of Formik components and maintain access to the functionality. */}
                <Input tag={Field} type='text' name='password' placeholder='Password: '/>
            </Label>
            </Col>
            <Col className='d-flex justify-content-center ml-2'>
            <Label check>
              <Input type="checkbox" id="checkbox2" />
              I Agree
            </Label>
            </Col>
            <Col className='d-flex justify-content-center'>
                <Button className='mt-1'>Submit!</Button>
            </Col>
        </Form>
        </Row>
    )
}

const FormikLogin = withFormik({
    mapPropsToValues({name, email, password}) {
        return{
            name: name || '',
            email: email || '',
            password: password || ''
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(3, 'Please enter your full name')
            .required('Name is required!'),
        email: Yup.string()
            .email('Email is not valid!')
            .required('Email is required!'),
        password: Yup.string()
            .min(6,'Choose a stronger password!')
            .required('A password is required!'),
    }),

    handleSubmit(values) {
        console.log(values);
    }
})(FormComp);

export default FormikLogin