const express = require('express');
const router = express.Router();

const animesController = require('../controllers/animes.controller');

router.get('/', animesController.getAllAnimes);
router.get('/season/:year?/:season?', animesController.getAnimesBySeason);
router.get('/test', animesController.test);
router.post('/insert/:year?/:season?', animesController.insertAnimesWithAPI);
router.get('/:uuid', animesController.getAnimeByUuid);
router.delete('/:uuid', animesController.deleteAnime);

module.exports = router;