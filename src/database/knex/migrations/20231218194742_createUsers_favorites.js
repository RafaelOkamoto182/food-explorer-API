
exports.up = knex.schema.createTable("users_favorites", table => {

    table.integer("dish_id").references("id").inTable("dishes").onDelete("CASCADE");
    table.integer("user_id").references("id").inTable("users");
    table.primary(["dish_id", "user_id"]);

});

exports.down = knex => knex.schema.dropTable("users_favorites");