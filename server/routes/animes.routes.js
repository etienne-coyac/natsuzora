const express = require('express');
const router = express.Router();

const animesController = require('../controllers/animes.controller');
const authMiddle = require('../middlewares/auth.middleware');
const validator = require('./validators/anime.validator')

router.get('/', animesController.getAllAnimes);
router.get('/season/:year?/:season?', validator.seasonValidate, animesController.getAnimesBySeason);
router.get('/test', animesController.test);
router.get('/:uuid', validator.uuidValidate, animesController.getAnimeByUuid);

//admin
router.post(
    '/insert/:year?/:season?',
    authMiddle.authenticateToken('ADMIN'),
    validator.seasonValidate,
    animesController.insertAnimesWithAPI);

router.delete(
    '/:uuid',
    authMiddle.authenticateToken('ADMIN'),
    validator.uuidValidate,
    animesController.deleteAnime);

module.exports = router;