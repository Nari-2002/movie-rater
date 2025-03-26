import { useState } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import MovieForm from './components/MovieForm';

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [newMovie,setNewMovie]=useState(null)

  const movieClicked = (movie, isEdit) => {
    if (isEdit) {
      setEditedMovie(movie);  // Show MovieForm
      setSelectedMovie(null); // Hide MovieDetails
    } else {
      setSelectedMovie(movie); // Show MovieDetails
      setEditedMovie(null);    // Hide MovieForm
    }
  };

  const createNewMovie=()=>{
    setSelectedMovie(null)
    setEditedMovie({title:'',description:''})
  }

  return (
    <div className="App">
      <header className="App-header p-10">
        <div>
          <h1 className='text-3xl font-bold'>Movie Rater</h1>
        </div>
      </header>
      <div className="grid grid-cols-[1fr_2fr]">
        <div>
          <MovieList movieClicked={movieClicked} newMovie={newMovie}/>
          <button onClick={()=>createNewMovie()}>Create New Movie</button>
        </div>
        {editedMovie ? (
          <MovieForm movie={editedMovie} updateMovie={setNewMovie} />
        ) : (
          <MovieDetails movie={selectedMovie} updateMovie={setSelectedMovie} />
        )}
      </div>
    </div>
  );
}

export default App;
