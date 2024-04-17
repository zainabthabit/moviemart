import { useMovies } from '../state/movies';
import { useEffect } from 'react';
import MoviesSlider from './MoviesSlider/MoviesSlider';
import GeneralMovieSlider from './MoviesSlider/GeneralMovieSlider';
export const HomePage = () => {
    const { movies, getNowPlaying, getTopRated, getPopular, getUpcoming } = useMovies((state) => state)
    useEffect(() => {
        getNowPlaying()
    }, [])
    useEffect(() => {
        getTopRated()
    }, [])
    useEffect(() => {
        getPopular()
    }, [])
    useEffect(() => {
        getUpcoming()
    }, [])
    return (
        <div className="pl-10 pr-10">
            <MoviesSlider movies={ movies.nowPlaying } />
            <h3 className=' pt-24 pb-10 text-2xl text-left'> Top Rated Movies</h3>
            <GeneralMovieSlider movies={ movies.topRated } />
            <h3 className=' pt-24 pb-10 text-2xl text-left'> Most Popular Movies</h3>
            <GeneralMovieSlider movies={ movies.popular } />
            <h3 className=' pt-24 pb-10 text-2xl text-left'> Upcoming Movies</h3>
            <GeneralMovieSlider movies={ movies.upcoming } />

        </div>
    )
}