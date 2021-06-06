exports.up = function(knex, Promise) {
    return knex.schema.createTable("todos", function(table){
      table.increments('id').primary();
      table.string("title");
      table.boolean("completed").defaultTo(false);
      table.integer("user_id").defaultTo(1);
      table.string("created_at").defaultTo(new Date());
    }).then(()=> {
      console.log("Success")
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('todos').then(()=> {
    })
  };


