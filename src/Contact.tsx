import React, { useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Select from 'react-select';


function Contact() {
  const [value, setValue] = useState(null);

  const options = [
    {value: "1", label: "Get Financial Coaching"},
    {value: "2", label: "Learn how to get out of debt"},
    {value: "3", label: "Learn how to manage my finances"},
    {value: "4", label: "Know how to budget"},
  ];

  return (
    <Container>
      
      <Row className="mb-5 mt-4">
        <Col lg="5">
          <h1 className="display-4 mb-4">CONTACT ME</h1>
          <hr className="t_border my-4 ml-0 text-left" />
        </Col>
      </Row>
      <Row className="sec_sp">
        <Col lg="5" className="mb-5">
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
  
        <Col lg="7" className="d-flex align-items-center">
          <form  className="contact__form w-100">
            <Row>
              <Col>
                <button type="button" className="btn btn-primary btn-lg btn-block">I Would Like To:</button>
              </Col>
            </Row>

            <Row><br /></Row>

            <Row>
              <Col lg="6" className="form-group">
                <div style={{margin:50, width:500}}>
                <Select
                  options={options}
                  defaultValue={value}
                  placeholder="Choose One or More"
                  isMulti
                />
                </div>
              </Col>

            </Row>

            <Row>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder="FIRST NAME" 
                  type="text"
                  required 
                />
              </Col>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="LAST NAME"
                  type="text" 
                  required 
                />
              </Col>
            </Row>

            <Row> <br /> </Row>

            <Row>
              <Col lg="6" className="form-group">
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="EMAIL"
                  type="email"
                  required
                />
              </Col>
              <Col lg="6" className="form-group">
                <input  
                  className="form-control"
                  id="phoneNumber"
                  name="phone number"
                  placeholder="PHONE NUMBER"
                  type="tel"
                  required
                />
              </Col>
            </Row>

            <Row> <br /> </Row>

            <textarea
              className="form-control rounded-0"
              id="message"
              name="message"
              placeholder="Message"
              rows={6}
              required
            ></textarea>
            <br />

            <Row>
              <Col lg="12" className="form-group">
                <button className="btn btn-success" type="submit"> 
                SEND
                </button>
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    </Container>
);
            }
export default Contact;
