const knex = require("../database/knex")

class IngredientsController {

    async create(req, res) {
        const { name } = req.body

        try {

            await knex("ingredients").insert({ name })
            return res.json()

        } catch (e) {
            return res.send(e)
        }
    }

    async delete(req, res) {
        const { id } = req.params

        try {
            await knex("ingredients").where({ id }).delete()
            return res.json()
        } catch (e) {
            return res.send(e)
        }
    }

}

module.exports = IngredientsController