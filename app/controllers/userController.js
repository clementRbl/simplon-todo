const User = require('../models/user.model');
require('../models/list.model');

const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const jwt = require('jsonwebtoken');
const { findUserPerEmail } = require('../queries/user.queries');

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

  signin: async (req, res, next) => {
    
    try {
      const { email, password } = req.body;
      const user = await findUserPerEmail(email);
      if (user) {
        const match = await user.comparePassword(password);
        if (match) {
          req.login(user);
          res.json({message: 'user matched', user})
        } else {
          res.json({message: 'user not matched !'})
        }
      } else {
        res.json({message: 'Veuillez essayé de vous reconnecter'})
      }

    } catch (error) {
      next(error)
    }
    
  },

  logout: async (req, res) => {
    req.logout().send('Utilisateur déconnecté');
  },
}


module.exports = userController;