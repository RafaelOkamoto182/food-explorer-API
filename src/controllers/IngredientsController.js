const knex = require("../database/knex")

class IngredientsController {

    async create(req, res) {
        const { ingredients } = req.body

        const ingredientsToInsert = ingredients.map(ingredient => {
            return {
                name: ingredient
            }
        })

        try {

            //await knex("ingredients").insert({ name })
            return res.json(ingredientsToInsert)

        } catch (e) {
            return res.send(e)
        }
    }

    async get(req, res) {
        const { search_bar } = req.query
        let ingredients = []

        try {

            if (search_bar) {
                ingredients = await knex('ingredients')
                    .whereLike('name', `%${search_bar}%`)
            } else {
                ingredients = await knex('ingredients')
            }

            return res.json(ingredients)

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