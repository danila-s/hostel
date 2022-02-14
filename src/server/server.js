const fs = require("fs");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8000, () => {
  console.log("Server has been started , port 8000 ");
});

app.get("/users/:id", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (!err) {
      const result = JSON.parse(data);
      res.send(result[req.params.id]);
    } else {
      console.log(err);
    }
  });
});

app.put("/users/:roomId", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  const { newValue, info } = req.body;
  const { month, date, index } = info;
  const { roomId } = req.params;

  const json = fs.readFileSync("./data.json");
  const newData = JSON.parse(json);

  console.log(roomId);

  newData[roomId][month][date]["guests"][index] = newValue;

  fs.writeFileSync("./data.json", JSON.stringify(newData));
});
