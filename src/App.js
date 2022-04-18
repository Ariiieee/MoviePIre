import React, { useState, useEffect } from "react";
import "./app.css";
import SearchIcon from "./search.svg";

import MovieCard from "./components/MovieCard";

const API_URL = "http://www.omdbapi.com?apikey=40fbbf59";

// const movie1 = {
//   Title: "Shrek Forever After",
//   Year: "2010",
//   imdbID: "tt0892791",
//   Type: "movie",
//   Poster:
//     "https://m.media-amazon.com/images/M/MV5BMTY0OTU1NzkxMl5BMl5BanBnXkFtZTcwMzI2NDUzMw@@._V1_SX300.jpg",
// };

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("shrek");
  }, []);

  return (
    <div className="app">
      <h1>Moviepire</h1>

      <div className="search">
        <input
          placeholder="search your movies here"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => {
            searchMovies(searchTerm);
          }}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};
export default App;
