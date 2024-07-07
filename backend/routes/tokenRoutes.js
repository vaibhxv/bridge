const express = require('express');
const { getTokens, getChains } = require('../controllers/tokenController');

const router = express.Router();

router.get('/gettoken', getTokens);
router.get('/', getChains);

module.exports = router;
