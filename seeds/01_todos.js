
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {
          title: "Pick up trash",
          user_id: 1,
          completed: 1,
          
        },
        {
          title: "Wash Dishes",
          user_id: 1,
          
        },
        {
          title: "Take out recycling",
          user_id: 1,
          
        },
        {
          title: "Change Sheets",
          user_id: 1,
          
        },
        {
          title: "Do Laundry",
          user_id: 1,
          
        }
      ]);
    });
};
