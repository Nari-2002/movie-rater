import React, { useEffect, useState } from 'react'
import API from '../services/api-service'

function MovieForm({ movie, updateMovie, addNewMovie }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(movie?.title || '');
    setDescription(movie?.description || '');
  }, [movie]);

  // Save existing movie
  const saveMovie = async () => {
    const resp = await API.updateMovie(movie.id, { title, description });
    if (resp) {
      updateMovie(resp);
    }
  };

  // Create new movie
  const createMovie = async () => {
    const response = await API.createMovie({ title, description });
    if (response) {
      addNewMovie(response);
    }
  };

  return (
    <div className=" h-[400px] p-4 border border-gray-400 rounded-lg shadow-lg flex flex-col">
      <label className="text-lg font-semibold mb-1" htmlFor='title'>Title</label>
      <input 
        type='text' 
        placeholder='Enter title' 
        value={title} 
        className='text-gray-800 p-2 border border-gray-300 rounded-md mb-3' 
        onChange={(evt) => setTitle(evt.target.value)} 
      />

      <label className="text-lg font-semibold mb-1" htmlFor='description'>Description</label>
      <textarea 
        placeholder='Enter description' 
        value={description} 
        className='text-gray-800 p-2 border border-gray-300 rounded-md h-40 resize-none overflow-auto' 
        onChange={(evt) => setDescription(evt.target.value)}
      ></textarea>

      <div className="flex justify-center mt-4">
        {movie.id ? (
          <button onClick={saveMovie} className='px-4 py-2 bg-blue-500 text-white rounded-lg'>
            Update Movie
          </button>
        ) : (
          <button onClick={createMovie} className='px-4 py-2 bg-green-500 text-white rounded-lg'>
            Create Movie
          </button>
        )}
      </div>
    </div>
  )
}

export default MovieForm;
