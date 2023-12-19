const { compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");
const knex = require("../database/knex");
const authConfig = require("../configs/auth");
const AppError = require("../utils/AppError");

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("Email and password fields must not be empty")
    }

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

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 900000
    })

    res.status(201).json();
  }
}

module.exports = SessionsController;