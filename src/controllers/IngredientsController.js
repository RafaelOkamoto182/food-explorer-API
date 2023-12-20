const knex = require("../database/knex")

class IngredientsController {

    async create(req, res) {
        const { name } = req.body

        try {

            await knex("ingredients").insert({ name })
            return res.json()

        } catch (e) {
            return e.message
        }
    }

    async delete(req, res) {
        const { id } = req.params

        try {
            await knex("ingredients").where({ id }).delete()
            return res.json()
        } catch (e) {
            return e.message
        }
    }

}

module.exports = IngredientsController