import React from "react";
import { connect } from "react-redux";
import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <div className="title-bar"></div>
      <div className="node-bar">
        <ul className="node-list">
          <li className="node-item">Boards</li>
          <li className="node-item">VR Fitness Game</li>
          <li className="node-item">Movement Patterns</li>
          <li className="node-item">Fighting Patterns</li>
        </ul>
      </div>
      <div className="wrapper2">
        <div className="child-bar">
          <ul className="child-list"></ul>
        </div>
        <div className="editor-box">
          <textarea className="editor" />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (_state) => {
  return {};
};

export default connect(mapStateToProps, {})(App);
