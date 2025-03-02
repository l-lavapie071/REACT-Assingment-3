import React from "react";

function MovieList({ movies }) {
  return (
    <div>
      <h1>Popular Movies</h1>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            {movie.title} | {movie.release_date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieList;
