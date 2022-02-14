import { CHANGE_USER, ROOM_TO_STORE } from "./actions";

const initialState = {
  roomsArr: [],
};

function reducer(state = initialState, action) {
  const { roomsArr } = state;

  switch (action.type) {
    case CHANGE_USER:
      const { info, newValue } = action.payload;

      const newRoom = [...roomsArr];
      newRoom[info.month][info.date]["guests"][info.index] = newValue;
      const anotherState = { ...state, roomsArr: newRoom };

      return anotherState;

    case ROOM_TO_STORE:
      const { data } = action.payload;
      const newArr = [...data];
      const newState = { ...state, roomsArr: newArr };
      return newState;
  }
  return state;
}

export default reducer;
