import React, { useState, useEffect } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function MovieList({ movieClicked,newMovie }) {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (newMovie) {  // Ensure newMovie is not null before accessing properties
            const updatedMovies = movies.map(movie =>
                movie.id === newMovie.id ? {...newMovie} : movie
            );
            setMovies(updatedMovies);
            console.log(updatedMovies)
        }
    }, [newMovie]);
    

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/movies/', {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": "Token f0c7456a04cbadc07c1625a8935dc7984fce4804"
                    }
                });

                if (!response.ok) {
                    setError("Error in getting movies");
                    return;
                }

                const result = await response.json();
                setMovies(result);
            } catch (error) {
                setError("Error in getting movies");
            }
        };

        fetchMovies();
    }, []);

    if (error) return <h1>{error}</h1>;

    return (
        <div className='p-3'>
            {movies.map(movie => (
                <div 
                    key={movie.id} 
                    className="flex items-center justify-between px-4 py-3 m-1 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-black active:scale-95 transition"
                    onClick={() => movieClicked(movie, false)} // Click selects movie
                >
                    <h2 className="text-xl font-semibold">{movie.title}</h2>

                    {/* Buttons Container */}
                    <div className="flex space-x-4"> 
                        <FaRegEdit 
                            className="text-lg cursor-pointer" 
                            onClick={(evt) => {
                                evt.stopPropagation(); // ⛔ Prevent parent div click
                                movieClicked(movie, true);
                            }} 
                        />
                        
                        <MdDelete className="text-lg cursor-pointer" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MovieList;
