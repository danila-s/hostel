import React from "react";
import { connect } from "react-redux"


class ChangeWindow extends React.Component {
    state = {
        date: '01.01'
    }

    makeDate = () => {
        const { changedObj } = this.props;
        const { month, day } = changedObj;
        let trueDay = ''
        let trueMonth = ''
        if (month < 9) {
            trueMonth = '0' + String(+month + 1);
        } else {
            trueMonth = String(+month + 1);
        }
        if (day < 9) {
            trueDay = '0' + String(+day + 1);
        } else {
            trueDay = String(+day + 1)
        }
        this.setState({ date: trueDay + '.' + trueMonth })
    }

    componentDidMount() {
        this.makeDate();
    }



    render() {
        const { changedObj, roomsArr } = this.props;
        const { room, month, day } = changedObj;
        const { date } = this.state;
        console.log(roomsArr[room][month])
        console.log(date)
        if (roomsArr[room][month][date]) {
            return (
                <div className="" onClick={this.makeDate}>{roomsArr[room][month][date]['guests'].map((item, index) => {
                    return <p key={index}>{item}</p>
                })}</div>
            )
        } else {
            return <div></div>
        }
    }
}

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state) => {
    return {
        roomsArr: state.roomsArr,
    };
};

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(ChangeWindow);