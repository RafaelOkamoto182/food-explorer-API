const knex = require("../database/knex");

const AppError = require("../utils/AppError");
/*
controller so pra saber se o usuário existe.
sem isso aqui, a pessoa consegue ir la no local storage, colocar um
objeto vazio e, quando clicar em atualizar, ele vai entrar no sistema.
isso acontece por causa do useEffect que chega o local storage la no front end
*/
class UsersValidationController {
  async index(req, res) {
    const { user } = req;

    const checkUserExists = await knex("users").where({ id: user.id });

    if (checkUserExists.length === 0) {
      throw new AppError("Unauthorized", 401);
    }

    return res.status(200).json();
  }
}

module.exports = UsersValidationController;