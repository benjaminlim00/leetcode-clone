const express = require("express");
const cors = require("cors");
const fs = require("fs");
const PythonShell = require("python-shell").PythonShell;

const app = express();
const port = 80;

app.use(cors());
app.use(express.json());

app.post("/python", (req, res) => {
  fs.writeFileSync("test.py", req.body.code);

  let options = {
    mode: "text",
    pythonOptions: ["-u"], // get print results in real-time
    args: [1, 2, 3],
  };

  PythonShell.run("test.py", options).then((results) => {
    // results is an array consisting of messages collected during execution
    console.log("results: %j", results);
    res.json({ status: results[0] });
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
