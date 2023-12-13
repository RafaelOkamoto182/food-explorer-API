const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const knex = require("../database/knex");
const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

class SessionsController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await knex("users").where({ email }).first();

    if (!user) {
      throw new AppError("Wrong e-mail and/or password.", 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError("Wrong e-mail and/or password.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({ role: user.role }, secret, {
      subject: String(user.id),
      expiresIn
    });

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 900000
    })

    delete user.password

    response.status(201).json({ user });
  }
}

module.exports = SessionsController;