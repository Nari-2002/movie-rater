import React, { useEffect, useState } from 'react'
import API from '../services/api-service'

function MovieForm({movie,updateMovie}) {
  const [title,setTitle]=useState('')
  const [description,setDescription]=useState('')

  useEffect(()=>{
    setTitle(movie.title)
    setDescription(movie.description)

  },[movie])
  const saveMovie=async()=>{
    const resp=await API.updateMovie(movie.id,{title,description})
    if(resp){
      updateMovie(resp);
    }
  }
  const createMovie=async()=>{
    const resp=await API.createMovie(movie.id,{title,description})
    // if(resp){
    //   createMovie(resp);
    // }
  }
  return (
    <React.Fragment>
      <div className='grid grid-cols-[auto_1fr] gap-2 border border-white p-5 rounded-lg'>
          <label htmlFor='title'>Title</label>
          <input 
              type='text' 
              placeholder='Title' 
              value={title} 
              className='text-gray-800 p-1 h-8' 
              onChange={(evt) => setTitle(evt.target.value)} 
          />

          <label htmlFor='description'>Description</label>
          <textarea 
              placeholder='Description' 
              value={description} 
              className='text-gray-800 p-1' 
              onChange={(evt) => setDescription(evt.target.value)}
          ></textarea>
          {movie.id?<div className="col-span-2 flex justify-center mt-3">
              <button onClick={() => saveMovie()} className='border p-2 h-10 text-center rounded-xl'>
                  Update Movie
              </button>
          </div>:<div className="col-span-2 flex justify-center mt-3">
              <button onClick={() => createMovie()} className='border p-2 h-10 text-center rounded-xl'>
                  Create Movie
              </button>
          </div>
          
          }
          {/* Centering the button */}
          
      </div>

    </React.Fragment>
  )
}

export default MovieForm