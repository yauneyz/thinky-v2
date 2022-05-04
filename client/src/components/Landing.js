import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    </div>
  );
}
export default Landing;
