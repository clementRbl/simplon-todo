const User = require('../models/user.model');
require('../models/list.model');

const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find({}).populate('list');
      res.json(users)
    } catch (error) {
      console.trace(error);
      res.status(500).json(error);
    }
  },

  signup: async (req, res) => {
    const {email, password} = req.body;

    try {

      const isEmailValid = emailValidator.validate(email); // true
      if (!isEmailValid) {
        throw Error(`Cette adresse email n'est pas valide`)
      }

      const user = await User.findOne({'email': email});

      if (user) {  
        throw Error(`Cet utilisateur existe deja`)
      }

      if (!password.trim()) {
        throw Error(`Aucun mot de passe saisi`)
      }

      const encryptedPassword = bcrypt.hashSync(password, 10);

      const newUser = new User({
        email,
        password: encryptedPassword
    });

    await newUser.save().then(() => {
      res.json(newUser);
    })
    } catch (error) {
      res.status(500).json(`Impossible de s'enregistrer`)
      console.trace(error)
    }

  },

  signin: async (req, res) => {
    const {email, password} = req.body;
    try {
      const user = await User.findOne({'email': email});

      if (!user) {
        throw Error(`Cette adresse email n'existe pas`)
      }

      const isPasswordValid = bcrypt.compareSync(password, user.password);

      if (!isPasswordValid) {
        throw Error(`Ce mot de passe n'est pas valide`)
      }

      const token = jwt.sign({ id: user._id }, 'RANDOM_TOKEN_SECRET');
      res.cookie('auth-token', token, { httpOnly: true });

      res.send({ token }); 

    } catch (error) {
      res.status(500).json(`Impossible de se connecter`);
      console.trace(error);
    }
  },

  logout: async (req, res) => {
    res.clearCookie('auth-token', { path: '/' }).send('Utilisateur déconnecté');
  },
}


module.exports = userController;