import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import { Link } from "react-router-dom";
import PaymentPage from "./PaymentPage";
import CheckoutForm from "./CheckoutForm";

function ContactView() {
  const [value, setValue] = useState(null);

  const options = [
    { value: "1", label: "Get Financial Coaching" },
    { value: "2", label: "Learn how to get out of debt" },
    { value: "3", label: "Learn how to manage my finances" },
    { value: "4", label: "Know how to budget" },
  ];

  return (
    <Container>
      <Row className="mb-8 mt-4 justify-content-md-center">
        <Col lg="8" className="text-center">
          <h1 className="display-4 mb-4" style={{ fontSize: '2rem' }}>CONTACT ME</h1>
          <hr className="my-4" />
          <h4 className="color_sec py-4" style={{color:"blue"}}>GET IN TOUCH WITH ME!</h4>
          <address>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${"gailemail@java.com"}`}>
              {"GailEmail@java.com"}
            </a>
            <br />
            <br />
            {"(555)555-5555" ? (
              <p>
                <strong>Phone:</strong> {"(555)555-5555"}
              </p>
            ) : (
              ""
            )}
          </address>
        </Col>
      </Row>

      <Row className="mb-4 justify-content-md-center">
        <Col lg="10">
          <form className="contact__form w-100 text-center">
            <Row className="py-2">
              <Col lg="12" className="form-group">
                <button type="button" className="btn btn-primary btn-lg w-100">
                  I Would Like To:
                </button>
              </Col>
            </Row>

            <Row className="py-2">
              <Col lg="12" className="form-group">
                <Select
                  options={options}
                  defaultValue={value}
                  placeholder="Choose One or More"
                  isMulti
                  className="w-100"
                  classNamePrefix="react-select"
                />
              </Col>
            </Row>

            <Row className="py-2">
              <Col lg="12" className="form-group">
                <input
                  className="form-control w-100"
                  id="firstName"
                  name="firstName"
                  placeholder="FIRST NAME"
                  type="text"
                  required 
                />
              </Col>
            </Row>

            <Row className="py-2">
              <Col lg="12" className="form-group">
                <input
                  className="form-control w-100"
                  id="lastName"
                  name="lastName"
                  placeholder="LAST NAME"
                  type="text" 
                  required 
                />
              </Col>
            </Row>

            <Row className="py-2">
              <Col lg="12" className="form-group">
                <input
                  className="form-control w-100"
                  id="email"
                  name="email"
                  placeholder="EMAIL"
                  type="email"
                  required
                />
              </Col>
            </Row>

            <Row className="py-2">
              <Col lg="12" className="form-group">
                <input  
                 className="form-control w-100"
                  id="phoneNumber"
                  name="phone number"
                  placeholder="PHONE NUMBER"
                  type="tel"
                  required
                />
              </Col>
            </Row>

            <Row className="py-2">
              <Col lg="12">
                <textarea
                  className="form-control w-100"
                  id="message"
                  name="message"
                  placeholder="Message"
                  rows={6}
                  required
                ></textarea>
              </Col>
            </Row>

            <Row className="py-2">
              <Col lg="12" className="form-group">
                <button className="btn btn-success w-100" type="submit"> 
                  SEND
                </button>
              </Col>
            </Row>
            <Row className="py-2">
              <Col lg="12">
                <Link to="/PaymentPage">Payment Page</Link>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactView;
