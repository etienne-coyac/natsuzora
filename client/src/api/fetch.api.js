export const getAllAnimes = () => {
    return fetch("/api/animes/season/2022/summer", {
        method: 'GET'
    });
}