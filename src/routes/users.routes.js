const { Router } = require("express");
const UsersController = require("../controllers/UsersController");
const UsersValidationController = require("../controllers/UsersValidationController");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

const usersRoutes = Router();

const usersController = new UsersController();
const usersValidationController = new UsersValidationController

usersRoutes.post("/", usersController.create);
usersRoutes.get("/validation", ensureAuthenticated, usersValidationController.index);
//utiliza essa rota no front end no index, onde ele checa se o usuario esta autenticado ou nao

module.exports = usersRoutes;