import db from "../../data-access/index.js";
import { v4 as uuidv4 } from "uuid";

const listRoutes = async () => {
  const result = await db.query("SELECT *  FROM bus_route");
  return result;
};

const filterRouteById = async (httpRequest) => {
  const routeId = httpRequest.params.id;
  const result = await db.query("SELECT * FROM bus_route WHERE id=$1", [
    routeId,
  ]);
  return result;
};

const createRoute = async (httpRequest) => {
  const route = httpRequest.body;
  const id = uuidv4();
  const name = route.name;
  const busNumber = route.busNumber;
  const reverseName = route.reverseName;
  const localizedName = route.localizedName;
  const stops = route.stops;
  await db.query(
    "INSERT INTO bus_route(id, name, bus_number, reverse_name, localized_name) VALUES($1, $2, $3, $4, $5)",
    [id, name, busNumber, reverseName, localizedName]
  );

  for (let i = 0; i < stops.length; i++) {
    const stop = stops[i];
    await db.query("INSERT INTO stop_route VALUES($1, $2, $3)", [
      stop,
      id,
      i + 1,
    ]);
  }

  const result = await db.query("SELECT * FROM bus_route WHERE id = $1", [id]);
  return result;
};

const findRoutesForStops = async (httpRequest) => {
  const stops = httpRequest.body;
  const startStop = stops.startStop;
  const destinationStop = stops.destinationStop;

  const routes = await db.query(
    "SELECT DISTINCT A.route_id FROM stop_route A, stop_route B WHERE A.stop_id=$1 AND B.stop_id=$2 AND A.route_id=B.route_id AND A.sequence_number < B.sequence_number",
    [startStop, destinationStop]
  );
  if (routes.length === 0) {
    return [];
  }
  const routeIds = routes.map((route) => route.route_id);
  const result = await db.query(
    "SELECT * FROM bus_route WHERE id IN ($1:csv)",
    [routeIds]
  );
  return result;
};

export { listRoutes, filterRouteById, createRoute, findRoutesForStops };
