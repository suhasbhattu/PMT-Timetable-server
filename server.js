import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "./routes.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

routes(app);

app.listen(port, () => {
  console.log(
    `PMT Timetable app is listening on port ${port}. Hit Ctrl-C to terminate.`
  );
});
