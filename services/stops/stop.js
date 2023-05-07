import db from "../../data-access/index.js";
import { v4 as uuidv4 } from "uuid";

const listStops = async () => {
  const result = await db.query("SELECT *  FROM bus_stop");
  return result;
};

const filterStopById = async (httpRequest) => {
  const stopId = httpRequest.params.id;
  const result = await db.query("SELECT * FROM bus_stop WHERE id=$1", [stopId]);
  return result;
};

const createStop = async (httpRequest) => {
  const stop = httpRequest.body;
  const id = uuidv4();
  const name = stop.name;
  const localizedName = stop.localizedName;
  await db.query(
    "INSERT INTO bus_stop(id, name, localized_name) VALUES($1, $2, $3)",
    [id, name, localizedName]
  );
  const result = await db.query("SELECT * FROM bus_stop WHERE id = $1", [id]);
  return result;
};

const listRouteStops = async (httpRequest) => {
  const id = httpRequest.params.id;
  const result = await db.query(
    "SELECT bus_stop.id, bus_stop.name, bus_stop.localized_name FROM stop_route INNER JOIN bus_stop ON bus_stop.id=stop_route.stop_id AND stop_route.route_id=$1 ORDER BY stop_route.sequence_number ASC",
    [id]
  );
  return result;
};

export { listStops, filterStopById, createStop, listRouteStops };
