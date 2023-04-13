import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Container, Row, Col} from "react-bootstrap"
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import "./App.css";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

function PaymentPage() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = [
    clientSecret,
    appearance,
  ];

  return (
    <Container className="mt-5 px-5">

        <div className="PaymentPage">
            {clientSecret && (
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
        </div>

      <div className="mb-2">
        <h2><strong>Confirm Order and Pay</strong></h2>
      </div>
      <Row>
        <Col className="col-md-8">
          <div className="card p-3" style={{backgroundColor:"whitesmoke"}}>
            <div className="inputbox mt-3">
                <input  
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="PLEASE ENTER E-MAIL"
                    required
                />
                <span>Email</span>
            </div>
            <h6 className="text-uppercase" style={{color:"blue"}}><strong>Payment details</strong></h6>
           
            <div className="inputbox mt-3">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="John J Smith"
                required
                ></input>
                  <span>Name on Card</span>
            </div>
              <Row>
                <Col className="col-md-6">
                  <div className="inputbox mt-3 mr-2">
                    <input
                      type="text"
                      name="card number"
                      className="form-control"
                      placeholder="1111 2222 3333 4444"
                      required
                    />
                    <i className="fa fa-credit-card"></i>
                    <span>Card Number</span>
                  </div>
                </Col>
                <Col className="col-md-6">
                  <div className="d-flex flex row">
                    <div className="inputbox mt-3 mr-2">
                      <input  
                        type="text"
                        name="date"
                        className="form-control"
                        placeholder="MM/YY"
                        required
                      />
                      <span>Expiration Date</span>
                    </div>
                    <div className="inputbox mt-3 mr-2">
                      <input  
                        type="text"
                        name="CVV"
                        className="form-control"
                        placeholder="711"
                        required
                      />
                      <span>CVV</span>
                    </div>
                  </div>
                </Col>
              </Row>

              <div className="mt-4 mb-4">
                  <h6 className="text-uppercase" style={{color:"blue"}}> Billing Address</h6>
                  <Row className="mt-3">
                    <Col className="col-md-6">
                      <div className="inputbox mt-3 mr-2">
                        <input
                          type="text"
                          name="Street"
                          className="form-control"
                          placeholder="123 Coloma Road"
                          required
                        />
                        <span>Street Address</span>
                      </div>
                    </Col>
                    <Col className="col-md-6">
                      <div className="inputbox mt-3 mr-2">
                        <input  
                          type="text"
                          name="City"
                          className="form-control"
                          placeholder="Seattle"
                          required
                        />
                        <span>City</span>
                      </div>
                    </Col>
                  </Row>

                  <Row className="row mt-2">
                    <Col className="col-md-6">
                      <div className="inputbox mt-3 mr-2">
                        <input
                          type="text"
                          name="state"
                          className="form-control"
                          placeholder="CA"
                          required
                        />
                        <span>State</span>
                      </div>
                    </Col>
                    <Col className="col-md-6">
                      <div className="inputbox mt-3 mr-2">
                        <input
                          type="text"
                          name="zip"
                          className="form-control"
                          placeholder="90210"
                          required
                        />
                        <span>Zip Code</span>
                      </div>
                    </Col>
                  </Row>
              </div>
          </div>
          <div className="mt-4 mb-4 d-flex justify-content-between">
            <Col></Col>
            <button className="btn btn-success px-5">COMPLETE CHECKOUT AND PAY</button>
          </div>

          
        </Col>
        
        <div className="col-md-4">

          <div className="card card-blue p-3 text-white mb-3" style={{backgroundColor:"grey"}}>
            <div className="p-3">
              <span><strong>Order Recap</strong></span>
              <div className="d-flex justify-content-between mt-2"><span className="fw-500">Services</span><span>$50.00</span></div>
              <div className="d-flex justify-content-between mt-2"><span className="fw-500">Other</span><span>$5.00</span></div>
              <div className="d-flex justify-content-between mt-2"><span className="fw-500">Taxes</span><span>$5.50</span></div>
              <div className="d-flex justify-content-between mt-2"><span className="fw-500">_______</span><span></span>______</div>
              <div className="d-flex justify-content-between mt-2"><span className="fw-500">Total</span><span style={{color:"green", backgroundColor:"white"}}>$60.50</span></div>
            </div>
  
    
          </div>

        </div>
      </Row>
    </Container>


    
  );
      }

      export default PaymentPage;