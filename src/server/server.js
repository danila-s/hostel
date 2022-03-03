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

app.get("/users", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (!err) {
      const result = JSON.parse(data);
      res.send(result);
    } else {
      console.log(err);
    }
  });
});


app.get("/length", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (!err) {
      const result = JSON.parse(data);
      const num = result.length
      const arr = [] 
      for(let i = 1 ; i <= num ; i++){
        arr.push(i)
      }
      res.send(arr);
    } else {
      console.log(err);
    }
  });
});

app.get("/add", (req, res) => {
  
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  const json = fs.readFileSync("./data.json");
  const arr = JSON.parse(json);
  const newJson = fs.readFileSync("./test.json");
  const newRoom = JSON.parse(newJson);
  arr.push(newRoom);
  fs.writeFileSync("./data.json", JSON.stringify(arr));
  res.send(JSON.stringify('Complete'));
  
});

app.put("/users/:roomId", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Content-Type", "application/json");
  const { newValue, info } = req.body;
  const { month, date, index } = info;
  const { roomId } = req.params;

  const json = fs.readFileSync("./data.json");
  const newData = JSON.parse(json);


  newData[roomId][month][date]["guests"][index] = newValue;

  fs.writeFileSync("./data.json", JSON.stringify(newData));

  res.send(JSON.stringify('Complete'));
});

