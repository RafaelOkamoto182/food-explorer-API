const knex = require("../database/knex")

class UsersFavoritesController {

    async create(req, res) {
        const { user_id, dish_id } = req.body

        try {

            await knex("users_favorites").insert({ user_id, dish_id })
            return res.json()

        } catch (e) {
            return res.send(e)
        }
    }

    async delete(req, res) {
        const { user_id, dish_id } = req.params

        try {
            await knex("users_favorites")
                .where({ dish_id })
                .andWhere({ user_id })
                .first()
                .delete()

            return res.json()
        } catch (e) {
            return res.send(e)
        }
    }

}

module.exports = UsersFavoritesController