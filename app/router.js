const userController = require('./controllers/userController');
const listController = require('./controllers/listController');


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







module.exports = router;