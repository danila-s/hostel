import React from "react";
import Login from "./Login/Login";
import "./MainPage.css";
import Rooms from "../Rooms/Rooms";

class MainPage extends React.Component {
  state = {
    isLog: true,
  };

  checkLogStatus = (login, password) => {
    console.log(login, password);
    const { isLog } = this.state;
    this.setState({ isLog: !isLog });
  };

  render() {
    const { isLog } = this.state;
    if (isLog) {
      return (
        <div>
          <Rooms />
        </div>
      );
    } else {
      return (
        <div className="login-root">
          <Login callback={this.checkLogStatus} />
        </div>
      );
    }
  }
}

export default MainPage;
