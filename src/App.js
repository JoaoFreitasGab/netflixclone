import React, { useEffect, useState } from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/Movie.Row/MovieRow';
import FeatureMovie from './components/FeatureMovie/FeatureMovie';
import Header from './components/Header/Header';

export default () => {

    const [movieList, setMovieList] = useState([]);
    const [featuredData, setFeaturedData] = useState(null);
    const [blackHeader, setBlackHeader] = useState(false);

    useEffect(() => {
        const LoadAll = async () => {
            //Pega a lista total de filmes e séries
            let list = await Tmdb.getHomeList();
            setMovieList(list);

            //pegando o filme em destaque

            let originals = list.filter(i => i.slug === 'originals');
            let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
            let chosen = originals[0].items.results[randomChosen];
            let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
            setFeaturedData(chosenInfo);
        }

        LoadAll();
    }, []);

    useEffect(() => {
        const scrollListener = () => {
            if(window.scrollY > 10) {
                setBlackHeader(true);
            } else setBlackHeader(false);

        }

        window.addEventListener('scroll', scrollListener);
        return () => {
            window.removeEventListener('scroll', scrollListener);
        }

    }, []);


    return (
        <div className="page">
            <Header black={blackHeader} ></Header>
            {featuredData &&
                <FeatureMovie item={featuredData} />
            }
            <section className="lists">
                {movieList.map((item, key) => (
                    <>
                        <MovieRow key={key} title={item.title} items={item.items}></MovieRow>
                    </>
                ))}
            </section>
            <footer>
                Feito com <span role="img" aria-label="coração">❤</span> por João Gabriel <br/>
                Direitos de imagem para Netflix <br/>
                Dados pegos do site Themoviedb.org <br/>
            </footer>
        </div>
        

    );
}