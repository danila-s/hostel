import React from "react";
import Room from "../Table/Room";
import { connect } from "react-redux";
import { loadRoom } from "../api";
import { roomToStore } from "../redux/actions";

class Rooms extends React.Component {
  state = {
    roomsArr: [],
    id: 0,
    idCount: 1,
  };

  componentDidMount() {
    const { id } = this.state;
    loadRoom(id).then((data) => {
      this.props.roomToStore(data);
    });
  }

  changeArr = (id, newValue) => {};

  render() {
    const { roomsArr } = this.props;

    return (
      <div className="rooms">
        <div className="selector">
          <select onChange={this.getRoom}>
            <option>Комната {}</option>
            <option>Комната 1</option>
          </select>
        </div>
        <br></br>
        {roomsArr.length > 0 && (
          <Room
            roomArr={roomsArr}
            callback={this.changeArr}
            roomId={this.state.id}
          />
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  roomToStore: (data) => dispatch(roomToStore(data)),
});

const mapStateToProps = (state) => {
  return {
    roomsArr: state.roomsArr,
  };
};

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(Rooms);
