
exports.up = knex => knex.schema.createTable("dishes_ingredients", table => {

    table.integer("dish_id").references("id").inTable("dishes");
    table.integer("ingredient_id").references("id").inTable("ingredients").onDelete("CASCADE");
    table.primary(["dish_id", "ingredient_id"]);

});


exports.down = knex => knex.schema.dropTable("dishes_ingredients");
