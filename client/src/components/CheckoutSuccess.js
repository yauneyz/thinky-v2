import React from "react";
import ManageSubscriptionForm from "./ManageSubscriptionForm";

export default function CheckoutSuccess({ sessionId }) {
  return (
    <div>
      <div>Checkout Success</div>
      <ManageSubscriptionForm customerId={sessionId} />
    </div>
  );
}
