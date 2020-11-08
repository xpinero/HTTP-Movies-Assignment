import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

const MovieForm = ({ updateMovie }) => {
  const [title, setTitle] = useState();
  const [director, setDirector] = useState();
  const [metascore, setMetascore] = useState();
  const [movie, setMovie] = useState(null);
  const params = useParams();
  const history = useHistory();


  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res.data)
        setMovie(res.data);
        setTitle(res.data.title);
        setDirector(res.data.director);
        setMetascore(res.data.metascore);
      })
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const save = async (e) => {
    e.preventDefault();
    const res = await axios.put(`http://localhost:5000/api/movies/${movie.id}`, {
      ...movie,
      title,
      director,
      metascore,
    });
    updateMovie(res.data);
    history.replace(`/`);

  };

  return (
    <div>
      <form onSubmit={save}>
        <h1>Edit Movie</h1>
        <br />
        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
        <br />
        <input value={director} onChange={(e) => setDirector(e.target.value)}></input>
        <br />
        <input value={metascore} onChange={(e) => setMetascore(parseInt(e.target.value))} type="number"></input>
        <br />
        <button>Save</button>
      </form>
    </div>
  );
};

export default MovieForm;
