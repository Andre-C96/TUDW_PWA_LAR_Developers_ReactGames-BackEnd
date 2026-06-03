const { Router } = require('express');

const { getHealthCheck } = require('../controllers/health.controller');

const router = Router();

router.get('/health', getHealthCheck);

module.exports = router;