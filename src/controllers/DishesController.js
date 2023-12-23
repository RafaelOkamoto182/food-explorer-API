const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")
const AppError = require("../utils/AppError")

class DishesController {
    async create(req, res) {

        const dishPictureName = req.file.filename
        const { name, description, price, category } = req.body

        const diskStorage = new DiskStorage

        try {
            const fileName = await diskStorage.saveFile(dishPictureName)

            await knex("dishes").insert({ name, description, price, category, pictureUrl: fileName })

            return res.status(201).json({ name, description, price, category, fileName })

        } catch (e) {
            return e.message
        }
    }

    async get(req, res) {

        try {
            const dishes = await knex("dishes")
                .select(['dishes.id', 'dishes.name', 'dishes.description', 'dishes.pictureUrl', 'dishes.price', 'dishes.category'])

            return res.json(dishes)

        } catch (e) {
            return e.message
        }
    }

    async getById(req, res) {
        const { id } = req.params
        console.log(id)
        const dish = await knex("dishes").where({ id }).first()

        if (!dish) {
            throw new AppError('The dish with the given id could not be found')
        }

        const ingredients = await knex('ingredients')
            .innerJoin('dishes_ingredients', 'ingredients.id', 'dishes_ingredients.ingredient_id')
            .where('dish_id', id)

        return res.json({
            ...dish,
            ingredients
        })

    }

    async delete(req, res) {
        const { id } = req.params
        try {
            await knex("dishes").where({ id }).delete()

            return res.json()

        } catch (e) {
            return e.message
        }
    }

}

module.exports = DishesController