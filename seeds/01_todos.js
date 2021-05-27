
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('todos').del()
    .then(function () {
      // Inserts seed entries
      return knex('todos').insert([
        {
          title: "Pick up trash",
          additionalInfo: "Tuesday Night",
          user_id: 1,
          
        },
        {
          title: "Wash Dishes",
          additionalInfo: "Wednesday",
          user_id: 1,
          
        },
        {
          title: "Take out recycling",
          additionalInfo: "Sunday Night",
          user_id: 1,
          
        },
        {
          title: "Change Sheets",
          additionalInfo: "Once a Month",
          user_id: 1,
          
        },
        {
          title: "Do Laundry",
          additionalInfo: "Every 2 weeks",
          user_id: 1,
          
        }
      ]);
    });
};
