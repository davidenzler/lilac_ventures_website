import React, { useEffect, useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Select from 'react-select';
import { Link } from "react-router-dom";
import axios from "./api/axios";
import './contactMe.css';

interface ContactData {
  callTo: string,
  email: string,
  phone: string
}
const handleSubmit = () => {

}

const ContactView: React.FC = () => {
  const [ formSubmit, setFormSubmit ] = useState(false);
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [ firstName, setFirstName ] = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ message, setMessage ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ email, setEmail ] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [value, setValue] = useState(null);
  const [ submitted, setSubmitted ] = useState(false);
  const options = [
    { value: "1", label: "Get Financial Coaching" },
    { value: "2", label: "Learn how to get out of debt" },
    { value: "3", label: "Learn how to manage my finances" },
    { value: "4", label: "Know how to budget" },
  ];

  useEffect(() => {
    const baseURL = process.env.REACT_APP_API_URL;
    fetch(`${baseURL}/contact`)
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

  const handleFirstNameChange = (e:any) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e:any) => {
    setLastName(e.target.value);
  }

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  }

  const handleMessageChange = (e:any) => {
    setMessage(e.target.value);
  }

  const handlePhoneChange = (e:any) => {
    setPhone(e.target.value);
  }

  const handleInterestSelection = (e:any) => {
    const interests = e.map( (selection:any) => {
      return(
        selection['label']
      );
    })
    setInterests(interests);
  }

  const handleSubmit = async () => {
    setSubmitted(true);
    try{
      await axios.post('/contactMe', {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        message: message,
        interests: interests 
      });
    } catch(error) {
      return;
    }
  }

  console.log(`vars: {  ${firstName}, ${lastName}, ${email}, ${phone}, ${message}}`);
  return (
    <section id='contacMe'>
      <h1 className="d-flex display-4 mb-4 contact-heading">CONTACT ME</h1>
      <Container>
        <Row>
          <Col>
            <Col>
              <h4 className="d-flex color_sec py-4" style={{color:"blue"}}>{contactData && (contactData.callTo)}</h4>
              <address>
                <strong>Email: </strong>
                <a href={`mailto:${contactData && (contactData.email)}`}>
                  {contactData && (contactData.email)}
                </a>
                {"(555)555-5555" ?
                  <p>
                    <strong>Phone:</strong> {contactData && (contactData.phone)}
                  </p>
                 : 
                  ""
                }
              </address>
            </Col>
          </Col>
          { submitted ? 
            <Col>
              <p>Thank you for reaching out! You will hear back from me shortly.</p>
            </Col>:
            <Col>
              <Col>
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
                        onChange={handleInterestSelection}
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
                        onChange={handleFirstNameChange}
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
                        onChange={handleLastNameChange}
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
                        onChange={handleEmailChange}
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
                        onChange={handlePhoneChange}
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
                        onChange={handleMessageChange}
                        required
                      ></textarea>
                    </Col>
                  </Row>

                  <Row className="py-2">
                    <Col lg="12" className="form-group">
                      <button className="btn btn-success w-100" type="submit" onClick={handleSubmit}> 
                        SEND
                      </button>
                    </Col>
                  </Row>
                </form>
              </Col>
            </Col> 
          }
        </Row>
      </Container>
    </section>
  );
}

export default ContactView;
