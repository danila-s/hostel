import React from "react";
import { connect } from "react-redux"
import './Changewindow.css'


class ChangeWindow extends React.Component {
    state = {
        date: ''
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
        const { room, month } = changedObj;
        const { date } = this.state;  
        if (roomsArr[room][month][date]) {
            return (
                <div className="active-window" onClick={this.makeDate}>
                    <p className="table">Окно изменения данных</p>
                    <div className="form-container"><form>
                    {roomsArr[room][month][date]['guests'].map((item, index) => {
                    return <label key={index}>Имя:
                      <input type="text" name="name" key={index} defaultValue={item} />
                    </label>  
                })}<input type="submit" value="Отправить" /></form></div></div>
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