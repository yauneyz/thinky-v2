import React from "react";
import { connect } from "react-redux";
import "./App.css";

import Random from "./components/Random";
import RandomizeButton from "./components/RandomizeButton";
import LoginButton from "./components/LoginButton";
import DeleteBoardButton from "./components/DeleteBoardButton";
import RegisterForm from "./components/RegisterForm";
import LogoutButton from "./components/LogoutButton";
import BoardsList from "./components/BoardsList";
import IdeasList from "./components/IdeasList";
import ColumnsList from "./components/ColumnsList";

import {
  login,
  setIdeas,
  setStoreState,
  setLoaded,
  setRandom,
  setActiveBoard,
  addColumn,
  addIdea,
} from "./redux/actions";
import save from "./utils/save";

class App extends React.Component {
  constructor(props) {
    super(props);

    // Bind methods
    this.updateRandom = this.updateRandom.bind(this);
    this.state = { mounted: false };
  }

  getBoards() {
    // This only runs if we are logged in
    fetch("boards", { credentials: "include" })
      .then((res) => res.json())
      .then(
        (res) => {
          if (res != null) {
            const { boards, active } = res;
            this.props.setStoreState(boards);
            this.props.setActiveBoard(active);
            this.props.setLoaded(true);

            // Set a timer so we don't clobber old state with new state
            // When the timer expires after 3 seconds, start saving
            setTimeout(
              setInterval(() => save(), 3000),
              3000
            );
          }
        },
        (_error) => {
          this.props.setLoaded(false);
        }
      );
  }

  async componentDidMount() {
    var self = this;
    await fetch("auth/user", { credentials: "include" })
      .then((res) => {
        return res;
      })
      .then((res) => res.json())
      .then(function (res) {
        if (res.success) {
          self.props.login(true);
        }
      });
    self.setState({ mounted: true });
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  updateRandom() {
    this.props.setRandom();
  }

  render() {
    if (!this.state.mounted) {
      return <div>Loading</div>;
    }
    // See if we are already logged in
    if (!this.props.loggedIn) {
      return (
        <div>
          <div>
            Log In:
            <LoginButton />
          </div>
          <div>
            Register:
            <RegisterForm />
          </div>
        </div>
      );
    }

    // Loading
    if (!this.props.isLoaded) {
      this.getBoards();
      return <div>Loading</div>;
    }

    // Logged in, proceed normally

    // Set the board that is going to be used here

    // Some useful constants
    const randoms = this.props.randoms;

    const randomsList = randoms.map((random, index) => (
      <div className="col-sm border border-primary" key={index}>
        <Random content={random} key={index} />
      </div>
    ));

    return (
      <div className="App">
        <header>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
            integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk"
            crossOrigin="anonymous"
          />
        </header>

        {/* List of the user's boards */}
        <BoardsList />

        <div className="main">
          <div className="container-fluid">
            {/* App Title */}
            <div className="app-title">Idea Editor</div>

            {/* Logout Button */}
            <LogoutButton />

            {/* Delete Board Button */}
            <DeleteBoardButton />

            {/* Columns */}
            <div className="row">
              <button
                className="btn btn-primary float-right"
                onClick={this.props.addColumn}
              >
                Add Column
              </button>
            </div>

            <div className="row">
              <ColumnsList />
            </div>

            {/* Randoms */}
            <div className="row pt-4">
              <div className="col-xs">Random Inputs:</div>
              {randomsList}
            </div>
            <div className="row top-buffer">
              <div className="col-sm">
                <RandomizeButton updateRandom={this.updateRandom} />
              </div>
            </div>
            <div className="top-buffer">
              <div className="ideas-header">
                Ideas
                <button
                  className="btn btn-primary idea-add-btn"
                  onClick={this.props.addIdea}
                >
                  Add
                </button>
              </div>
            </div>
            <div className="row">
              <IdeasList />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { loggedIn, boards, randoms, isLoaded, active, mounted } = state;
  return {
    boards: boards,
    randoms: randoms,
    isLoaded: isLoaded,
    loggedIn: loggedIn,
    active: active,
    mounted: mounted,
  };
};

export default connect(mapStateToProps, {
  login,
  setRandom,
  setIdeas,
  setLoaded,
  setStoreState,
  setActiveBoard,
  addColumn,
  addIdea,
})(App);
