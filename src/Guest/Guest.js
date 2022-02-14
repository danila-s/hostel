import "./Guest.css";
import React from "react";
import { connect } from "react-redux";
import { changeUser } from "../redux/actions";
import { changeUserName } from "../api";

class Guest extends React.Component {
  state = {
    newName: "",
    isChanging: true,
  };

  changeNames = () => {
    const { isChanging, newName } = this.state;
    const { info } = this.props;
    const { roomId } = info;
    this.props.changeUser(info, newName);
    changeUserName(info, newName, roomId);
    this.setState({ isChanging: true });
  };

  changeInput = (e) => {
    this.setState({ newName: e.target.value });
  };

  startChange = () => {
    this.setState({ isChanging: false });
  };

  render() {
    const { info } = this.props;
    const { isChanging } = this.state;
    if (!isChanging) {
      return (
        <div className="guest">
          <p>Введите имя гостя</p>
          <input onChange={this.changeInput}></input>
          <button onClick={this.changeNames}>Изменить</button>
        </div>
      );
    }
    return (
      <div className="guest">
        <p>{info.names}</p>
        <button onClick={this.startChange}>Изменить</button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  changeUser: (info, newValue) => dispatch(changeUser(info, newValue)),
});

const mapStateToProps = (state) => {
  return state;
};

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Guest);
