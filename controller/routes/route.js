import {
  createRoute,
  filterRouteById,
  findRoutesForStops,
  listRoutes,
} from "../../services/routes/route.js";

const getRoutes = async () => {
  const routes = await listRoutes();
  const count = routes.length;
  return {
    count: count,
    items: routes,
  };
};

const getRouteById = async (httpRequest) => {
  const result = await filterRouteById(httpRequest);
  const route = result[0];
  return route;
};

const postRoute = async (httpRequest) => {
  const result = await createRoute(httpRequest);
  const route = result[0];
  return route;
};

const getRoutesForStops = async (httpRequest) => {
  const routes = await findRoutesForStops(httpRequest);
  return { routes: routes };
};

export { getRoutes, getRouteById, postRoute, getRoutesForStops };
