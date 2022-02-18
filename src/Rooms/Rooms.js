import React from "react";
import Room from "../Room/Room"
import { connect } from "react-redux";
import { loadRoom } from "../api";
import { roomToStore } from "../redux/actions";
import {addRoom , getLength} from '../api';
import './Rooms.css';


class Rooms extends React.Component {
  state = {
    roomsArr: [],
    id: 0,
    idCount: 1,
    length : []
  };

  componentDidMount() {
    
    this.newLength()
  }

  newLength = () => {
    getLength().then((data) => {
      this.setState({length : data});
      console.log(data)
    });
  }

  addNewRoom = () => {
    addRoom();
    this.newLength();
    loadRoom().then((data) => {
      this.props.roomToStore(data);
    });
  }

  getRoom = (e) => {
    this.setState({id : e.target.value - 1})
    }
     

  render() {
    const { roomsArr } = this.props;
    const {length} = this.state

    return (
      <div className="rooms">
        <div className="selector">
          <h2 className="item">Комната :</h2>
          <select className="item" onChange={this.getRoom}>
            {length.map(item => {
              return<option key={item}>{item}</option>
            })}
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
        <button onClick={this.addNewRoom}>Добавить комнату</button>
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
