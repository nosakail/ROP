const fs = require('fs').promises;
const { findById } = require('./models/User');

const sendContentByEmail = async (filePath, userId) => {
    try {
      // Chemin Heureux > Lire le fichier > Obtenir l'adresse e-mail, le prénom et le nom > Envoyer un e-mail
      const data = await readFile(filePath);
      const userInfo = await getUserInfo(userId);
      const validatedInfo = await validateUserInfo(userInfo);
      await sendEmail(validatedInfo.emailAddress, validatedInfo.firstName, validatedInfo.lastName, data);
      return 'Terminé';
    } catch (error) {
      // Chemin Malheureux > Gestion des erreurs
      return error.message;
    }
}

const readFile = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'binary');
        if (!data) {
            throw new Error('Contenu vide ou invalide !');
        }
        return data;
    } catch (error) {
        throw new Error(`Erreur lors de la lecture du fichier : ${error.message}`);
    }
}

const getUserInfo = async (userId) => {
    const userInfo = await findById(userId);
    if (!userInfo) {
      throw new Error('Utilisateur introuvable !');
    }
    return userInfo;
}

const validateUserInfo = async (userInfo) => {
    const { emailAddress, firstName, lastName } = userInfo;
    if (!emailAddress) {
      throw new Error('Adresse e-mail introuvable !');
    }
    if (!firstName) {
      throw new Error('Prénom introuvable !');
    }
    if (!lastName) {
      throw new Error('Nom de famille introuvable !');
    }
    const isValidated = await validateEmail(emailAddress);
    if (!isValidated) {
      throw new Error('Adresse e-mail non valide !');
    }
    return { emailAddress, firstName, lastName };
}

const validateEmail = async (emailAddress) => {
    if (!emailAddress.includes('@')) {
      return false;
    }
    return true;
}

const sendEmail = async (emailAddress, firstName, lastName, data) => {
    console.log(`E-mail envoyé : Adresse e-mail : ${emailAddress}, Prénom : ${firstName}, Nom : ${lastName}`);
}

module.exports = sendContentByEmail;
