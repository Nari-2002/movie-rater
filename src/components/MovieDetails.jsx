import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

function MovieDetails({ movie, updateMovie }) {
    const [highlighted, setHighlighted] = useState(-1);
    const [error, setError] = useState(null);

    if (!movie) return <h1>Select a movie to view details</h1>;

    const rateMovie = async (rate) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/rate_movie/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token f0c7456a04cbadc07c1625a8935dc7984fce4804"
                },
                body: JSON.stringify({ stars: rate })
            });

            if (!response.ok) {
                setError("Error in setting rating");
                return;
            }

            await fetchUpdatedMovie();  // Fetch latest movie data
        } catch (error) {
            setError("Error in rating movie");
        }
    };

    const fetchUpdatedMovie = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/movies/${movie.id}/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token f0c7456a04cbadc07c1625a8935dc7984fce4804"
                }
            });

            if (!response.ok) {
                setError("Error fetching updated movie");
                return;
            }

            const updatedMovie = await response.json();
            updateMovie(updatedMovie);  // Update state in `App.js`
            setError("Rating updated successfully!");
        } catch (error) {
            setError("Error fetching updated movie");
        }
    };

    return (
        <React.Fragment>
            {movie && <div>
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

                {error && <p>{error}</p>}
            </div>}
        </React.Fragment>
    );
}

export default MovieDetails;
