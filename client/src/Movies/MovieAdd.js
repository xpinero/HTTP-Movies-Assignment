import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const MovieAdd = props => {
  const [newMovie, setNewMovie] = useState({
    title:'',
    director:'',
    metascore:'',
    stars:[],
  });
  const history = useHistory();

  const handleChange = e => {
    e.persist();
    let value = e.target.value;

    setNewMovie({
      ...newMovie,
      [e.target.name]: value
    })
    console.log(newMovie);
  };

  const handleSubmit = e => {
    axios.post(`http://localhost:5000/api/movies/`, newMovie)
    .then(res => {history.push('/')})
    .catch(err => console.log(err));
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Movie</h1>
      <input name='title' value={newMovie.title} onChange={handleChange} placeholder='Film Title' />
      <input name='director' value={newMovie.director} onChange={handleChange} placeholder='Director' />
      <input name='metascore' value={newMovie.metascore} onChange={handleChange} placeholder='Metascore' />
      <button>Submit</button>
    </form>
  )
};

export default MovieAdd;