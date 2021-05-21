
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, firstName: 'rowValue1'},
        {id: 2, firstName: 'rowValue2'},
        {id: 3, firstName: 'rowValue3'}
      ]);
    });
};
