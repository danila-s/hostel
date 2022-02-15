const fs = require("fs");


const getCorrectDate = (num) => {
  return num < 10 ? `0${num}` : "" + `${num}`;
};

getDaysArray = (year, month) => {
  console.log("a");
  const names = Object.freeze([
    "sun",
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
  ]);
  const date = new Date(year, month - 1, 1);
  const result = {};
  while (date.getMonth() == month - 1) {
    result[`${getCorrectDate(date.getDate())}.${getCorrectDate(month)}`] = {
      id: 1,
      places: 2,
      number: 1,
      guests: ["", ""],
    };
    date.setDate(date.getDate() + 1);
  }
  return result;
};

let result = [];
for (let i = 1; i <= 12; i++) {
  result.push(getDaysArray(2022, i));
}
fs.writeFileSync("./test.json", JSON.stringify(result));
