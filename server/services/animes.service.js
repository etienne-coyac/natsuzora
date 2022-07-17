const uuid = require('uuid');

const animesDal = require('../dal/animes.dal');
const configService = require('./config.service');

const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

function animeToArrayForInsert(anime) {
    let genres = anime.genres.reduce((a, b) => ({ ...a, [b.mal_id]: b.name }), {})// create object of genre object with only id and name
    let themes = anime.themes.reduce((a, b) => ({ ...a, [b.mal_id]: b.name }), {});
    let demographics = anime.demographics.reduce((a, b) => ({ ...a, [b.mal_id]: b.name }), {});
    let studios = anime.studios.reduce((a, b) => ({ ...a, [b.mal_id]: b.name }), {});
    //  <!> l'ordre correspond à celui du insert <!>
    return [
        uuid.v4().toString(),
        anime.title,
        anime.title_english ? anime.title_english : anime.title,
        anime.synopsis ? anime.synopsis : null,
        anime.episodes ? anime.episodes : null,
        genres !== '[]' ? genres : null,
        themes !== '[]' ? themes : null,
        demographics !== '[]' ? demographics : null,
        studios !== '[]' ? studios : null,
        anime.aired.from ? anime.aired.from.split("T")[0] : null,
        anime.aired.to ? anime.aired.to.split("T")[0] : null,
        anime.images.webp.large_image_url ? anime.images.webp.large_image_url : null,
        anime.trailer.embed_url ? anime.trailer.embed_url : null,
        anime.popularity ? anime.popularity : null,
        anime.season ? anime.season : null,
        anime.year ? anime.year : null
    ];
}

function animeToArrayForUpdate(anime) {
    let genres = anime.genres.reduce((a, b) => ({ ...a, [b.mal_id]: b.name }), {})// create object of genre object with only id and name
    let themes = anime.themes.reduce((a, b) => ({ ...a, [b.mal_id]: b.name }), {});


    let demographics = anime.demographics.reduce((a, b) => ({ ...a, [b.mal_id]: b.name }), {});
    let studios = anime.studios.reduce((a, b) => ({ ...a, [b.mal_id]: b.name }), {});
    //  <!> l'ordre correspond à celui de l'update <!>
    return [
        anime.synopsis ? anime.synopsis : null,
        anime.episodes ? anime.episodes : null,
        genres !== '[]' ? genres : null,
        themes !== '[]' ? themes : null,
        demographics !== '[]' ? demographics : null,
        studios !== '[]' ? studios : null,
        anime.aired.from ? anime.aired.from.split("T")[0] : null,
        anime.aired.to ? anime.aired.to.split("T")[0] : null,
        anime.images.webp.large_image_url ? anime.images.webp.large_image_url : null,
        anime.trailer.embed_url ? anime.trailer.embed_url : null,
        anime.popularity ? anime.popularity : null,
        anime.season ? anime.season : null,
        anime.year ? anime.year : null,
        anime.title, // (where title)
    ]
}

function getCurrentSeason(hemisphere) {
    let currentDate = new Date();
    let index = Math.floor((currentDate.getMonth() / 12 * 4)) % 4;
    let northSeasons = ['winter', 'spring', 'summer', 'autumn'];
    let southSeasons = ['summer', 'autumn', 'winter', 'spring'];

    switch (hemisphere) {
        case 'north':
            return northSeasons[index];
        case 'south':
            return southSeasons[index];
        default:
            return false;
    }
}

async function getAllAnimes() {
    let enable_nsfw = await configService.getConfig('enable_nsfw', false);
    if (enable_nsfw === -1) enable_nsfw = false;
    let result = await animesDal.getAllAnimes(enable_nsfw);
    return result;
}

async function getAnimeByUuid(uuid) {
    let result = await animesDal.getAnimeByUuid(uuid)
    return result;
}

async function deleteAnime(uuid) {
    let result = await animesDal.deleteAnime(uuid);
    return result;
}

async function insertAnimes(season = false, year = false) {

    if (!season) season = getCurrentSeason('north'); // north hemisphere
    if (!year) year = new Date().getFullYear();
    let limit = await configService.getConfig('insert_limit', 25);

    let url = `https://api.jikan.moe/v4/seasons/${season}/${year}?limit=${limit}`;

    let data = await fetch(url).then(response => response.json());

    // on récupère tous les animés stockés pour ne pas insérer de doublons et mettre à jour ceux déjà enregistrés
    let allAnimes = await animesDal.getAllAnimes();

    let updateCount = 0;
    let insertCount = 0;
    let insertFails = [];
    let updateFails = [];
    data.data.forEach(anime => {
        if (!allAnimes.find(function (anime_db) {
            return anime.title == anime_db.title;
        })) { // si pas encore enregistré, insert
            if (animesDal.insertAnime(animeToArrayForInsert(anime))) { insertCount++; }
            else { insertFails.push(anime.title); }
        }
        else { // sinon update
            if (animesDal.updateAnime(animeToArrayForUpdate(anime))) { updateCount++; }
            else { updateFails.push(anime.title); }
        }
    });

    let result;
    if (insertFails.length != 0 || updateFails.length != 0) { // si il y a des erreurs
        result = {
            'error': 'Anime table insert/update fails',
            'updates': updateCount,
            'updateFails': updateFails,
            'inserts': insertCount,
            'insertFails': insertFails,
            'total': data.data.length
        };
    }
    else {
        result = {
            'updates': updateCount,
            'inserts': insertCount,
            'total': data.data.length
        };
    }
    return result;
}

async function getAnimesBySeason(year, season) {
    if (year === undefined) year = new Date().getFullYear();
    if (season === undefined) season = getCurrentSeason("north");
    let result = await animesDal.getAnimesBySeason(year, season);

    return result;
}
module.exports = { getAllAnimes, getAnimeByUuid, deleteAnime, insertAnimes, getAnimesBySeason }