const configService = require('./../services/config.service');

const db = require('./pool.dal');



async function getAllAnimes(enable_nsfw) {
    let selectRequest = 'SELECT * FROM anime WHERE deleted=false';
    if (enable_nsfw == 0) {
        let exclude_genres = await configService.getConfig('nsfw_genres');
        selectRequest += ' AND NOT(genres ?| array[' + exclude_genres + ']) ORDER BY mal_popularity';
    }
    let result = await db.query(selectRequest)
        .catch(errSQL => { console.error(errSQL.stack); return { rows: [] }; }
        );
    console.log(result.rows)
    return result.rows;
}

async function getAnimeByUuid(uuid) {
    let result = db.query('SELECT * FROM anime WHERE uuid=$1', [uuid])
        .catch(errSQL => { console.error(errSQL.stack); return { rows: [] }; }
        );
    return (await result).rows;
}

async function deleteAnime(uuid) {
    const deleteRequest = "UPDATE anime SET deleted=true WHERE uuid=$1 AND deleted=false";
    let result = await db.query(deleteRequest, [uuid])
        .then(resSQL => { return true; })
        .catch(errSQl => { console.error(errSQL.stack); return false; });
    return result;
}

async function insertAnime(anime) {
    const insertRequest = "INSERT INTO anime (uuid, title, title_english, synopsis, episodes, genres, themes, demographics, studios, aired_begin, aired_end, image_url, youtube_trailer, mal_popularity, season, year) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)";
    let result = await db.query(insertRequest, anime)
        .then(resSQL => { return true; })
        .catch(errSQL => { console.error(errSQL.stack); return false; })
    return result
}

async function updateAnime(anime) {
    const updateRequest = "UPDATE anime SET synopsis=$1, episodes=$2, genres=$3, themes=$4, demographics=$5, studios=$6, aired_begin=$7, aired_end=$8, image_url=$9, youtube_trailer=$10, mal_popularity=$11, season=$12, year=$13 WHERE title=$14 AND deleted=false AND no_update=false";
    let result = await db.query(updateRequest, anime)
        .then(resSQL => { return true; })
        .catch(errSQL => { console.error(errSQL.stack); return false; })
    return result
}

async function getAnimesBySeason(year, season) {
    const selectRequest = "SELECT * FROM anime WHERE year=$1 AND season=$2 AND deleted=false ORDER BY mal_popularity";
    let result = await db.query(selectRequest, [year, season])
        .catch(errSQL => { console.error(errSQL.stack); return { rows: [] }; });
    return result.rows;
}

module.exports = { getAllAnimes, getAnimeByUuid, deleteAnime, insertAnime, updateAnime, getAnimesBySeason }
