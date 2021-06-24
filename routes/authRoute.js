const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.get('/', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout);

module.exports = router;