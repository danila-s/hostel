import React from "react";
import Guest from "../Guest/Guest";
import "./Room.css";


class Room extends React.Component {
  state = {
    date: "01.01",
    month: "0",
  };

  changeDate = (e) => {
    if (e.target.value.length === 10) {
      const date = e.target.value;
      const newArr = date.split("-");
      newArr.splice(0, 1);
      const result = newArr.reverse();
      const str = result.join(".");
      let month = "0";
      console.log(result[1][0]);
      if (result[1][0] === 0) {
        month = result[1][2] - 1;
      } else {
        month = result[1] - 1;
      }
      console.log(month);
      console.log(str);
      this.setState({ date: str, month: month });
    }
  };

  

  render() {
    const { date, month } = this.state;
    const { roomArr, roomId } = this.props;

    return (
      <div className="room">
        <div className="date-block">
          <p className="date">Выберите дату :</p>
          <input type="date" onChange={this.changeDate}></input>
        </div>
        <div className="title">
          <h1 className="title">Гости : </h1>
        </div>
        {roomArr[month][date]["guests"].map((item, index) => {
          return (
            <Guest
              callback={this.changeGuest}
              info={{
                month: month,
                date: date,
                names: item,
                index: index,
                roomId: roomId,
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default Room;
