import { getStopById, getStops, postStop } from "./controller/stops/stop.js";

const createGetController = (fn) => {
  return (req, res) => {
    const httpRequest = {
      params: req.params,
    };

    fn(httpRequest)
      .then((result) => {
        res.type("json");
        res.status(200).send(result);
      })
      .catch((error) => {
        res.status(500).send({ error: "An unknown error occurred." });
      });
  };
};

const createPostController = (fn) => {
  return (req, res) => {
    const httpRequest = {
      params: req.params,
      body: req.body,
    };

    fn(httpRequest)
      .then((result) => {
        res.type("json");
        res.status(201).send(result);
      })
      .catch((error) => {
        res.status(500).send({ error: "An unknown error occurred." });
      });
  };
};

const routes = (app) => {
  app.get("/stops", createGetController(getStops));
  app.get("/stops/:id", createGetController(getStopById));
  app.post("/stops", createPostController(postStop));
};

export default routes;
