const knex = require("../database/knex")

class DishesIngredientsController {

    async create(req, res) {
        const { dish_id, ingredient_id } = req.body

        try {

            await knex("dishes_ingredients").insert({ dish_id, ingredient_id })
            return res.json()

        } catch (e) {
            return res.send(e)
        }
    }

    async delete(req, res) {
        const { dish_id, ingredient_id } = req.params

        try {
            await knex("dishes_ingredients")
                .where({ dish_id })
                .andWhere({ ingredient_id })
                .first()
                .delete()

            return res.json()
        } catch (e) {
            return res.send(e)
        }
    }

}

module.exports = DishesIngredientsController