exports.up = function(knex, Promise) {
    return knex.schema.createTable("users", function(table){
      table.increments();
      table.string("firstName");
      table.string("lastName");
      table.string("email");
      table.string("password");
      table.timestamps(true, true);
    }).then(()=> {
      console.log("Success")
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users').then(()=> {
    })
  };