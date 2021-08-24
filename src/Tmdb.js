const API_KEY = '9a0e3c2478a2eda782a80e8f91d2e043';
const API_BASE = 'https://api.themoviedb.org/3';

/*
- originais netflix
- recomendados netflix
- em destaque (top rated)
- ação
- comédia
*/

const basicFecth = async (endpoint) => {
    return (await fetch(`${API_BASE}${endpoint}`)).json();
}

export default {
    getHomeList: async () => {
        return [
            {
                slug: 'originals',
                title: "Originais do Netflix",
                items: await basicFecth(`/discover/tv/?with_network=213&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'trending',
                title: "Recomendados para Você",
                items: await basicFecth(`/trending/all/week?language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'toprated',
                title: "Em Alta",
                items: await basicFecth(`/movie/top_rated?&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'action',
                title: "Ação",
                items: await basicFecth(`/discover/movie?with_genres=28&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'comedy',
                title: "Comédia",
                items: await basicFecth(`/discover/movie?with_genres=35&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'horror',
                title: "Terror",
                items: await basicFecth(`/discover/movie?with_genres=27&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'romance',
                title: "Romance",
                items: await basicFecth(`/discover/movie?with_genres=10749&language=pt-BR&api_key=${API_KEY}`)
            },
            {
                slug: 'documentary',
                title: "Documentários",
                items: await basicFecth(`/discover/movie?with_genres=99&language=pt-BR&api_key=${API_KEY}`)
            },
        ]
    },

    getMovieInfo: async (movieID, type) => {
        let info = {};

        if (movieID) {
            switch (type) {
                case 'movie':
                    info = await basicFecth(`/movie/${movieID}?language=pt-BRapi_key=${API_KEY}`);
                    break;
                case 'tv':
                    info = await basicFecth(`/tv/${movieID}?language=pt-BR&api_key=${API_KEY}`);
                    break;
                default:
                    info = null;
                    break;
            }
        }

        return info;
    }
}