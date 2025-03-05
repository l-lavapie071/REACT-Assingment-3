import React, { useEffect, useState } from "react";
import { getMovies } from "./services/api";
import MovieList from "./components/MovieList";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("Top Rated");

  const fetchMovies = async (searchQuery) => {
    try {
      const moviesData = await getMovies(searchQuery);
      console.log(moviesData);
      setMovies(moviesData);
      setSource(searchQuery ? "Search Results" : "Top Rated");
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchMovies(query);
  };

  return (
    <div className="container mt-4">
      <form className="input-group mb-3" onSubmit={handleSearch}>
        <input
          type="text"
          className="form-control mr-2"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <h2>{source} Movies</h2>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
