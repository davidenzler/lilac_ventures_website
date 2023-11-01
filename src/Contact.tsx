import React, { useState } from 'react';
import { Container, Row, Col} from 'react-bootstrap';
import Select from 'react-select';
import { Link } from "react-router-dom";
import PaymentPage from "./PaymentPage";
import CheckoutForm from "./CheckoutForm";
import ContactView from './ContactView';

function Contact() {

  return (
    <div>
      <ContactView/>
    </div>
  );
            }
export default Contact;
