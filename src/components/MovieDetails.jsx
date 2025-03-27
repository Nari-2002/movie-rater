import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import API from '../services/api-service';
import { useCookies } from 'react-cookie';

function MovieDetails({ movie, updateMovie }) {
    const [highlighted, setHighlighted] = useState(-1);
    const [error, setError] = useState(null);
    const [token]=useCookies("mr-token")

    if (!movie) return <h1>Select a movie to view details</h1>;

    const rateMovie = async (rate) => {
        try {
            const response = await API.rateMovie(movie.id, { stars: rate },token["mr-token"]);

            if (response) {
                fetchUpdatedMovie();
            }
        } catch (err) {
            setError("Failed to rate movie.");
        }
    };

    const fetchUpdatedMovie = async () => {
        try {
            const response = await API.getMovie(movie.id,token["mr-token"]);

            if (response) {
                updateMovie(response);
            }
        } catch (err) {
            setError("Failed to update movie details.");
        }
    };

    return (
        <div className='p-5'>
            <h1 className='text-2xl pb-3'>{movie.title}</h1>
            <p className='text-xl pb-5'>{movie.description}</p>

            <div className='flex'>
                {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={movie.avg_rating > i ? 'text-orange-400' : ''} />
                ))}
                <span className="pl-2">({movie.no_of_ratings})</span>
            </div>

            <h1>Rate the Movie</h1>
            <div className='flex text-2xl'>
                {[...Array(5)].map((_, i) => (
                    <FaStar
                        key={i}
                        className={highlighted > i ? 'text-purple-400' : ''}
                        onMouseEnter={() => setHighlighted(i + 1)}
                        onMouseLeave={() => setHighlighted(-1)}
                        onClick={() => rateMovie(i + 1)}
                    />
                ))}
            </div>

            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
}

export default MovieDetails;
