import React from "react";
import Login from "./Login/Login";
import "./MainPage.css";
import Rooms from "../Rooms/Rooms";
import { connect } from "react-redux";
import { loadRoom } from "../api";
import { roomToStore, changeWindowStatus } from "../redux/actions";
import ChangeWindow from "./changeWindow/ChangeWindow";
import { makeDate } from "../tools";


class MainPage extends React.Component {
  state = {
    isLog: true,
    monthId: 0,
    monthArr: [
      "январь",
      "февраль",
      "март",
      "апрель",
      "май",
      "июнь",
      "июль",
      "август",
      "сентябрь",
      "октябрь",
      "ноябрь",
      "декабрь",
    ],
    changedObj: {},
  };

  componentDidMount() {
    loadRoom().then((data) => {
      this.props.roomToStore(data);
    });
  }

  checkLogStatus = (login, password) => {
    console.log(login, password);
    const { isLog } = this.state;
    this.setState({ isLog: !isLog });
  };

  changeTable = (indexRow, indexColumn) => {
    const { monthId } = this.state
    this.props.changeWindowStatus();
    this.setState({ changedObj: { room: indexRow, date: makeDate(indexColumn, monthId), month: monthId } })
  };

  addClass(item) {
    let people = 0;
    item.guests.forEach((item) => {
      if (item.length > 0) {
        people++;
      }
    });

    switch (people) {
      case 0:
        return "gray";


      case 1:
        return "yellow";


      case 2:
        return "green";


    }
  }

  changeMonth = (e) => {
    this.setState({ monthId: e.target.value });
  };

  render() {
    const { isLog, monthId, monthArr, changedObj } = this.state;
    const { roomsArr, changeWindowIsActive } = this.props;

    if (isLog && roomsArr.length > 0) {
      return (
        <div>
          {changeWindowIsActive ? <div className='change-window'>
            <ChangeWindow
              changedObj={changedObj}
              callback={this.props.changeWindowStatus}
            />
          </div> : <></>}
          <select onChange={this.changeMonth}>
            {monthArr.map((item, index) => {
              return (
                <option key={index} value={index}>
                  {item}
                </option>
              );
            })}
          </select>
          <div className="main-container">
            <div className="table-container" id="lol">
              <div className="select-class"></div>
              <table>
                <thead>
                  <tr>
                    {Object.keys(roomsArr[1][monthId]).map((item) => {
                      return <th key={item}>{item}</th>;
                    })}
                  </tr>
                </thead>
                <tbody>
                  {roomsArr.map((item, indexRow) => {
                    return (
                      <tr key={indexRow}>
                        {Object.values(item[monthId]).map(
                          (item, indexColumn) => {
                            return (
                              <td
                                className={this.addClass(item)}
                                key={indexColumn}
                                onClick={() => {
                                  this.changeTable(indexRow, indexColumn);
                                }}
                              >
                                {item.guests.map((item, key) => {
                                  return <p key={key}>{item}</p>;
                                })}
                              </td>
                            );
                          }
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div>
              <Rooms />
            </div>
          </div>
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

const mapDispatchToProps = (dispatch) => ({
  roomToStore: (data) => dispatch(roomToStore(data)),
  changeWindowStatus: () => dispatch(changeWindowStatus()),
});

const mapStateToProps = (state) => {
  return {
    roomsArr: state.roomsArr,
    changeWindowIsActive: state.changeWindowIsActive
  };
};

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(MainPage);
