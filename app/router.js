const userController = require('./controllers/userController');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');

const { ensureAuthenticated } = require('./config/security.config');


const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello todo');
});

// Routes Auth
router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);
router.get('/auth/logout',  userController.logout);
router.get('/auth/users', ensureAuthenticated, userController.getAllUsers);


// Route List
router.post('/list-create', ensureAuthenticated, listController.createList)
router.get('/lists', ensureAuthenticated, listController.getAllLists)
router.get('/list/:id', ensureAuthenticated, listController.getOneList)
router.patch('/list-edit/:id', ensureAuthenticated, listController.editList)
router.delete('/list-delete/:id', ensureAuthenticated, listController.deleteList)

// Route Card
router.post('/card-create', ensureAuthenticated, cardController.createCard)
router.get('/cards', ensureAuthenticated, cardController.getAllCards)
router.get('/card/:id', ensureAuthenticated, cardController.getOneCard)
router.patch('/card-edit/:id', ensureAuthenticated, cardController.editCard)
router.delete('/card-delete/:id', ensureAuthenticated, cardController.deleteCard)

// Route Tag
router.get('/tags', ensureAuthenticated, tagController.getAllTags)
router.post('/tag-create', ensureAuthenticated, tagController.createTag)
router.delete('/tag-delete/:id', ensureAuthenticated, tagController.deleteTag)









module.exports = router;