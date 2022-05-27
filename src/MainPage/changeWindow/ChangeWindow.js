import React from "react";
import { connect } from "react-redux"
import './Changewindow.css'
import { changeUserNameFromWindow } from "../../api";
import { changeAllRoom } from '../../redux/actions'


class ChangeWindow extends React.Component {
    state = {
        fistGuest: '',
        secondGuest: ''
    }



    componentDidMount() {
        const { changedObj, roomsArr } = this.props;
        const { room, month, date } = changedObj;
        this.setState({ firstGuest: roomsArr[room][month][date]['guests'][0], secondGuest: roomsArr[room][month][date]['guests'][1] })
    }

    changeFirstGuest = (e) => {
        this.setState({ firstGuest: e.target.value })
    }

    changeSecondGuest = (e) => {
        this.setState({ secondGuest: e.target.value })
    }

    saveInfo = () => {
        const { firstGuest, secondGuest } = this.state;
        const { changedObj } = this.props;
        const { date, room, month } = changedObj;
        changeUserNameFromWindow({ date: date, room: room, month: month }, [firstGuest, secondGuest])
            .then(data => {
                console.log(data)
                this.props.changeAllRoom(date, room, month, [firstGuest, secondGuest])
                this.props.callback()
            }).catch(err => {
                console.log(err);
                alert('Что-то пошло не так , обновите страницу.');
            });
    }

    render() {
        const { changedObj, roomsArr } = this.props;
        const { room, date, month } = changedObj;
        const { secondGuest, firstGuest } = this.state;
        if (roomsArr[room][month][date]) {
            return (
                <div className="active-window" onClick={this.makeDate}>
                    <p className="table">Окно изменения данных</p>
                    <div className="form-container"><form onSubmit={this.hahandleSubmit}>
                        <label className='item'>Имя гостя:
                            <input type="text" name="name" onChange={this.changeFirstGuest} value={firstGuest || ''} />
                        </label>
                        <label className='item'>Имя гостя:
                            <input type="text" name="name" onChange={this.changeSecondGuest} value={secondGuest || ''} />
                        </label>
                        <input type="button" value="Отправить" className='item' onClick={this.saveInfo} /></form></div></div>
            )
        } else {
            return <div></div>
        }
    }
}

const mapDispatchToProps = (dispatch) => ({
    changeAllRoom: (data, room, month, newArr) => dispatch(changeAllRoom(data, room, month, newArr))
});

const mapStateToProps = (state) => {
    return {
        roomsArr: state.roomsArr,
    };
};

const functionFromConnect = connect(mapStateToProps, mapDispatchToProps);

export default functionFromConnect(ChangeWindow);