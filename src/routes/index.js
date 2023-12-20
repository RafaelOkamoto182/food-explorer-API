const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionsRouter = require("./sessions.routes");
const dishesRouter = require("./dishes.routes");
const categoriesRoutes = require("./categories.routes");
const ingredientsRoutes = require("./ingredients.routes");


const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/dishes", dishesRouter);
routes.use("/categories", categoriesRoutes)
routes.use("/ingredients", ingredientsRoutes)

module.exports = routes;