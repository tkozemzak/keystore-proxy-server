exports.up = function(knex, Promise) {
    return knex.schema.createTable("todos", function(table){
      table.increments('id').primary();
      table.string("title");
      table.string("additionalInfo");
      table.integer("completed").defaultTo(0);
      table.integer("user_id").defaultTo(1);
      table.string("created_at").defaultTo(knex.fn.now());
    }).then(()=> {
      console.log("Success")
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('todos').then(()=> {
    })
  };