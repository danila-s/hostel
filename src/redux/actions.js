const CHANGE_USER = "CHANGE_USER";
const ROOM_TO_STORE = "ROOM_TO_STORE";
const CHANGE_WINDOW_STATUS = 'CHANGE_WINDOW_STATUS'
const CHANGE_ALL_ROOM = 'CHANGE_ALL_ROOM'

function changeUser(info, newValue, roomId) {
  return {
    type: CHANGE_USER,
    payload: {
      info: info,
      newValue: newValue,
      roomId: roomId,
    },
  };
}

function changeAllRoom(date, room, month, newArr) {
  return {
    type: CHANGE_ALL_ROOM,
    payload: {
      date: date,
      month: month,
      room: room,
      newArr: newArr,
    },
  };
}

function roomToStore(data) {
  return {
    type: ROOM_TO_STORE,
    payload: {
      data: data,
    },
  };
}

function changeWindowStatus() {
  return {
    type: CHANGE_WINDOW_STATUS,
    payload: {
    },
  };
}

export { changeUser, CHANGE_USER, roomToStore, ROOM_TO_STORE, CHANGE_WINDOW_STATUS, changeWindowStatus, CHANGE_ALL_ROOM, changeAllRoom };
