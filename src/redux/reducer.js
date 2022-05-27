import { CHANGE_USER, ROOM_TO_STORE, CHANGE_WINDOW_STATUS, CHANGE_ALL_ROOM } from "./actions";

const initialState = {
  roomsArr: [],
  changeWindowIsActive: false
};

function reducer(state = initialState, action) {
  const { roomsArr } = state;

  if (action.type === CHANGE_USER) {
    const { info, newValue, roomId } = action.payload;
    const newRoomsArr = [...roomsArr];
    newRoomsArr[roomId][info.month][info.date]["guests"][info.index] = newValue;
    const anotherState = { ...state, roomsArr: newRoomsArr };
    return anotherState;
  }
  if (action.type === CHANGE_ALL_ROOM) {
    const { room, date, month, newArr } = action.payload;
    const newRoomsArr = [...roomsArr];
    console.log(date + 'ddd')
    console.log(newRoomsArr[room][month])
    newRoomsArr[room][month][date]['guests'] = newArr;
    const newState = { ...state, roomsArr: newRoomsArr }
    return newState
  }
  if (action.type === ROOM_TO_STORE) {
    const { data } = action.payload;
    const newArr = [...data];
    const newState = { ...state, roomsArr: newArr };
    return newState;
  }

  if (action.type === CHANGE_WINDOW_STATUS) {
    const newChangeStatus = !state.changeWindowIsActive;
    const newStateIsLoad = { ...state, changeWindowIsActive: newChangeStatus }
    return newStateIsLoad;
  }

  return state;
}

export default reducer;
