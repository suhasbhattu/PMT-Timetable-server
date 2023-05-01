import {
  createStop,
  filterStopById,
  listStops,
} from "../../services/stops/stop.js";

const getStops = async () => {
  const stops = await listStops();
  const count = stops.length;
  return {
    count: count,
    items: stops,
  };
};

const getStopById = async (httpRequest) => {
  const result = await filterStopById(httpRequest);
  const stop = result[0];
  return stop;
};

const postStop = async (httpRequest) => {
  const result = await createStop(httpRequest);
  const stop = result[0];
  return stop;
};

export { getStops, getStopById, postStop };
