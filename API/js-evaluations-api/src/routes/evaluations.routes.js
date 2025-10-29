const express = require('express');
const router = express.Router();
const controller = require('../controllers/evaluations.controller');
const auth = require('../middlewares/auth');

router.use(auth); // todas rotas exigem JWT

router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.get);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;