const { Router } = require('express');
const kecController = require('../controllers/kecController');
const { superAdminOnly } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', superAdminOnly, kecController.index);
router.get('/get', kecController.get);
router.post('/add', superAdminOnly, kecController.add);
router.post('/edit/:id', superAdminOnly, kecController.edit);
router.get('/detail/:id', superAdminOnly, kecController.detail);
router.get('/delete/:id', superAdminOnly, kecController.delete);

module.exports = router;