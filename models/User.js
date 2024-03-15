// Données utilisateur simulées
const users = [
    {
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      emailAddress: 'john@example.com'
    },
    {
      _id: '2',
      firstName: 'Jane',
      lastName: 'Doe',
      emailAddress: 'jane@example.com'
    }
  ];
  
  // Fonction pour trouver un utilisateur par ID
  const findById = async (userId) => {
    return users.find(user => user._id === userId);
  };
  
  module.exports = { findById };
  
