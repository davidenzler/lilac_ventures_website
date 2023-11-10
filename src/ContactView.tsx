import React, { useEffect, useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Select from 'react-select';
import { Link } from "react-router-dom";
import PaymentPage from "./PaymentPage";
import CheckoutForm from "./CheckoutForm";

interface ContactData {
  callTo: string,
  email: string,
  phone: string
}

const ContactView: React.FC = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);

  const [value, setValue] = useState(null);
  const options = [
    {value: "1", label: "Get Financial Coaching"},
    {value: "2", label: "Learn how to get out of debt"},
    {value: "3", label: "Learn how to manage my finances"},
    {value: "4", label: "Know how to budget"},
  ];

  useEffect(() => {
    fetch('http://localhost:8080/contact')
      .then((response) => response.json())
      .then((data: ContactData[]) => {
        if (data && data.length > 0) {
          setContactData(data[0]);
        }
      })
      .catch((error) => {
        console.error('Error fetching about data:', error);
      });
  }, []);

  return (
    <Container>
      
      <Row className="mb-8 mt-4">
        <Col lg="7">
          <div style={{margin:0, width:380}}>
            <h1 className="d-flex display-4 mb-4">CONTACT ME</h1>
          </div>
          <div style={{margin:0, width:380}}>
            <hr className="d-flex t_border my-4 ml-0 text-left"/>
          </div>
          <h4 className="d-flex color_sec py-4" style={{color:"blue"}}>{contactData && (contactData.callTo)}</h4>
          <address>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${contactData && (contactData.email)}`}>
              {contactData && (contactData.email)}
            </a>
            <br />
            <br />
            {"(555)555-5555" ? (
              <p>
                <strong>Phone:</strong> {contactData && (contactData.phone)}
              </p>
            ) : (
              ""
            )}
          </address> 
          
        </Col>
        
      </Row>
      <Row className="d-flex sec_sp mb-5 mt-4">
      <Col lg="1" className="mb-5"></Col>
  
        <Col lg="7" className="d-flex align-items-center">
          <form  className="contact__form w-100">
            <Row>
              <Col>
                <div style={{margin:0, width:500}}>
                  <button type="button" className="btn btn-primary btn-lg btn-block">I Would Like To:</button>
                </div>
              </Col>
            </Row>

            <Row><br /></Row>

            <Row>
              <Col lg="6" className="form-group">
                <div style={{margin:0, width:500}}>
                <Select
                  options={options}
                  defaultValue={value}
                  placeholder="Choose One or More"
                  isMulti
                />
               </div>
              </Col>
            </Row>
            <Row><br/></Row>
            <Row>
              
              <Col  className="form-group">
              <div style={{margin:0, width:500}}>
                <input
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  placeholder= "FIRST NAME"
                  type="text"
                  required 
                />
                </div>
              </Col>
              <Col  className="form-group">
                <div style={{margin:0, width:500}}>
                <input
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  placeholder="LAST NAME"
                  type="text" 
                  required 
                />
                </div>
              </Col>
            </Row>

            <Row> <br /> </Row>

            <Row>
              <Col  className="form-group">
              <div style={{margin:0, width:500}}>
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="EMAIL"
                  type="email"
                  required
                />
              </div>
              </Col>
              <Col  className="form-group">
                <div style={{margin:0, width:500}}>
                  <input  
                   className="form-control"
                    id="phoneNumber"
                    name="phone number"
                    placeholder="PHONE NUMBER"
                    type="tel"
                    required
                  />
                </div>
              </Col>
            </Row>

            <Row> <br /> </Row>
            <div style={{margin:0, width:500}}>
            <textarea
              className="form-control rounded-0"
              id="message"
              name="message"
              placeholder="Message"
              rows={6}
              required
            ></textarea>
            </div>
            <br />

            <Row>
              <Col lg="12" className="form-group align-items-center">
                <div style={{margin:0, width:500}}>
                  <button className="btn btn-success" type="submit"> 
                    SEND
                  </button>
                </div>
              </Col>
            </Row>
            <Link to="/PaymentPage">Payment Page</Link>
            
          </form>
        </Col>
      </Row>
    </Container>
  );
}

export default ContactView;
