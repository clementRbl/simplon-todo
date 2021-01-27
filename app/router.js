const userController = require('./controllers/userController');
const listController = require('./controllers/listController');
const cardController = require('./controllers/cardController');


const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello todo');
});

// Routes Auth
router.post('/auth/signup', userController.signup);
router.post('/auth/signin', userController.signin);
router.get('/auth/logout', userController.logout);

// Route List
router.post('/list-create', listController.createList)
router.get('/lists', listController.getAllLists)
router.get('/list/:id', listController.getOneList)
router.patch('/list-edit/:id', listController.editList)
router.delete('/list-delete/:id', listController.deleteList)

// Route Card
router.post('/card-create', cardController.createCard)
router.get('/cards', cardController.getAllCards)
router.get('/card/:id', cardController.getOneCard)
router.patch('/card-edit/:id', cardController.editCard)
router.delete('/card-delete/:id', cardController.deleteCard)







module.exports = router;