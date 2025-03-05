import React from "react";
import MovieList from "./MovieList";

function Home({ movies, query, setQuery, handleSearch, source }) {
  return (
    <div>
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

export default Home;
