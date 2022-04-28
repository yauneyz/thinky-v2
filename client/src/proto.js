import React from "react";
import { connect } from "react-redux";
import "./App.css";

function App() {
  return (
    <div className="wrapper">
      <div className="title-bar">
        <span className="title">Idea Editor</span>
				<span className="wiki">Wiki</span>
      </div>
      <div className="node-bar">
        <span className="node-item">Boards</span>
        <span className="node-item">VR Fitness Game</span>
        <span className="node-item">Movement Patterns</span>
        <span className="node-item">Fighting Patterns</span>
      </div>
      <div className="wrapper2">
        <div className="child-bar">
          <span className="child-node">Boxing</span>
          <span className="child-node">Sword Fighting</span>
          <span className="child-node">Skilled Projectiles</span>
          <span className="child-node">Unskilled Projectiles</span>
          <button className="add-child-button">Add</button>
        </div>
        <div className="editor-box">
          <textarea className="editor" />
          <textarea className="editor" />
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
