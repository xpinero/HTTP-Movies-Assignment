import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import MovieForm from './Movies/MovieForm';
import MovieAdd from './Movies/MovieAdd';
import axios from 'axios';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  const updateMovie = updatedMovie => {
    const updatedMovies = movieList.map((movie) => {
      if (movie.id === updatedMovie.id) {
        return updatedMovie
      }
      return movie
    }) 
    setMovieList(updatedMovies)
  }

  useEffect(() => {
    getMovieList();
  }, [movieList]);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>
      
      <Route path='/update-movie/:id'>
        <MovieForm updateMovie={updateMovie} />
      </Route>

      <Route exact path='/add-movie'>
        <MovieAdd />
      </Route>
    </>
  );
};

export default App;
