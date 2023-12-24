const { Router } = require("express")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const UsersFavoritesController = require("../controllers/UsersFavoritesController")
const usersFavoritesController = new UsersFavoritesController()

const users_favoritesRoutes = Router()


users_favoritesRoutes.use(ensureAuthenticated)

users_favoritesRoutes.post("/", usersFavoritesController.create);
users_favoritesRoutes.delete("/:user_id/:dish_id", usersFavoritesController.delete)

module.exports = users_favoritesRoutes