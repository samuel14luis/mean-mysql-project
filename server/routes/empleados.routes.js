const express = require('express');
const router = express.Router();

const e = require('../controllers/empleado-controller');

router.get('/', e.getEmpleados)
router.post('/', e.insertEmpleado)

router.get('/:id', e.getEmpleado)
router.put('/:id', e.updateEmpleado)
router.delete('/:id', e.deleteEmpleado)

module.exports = router;