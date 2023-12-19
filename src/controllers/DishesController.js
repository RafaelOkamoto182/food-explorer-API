const knex = require("../database/knex")
const DiskStorage = require("../providers/DiskStorage")
const AppError = require("../utils/AppError")

class DishesController {
    async create(req, res) {

        const dishPictureName = req.file.filename
        const { name, description, price } = req.body

        const diskStorage = new DiskStorage

        try {
            const fileName = await diskStorage.saveFile(dishPictureName)

            await knex("dishes").insert({ name, description, price, pictureUrl: fileName })

            return res.status(201).json({ name, description, price, fileName })

        } catch (e) {
            return e.message
        }
    }

    async get(req, res) {

        try {
            const dishes = await knex("dishes")
                .select(['dishes.id', 'dishes.name', 'dishes.description', 'dishes.pictureUrl', 'dishes.price'])

            return res.json(dishes)

        } catch (e) {
            return e.message
        }
    }

}

module.exports = DishesController