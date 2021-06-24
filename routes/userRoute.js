const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

router.get('/', userController.user_get);
router.get('/get', userController.get_all);
router.get('/get/:id', userController.get_one);
router.post('/add', userController.user_add);
router.post('/edit/:id', userController.user_edit);
router.get('/delete/:id', userController.user_delete);

module.exports = router;