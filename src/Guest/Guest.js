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
    const { newName } = this.state;
    const { info } = this.props;
    const { roomId } = info;
    this.props.changeUser(info, newName, roomId);
    changeUserName(info, newName, roomId)
      .then(data => {
        console.log(data)
      }).catch(err => {
        console.log(err);
        alert('Что-то пошло не так , обновите страницу.');
      });
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
  changeUser: (info, newValue, roomId) => dispatch(changeUser(info, newValue, roomId)),
});

const mapStateToProps = (state) => {
  return state;
};

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Guest);
