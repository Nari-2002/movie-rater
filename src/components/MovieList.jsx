import React, { useState, useEffect } from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import API from '../services/api-service';
import { useCookies } from 'react-cookie';


function MovieList({ movieClicked, newMovie, updatedMovie }) {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [token]=useCookies("mr-token")

    useEffect(() => {
        if (newMovie) {
            setMovies(prevMovies => [...prevMovies, newMovie]);
        }
    }, [newMovie]);

    useEffect(() => {
        if (updatedMovie) {
            const updatedMovies = movies.map(movie =>
                movie.id === updatedMovie.id ? { ...updatedMovie } : movie
            );
            setMovies(updatedMovies);
        }
    }, [updatedMovie]);

    useEffect(() => {
        const fetchListMovies=async()=>{
            const resp=await API.fetchMovies(token['mr-token']);
            if(resp) setMovies(resp)
        }
       fetchListMovies()
    }, []);
    const removeMovie=(movieToBeRemoved)=>{
        const resp=API.removeMovie(movieToBeRemoved.id,token['mr-token'])
        if(resp){
            const updatedMovies = movies.filter(movie =>movie.id !== movieToBeRemoved.id )
            setMovies(updatedMovies);
        }
        
    }

    if (error) return <h1>{error}</h1>;

    return (
        <div className='p-3 w-[350px] h-[500px] overflow-auto shadow-lg border border-gray-300 rounded-lg'>
            {movies.map(movie => (
                <div 
                    key={movie.id} 
                    className="flex items-center p-3 my-2 border border-gray-300 rounded-lg shadow-sm"
                >
                    {/* Title takes all available space */}
                    <div 
                        className="text-xl font-semibold flex-1 cursor-pointer hover:text-orange-300" 
                        onClick={() => movieClicked(movie, false)}
                    >
                        {movie.title}
                    </div>

                    {/* Edit & Delete Buttons */}
                    <div className="flex space-x-3">
                        <FaRegEdit 
                            className="text-lg cursor-pointer text-blue-500 hover:text-blue-700" 
                            onClick={(evt) => {
                                evt.stopPropagation();
                                movieClicked(movie, true);
                            }} 
                        />
                        
                        <MdDelete 
                            className="text-lg cursor-pointer text-red-500 hover:text-red-700" 
                            onClick={(evt) => {
                                evt.stopPropagation();
                                removeMovie(movie);
                            }} 
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export default MovieList;
