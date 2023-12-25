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
            return res.send(e)
        }
    }

    async get(req, res) {
        const { search_bar } = req.query
        let dishes = []

        try {

            if (search_bar) {
                dishes = await knex('dishes')
                    .select(
                        'dishes.id as dish_id',
                        'dishes.name as dish_name',
                        'ingredients.id as ingredient_id',
                        'ingredients.name as ingredient_name',
                        'pictureUrl'
                    )
                    .join('dishes_ingredients', 'dishes.id', 'dishes_ingredients.dish_id')
                    .join('ingredients', 'dishes_ingredients.ingredient_id', 'ingredients.id')
                    .whereLike('ingredient_name', `%${search_bar}%`)
                    .orWhereLike('dish_name', `%${search_bar}%`)
                    .groupBy('dish_name');
            } else {
                dishes = await knex('dishes')
            }

            return res.json(dishes)

        } catch (e) {
            return res.send(e)
        }
    }

    async getById(req, res) {
        const { id } = req.params

        const dish = await knex("dishes").where({ id }).first()

        if (!dish) {
            throw new AppError('The dish with the given id could not be found')
        }

        const ingredients = await knex.select('ingredients.*').from('ingredients')
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
            const dish = await knex.select("pictureUrl").from("dishes").where({ id }).first()

            if (!dish) {
                throw new AppError("Dish not found")
            }

            const diskStorage = new DiskStorage
            await diskStorage.deleteFile(dish.pictureUrl)

            await knex("dishes").where({ id }).delete()

            return res.json()

        } catch (e) {
            if (e instanceof AppError) {
                return res.status(e.statusCode).json(res.send(e));
            }

            return res.send(e)
        }
    }

    async update(req, res) {
        const { dish_id } = req.params

        const { newName, newCategory, newDescription, newIngredients, newPrice } = req.body
        console.log(req.body)
        /*  if (newPictureName) {
             console.log("veio pra foto")
         } */

        const dish = await knex('dishes').where('id', dish_id).first()

        const ingredients = await knex.select('ingredients.*').from('ingredients')
            .innerJoin('dishes_ingredients', 'ingredients.id', 'dishes_ingredients.ingredient_id')
            .where('dish_id', dish_id)

        const dishWithNewName = await knex('dishes').where('name', newName).first()

        if (dishWithNewName && dishWithNewName.id !== dish_id) {
            throw new AppError("There's already a dish with this name")
        }

        dish.name = newName ?? dish.name
        dish.category = newCategory ?? dish.category
        dish.description = newDescription ?? dish.description
        dish.price = newPrice ?? dish.price


        return res.json({ ...dish, ingredients })
        s
    }
}

module.exports = DishesController