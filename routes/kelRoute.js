const { Router } = require('express');
const kelController = require('../controllers/kelController');
const { superAdminOnly } = require('../middleware/authMiddleware');

const router = Router();

router.get('/', superAdminOnly, kelController.index);
router.get('/get', kelController.get);
router.post('/add', superAdminOnly, kelController.add);
router.post('/edit/:id', superAdminOnly, kelController.edit);
router.get('/delete/:id',superAdminOnly, kelController.delete);
router.get('/:kecId', kelController._get);

module.exports = router;