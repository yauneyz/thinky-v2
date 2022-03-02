import React from "react";
import { connect } from "react-redux";
import "./App.css";

function App() {
  return <h1>This is the app</h1>;
}

const mapStateToProps = (_state) => {
  return {};
};

export default connect(mapStateToProps, {})(App);
