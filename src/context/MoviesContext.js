import React, { useState } from 'react';

const MoviesContext = React.createContext();

export const MoviesProvider = ({ children }) => {

    const [likedMovies, setLikedMovies] = useState([]);
    const [APIkey, setAPIkey] = useState('7d9a9e8e4f9bc18fd52a2d2a0d34478a');
    const [recommended, setRecommended] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [cast, setCast] = useState([]);
    const [genres, setGenres] = useState([]);
    const [homepage, setHomepage] = useState('');
    const [release, setRelease] = useState('');
    const [company, setCompany] = useState('');
    const [theme, setTheme] = useState(
        {
            name: 'light',
            primary: '#2d3847',
            accent: '#60A2D3'
        }
    );

    const addLikedMovie = (movieId) => {
        setLikedMovies(
            [...likedMovies, movieId]
        );
    };

    const removeLikedMovie = (movieId) => {
        setLikedMovies(
            likedMovies.filter((e) => e !== movieId)
        );
    };

    const changeTheme = () => {
        if (theme.name === 'dark') {
            setTheme({
                name: 'light',
                primary: '#2d3847',
                accent: '#60A2D3'
            });
        } else {
            setTheme({
                name: 'dark',
                primary: '#232323',
                accent: '#121212'
            });
        }
    };

    const getRecommended = async () => {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${APIkey}&language=en-US&page=1`);
            let json = await response.json();
            setRecommended(json.results);
        } catch (error) {
            console.error(error);
        }
    };

    const getTopRated = async () => {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIkey}&language=en-US&page=1`);
            let json = await response.json();
            setTopRated(json.results);
        } catch (error) {
            console.error(error);
        }
    };

    const getCast = async (id) => {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIkey}`);
            let json = await response.json();
            setCast(json.cast);
        } catch (error) {
            console.error(error);
        }
    };

    const getDetails = async (id) => {
        try {
            let response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIkey}&language=en-US`);
            let json = await response.json();
            setGenres(json.genres);
            setHomepage(json.homepage);
            const date = new Date(json.release_date);
            setRelease(date.getFullYear());
            if (json.production_companies.length !== 0) {
                setCompany(json.production_companies[0].name);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <MoviesContext.Provider value={{ APIkey, theme, changeTheme, getRecommended, recommended, getTopRated, topRated, likedMovies, addLikedMovie, removeLikedMovie, getCast, getDetails, cast, genres, release, homepage, company }}>
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContext;