const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const dishesRouter = require("./dishes.routes");
const ingredientsRoutes = require("./ingredients.routes");
const dishes_ingredientsRoutes = require("./dishes_ingredients.routes");
const users_favoritesRoutes = require("./users_favorites.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/dishes", dishesRouter);
routes.use("/ingredients", ingredientsRoutes);
routes.use("/dishes_ingredients", dishes_ingredientsRoutes);
routes.use("/users_favorites", users_favoritesRoutes)

module.exports = routes;