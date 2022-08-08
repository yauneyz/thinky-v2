import styled from "styled-components";
import React from "react";

const SubscriptionButton = styled.button`
  background-color: #e9241d;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px;
  margin: 5px;
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #e9241d;
    color: white;
  }
`;

export default function ManageSubscriptionForm({ customerId }) {
  return (
    <div>
      <form action="/create-portal-session" method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={customerId}
        />
        <SubscriptionButton id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </SubscriptionButton>
      </form>
    </div>
  );
}
