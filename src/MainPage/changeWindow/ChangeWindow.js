import React from "react";
import { connect } from "react-redux"
import './Changewindow.css'


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
                        <input type="submit" value="Отправить" className='item' /></form></div></div>
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