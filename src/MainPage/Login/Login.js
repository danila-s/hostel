import React from "react";
import "./Login.css";

class Login extends React.Component {
  state = {
    login: "",
    password: "",
  };

  changeLogin = (e) => {
    this.setState({ login: e.target.value });
  };

  changePassword = (e) => {
    this.setState({ password: e.target.value });
  };

  enterApp = () => {
    const { callback } = this.props;
    const { login, password } = this.state;
    callback(login, password);
  };

  render() {
    return (
      <div className="login-window">
        <p>Введите ваш логин и пороль :</p>
        <div>
          <p>Логин</p>
          <input onChange={this.changeLogin} />
        </div>
        <div>
          <p>Пороль</p>
          <input onChange={this.changePassword} />
        </div>
        <button onClick={this.enterApp}>Войти</button>
      </div>
    );
  }
}

export default Login;
