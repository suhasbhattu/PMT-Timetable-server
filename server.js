import express from "express";
import routes from "./routes.js";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

routes(app);

app.listen(port, () => {
  console.log(
    `PMT Timetable app is listening on port ${port}. Hit Ctrl-C to terminate.`
  );
});
