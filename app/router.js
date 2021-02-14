const userController = require('./controllers/userController');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');
const tagController = require('./controllers/tagController');


const express = require('express');
const router = express.Router();
const {auth} = require('./middlewares/auth');

router.get('/', (req, res) => {
  res.send('hello todo');
});

// Routes Auth
router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);
router.get('/auth/logout', auth, userController.logout);
router.get('/auth/users', userController.getAllUsers);


// Route List
router.post('/list-create', auth, listController.createList)
router.get('/lists', auth, listController.getAllLists)
router.get('/list/:id', auth, listController.getOneList)
router.patch('/list-edit/:id', auth, listController.editList)
router.delete('/list-delete/:id', auth, listController.deleteList)

// Route Card
router.post('/card-create', auth, cardController.createCard)
router.get('/cards',  auth, cardController.getAllCards)
router.get('/card/:id', auth, cardController.getOneCard)
router.patch('/card-edit/:id', auth, cardController.editCard)
router.delete('/card-delete/:id', auth, cardController.deleteCard)

// Route Tag
router.get('/tags',  auth, tagController.getAllTags)
router.post('/tag-create', auth, tagController.createTag)
router.delete('/tag-delete/:id', auth, tagController.deleteTag)









module.exports = router;