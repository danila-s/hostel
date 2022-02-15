async function loadRoom(id) {
  console.log('запрос полетел')
  const response = await fetch(`http://localhost:8000/users/${id}`);
  const data = await response.json();
  return data;
}

async function addRoom() {
  console.log('azabaza')
  const response = await fetch(`http://localhost:8000/add`);
  const data = await response.json();
  return data;
}

async function changeUserName(info, newValue, roomId) {
  const obj = {
    info: info,
    newValue: newValue,
  };
  console.log(roomId);
  fetch(`http://localhost:8000/users/${roomId}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(obj),
  });
}

async function getLength() {

  const response = await fetch(`http://localhost:8000/length`);
  const data = await response.json();
  return data;
}

export { loadRoom, changeUserName , addRoom , getLength };
