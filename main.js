const sendContentByEmail = require('./sendContentByEmail');

const main = async () => {
  const filePath = './ContentMail.txt'; // Chemin vers le fichier texte
  const userId = '1'; // ID utilisateur simulé

  try {
    const result = await sendContentByEmail(filePath, userId);
    console.log(result);
  } catch (error) {
    console.error('Une erreur s\'est produite :', error.message);
  }
}

main();
