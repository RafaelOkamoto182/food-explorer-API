
exports.up = knex => knex.schema.createTable("dishes", table => {

    table.increments("id");
    table.text("name").notNullable();
    table.text("description").notNullable();
    table.text("pictureUrl").notNullable();
    table.text("category").notNullable();
    table.decimal("price").notNullable();

});

exports.down = knex => knex.schema.dropTable("dishes");
