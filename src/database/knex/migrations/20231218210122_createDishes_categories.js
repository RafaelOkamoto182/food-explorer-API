
exports.up = knex.schema.createTable("dishes_categories", table => {

    table.integer("dish_id").references("id").inTable("dishes");
    table.integer("category_id").references("id").inTable("categories");
    table.primary(["dish_id", "category_id"]);

});


exports.down = knex => knex.schema.dropTable("dishes_categories");
