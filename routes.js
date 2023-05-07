import {
  getRouteById,
  getRoutes,
  getRoutesForStops,
  postRoute,
} from "./controller/routes/route.js";
import { getRouteStops, getStopById, getStops, postStop } from "./controller/stops/stop.js";

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
  app.get("/api/stops", createGetController(getStops));
  app.get("/api/stops/:id", createGetController(getStopById));
  app.post("/api/stops", createPostController(postStop));
  app.get("/api/routes", createGetController(getRoutes));
  app.get("/api/routes/:id", createGetController(getRouteById));
  app.post("/api/routes", createPostController(postRoute));
  app.post("/api/buses", createPostController(getRoutesForStops));
  app.get("/api/routes/:id/stops", createGetController(getRouteStops));
};

export default routes;
