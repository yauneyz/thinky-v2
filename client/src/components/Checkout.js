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

<form action="/create-checkout-session" method="POST">
  <input
    type="hidden"
    name="lookup_key"
    value={process.env.REACT_APP_SUBSCRIPTION_PRICE_KEY}
  />
  <CheckoutButton id="checkout-and-portal-button" type="submit">
    Checkout
  </CheckoutButton>
</form>;
