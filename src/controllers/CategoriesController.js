const knex = require("../database/knex")

class CategoriesController {

    async create(req, res) {
        const { name } = req.body

        try {

            await knex("categories").insert({ name })
            return res.json()

        } catch (e) {
            return e.message
        }
    }

    async delete(req, res) {
        const { id } = req.params

        try {
            await knex("categories").where({ id }).delete()
            return res.json()
        } catch (e) {
            return e.message
        }
    }

}

module.exports = CategoriesController