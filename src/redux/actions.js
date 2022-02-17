const CHANGE_USER = "CHANGE_USER";
const ROOM_TO_STORE = "ROOM_TO_STORE";

function changeUser(info, newValue, roomId) {
  console.log(roomId)
  return {
    type: CHANGE_USER,
    payload: {
      info: info,
      newValue: newValue,
      roomId: roomId,
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

export { changeUser, CHANGE_USER, roomToStore, ROOM_TO_STORE };
