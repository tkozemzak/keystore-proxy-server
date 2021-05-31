
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          firstName: 'Timothy',
          lastName: 'Kozemzak',
          email: 'timkozemzak@gmail.com',
          password: '1111'
          },
        {
          firstName: 'Peter',
          lastName: 'Pettigrew',
          email: 'ppettigrew@gmail.com',
          password: '1234'
          },
        {
          firstName: 'Test',
          lastName: 'User',
          email: 'test',
          password: 'test'
          },
        
      ]);
    });
};
