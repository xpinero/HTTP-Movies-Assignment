import React from "react";
import { Link, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function MovieList({ movies }) {
  const history = useHistory();

  return (
    <div>
    <button onClick={() => history.push('/add-movie')}>Add</button>
    <div className="movie-list">
      {
        movies.map(movie => (
          <Link key={movie.id} to={`/movies/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      }
      
    </div>
    </div>
    
  );
}

export default MovieList;
