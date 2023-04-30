import express from "express";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(
    `PMT Timetable app is listening on port ${port}. Hit Ctrl-C to terminate.`
  );
});
