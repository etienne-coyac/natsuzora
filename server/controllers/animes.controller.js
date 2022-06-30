const animesService = require('../services/animes.service');
const configService = require('../services/config.service');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
module.exports.getAllAnimes = async (req, res) => {
    let animes = await animesService.getAllAnimes();
    if (animes.length === 0) res.status(404).send({ error: 'No anime found.' });
    else res.status(201).send(animes);
}

module.exports.getAnimeByUuid = async (req, res) => {
    let anime = await animesService.getAnimeByUuid(req.params.uuid);
    if (anime.length === 0) res.status(404).send({ error: 'No anime found for this uuid.' });
    else res.status(201).send(anime);
}

module.exports.insertAnimesWithAPI = async (req, res) => {
    let result = await animesService.insertAnimes(req.params.season, req.params.year);
    if (result.error) res.status(207).send(result);
    else res.status(200).send(result)
}

module.exports.deleteAnime = async (req, res) => {
    let result = animesService.deleteAnime(req.params.uuid);
    if (result) res.status(204).send({ message: 'Deletion done.' });
    else res.status(404).send({ error: 'No anime found for this uuid.' })
}

module.exports.test = async (req, res) => {
    console.log(process.env.TEST)
    res.status(200).send(process.env.TEST)
}

module.exports.getAnimesBySeason = async (req, res) => {
    let result = await animesService.getAnimesBySeason(req.params.year, req.params.season);
    if (result) res.status(201).send(result);
    else res.status(404).send({ error: 'No anime found for this season.' });
}