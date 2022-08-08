import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const CheckoutButton = styled.button`
  background-color: #e9241d;
  color: white;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #e9241d;
    color: white;
  }
`;

function Landing() {
  return (
    <div>
      This is the landing page
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
      <form action="/create-checkout-session" method="POST">
        <input
          type="hidden"
          name="lookup_key"
          value={process.env.REACT_APP_SUBSCRIPTION_PRICE_KEY}
        />
        <CheckoutButton id="checkout-and-portal-button" type="submit">
          Checkout
        </CheckoutButton>
      </form>
    </div>
  );
}
export default Landing;
