import React, { useEffect, useState } from "react";
import { getMovies } from "./services/api";
import MovieList from "./components/MovieList";

function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies();
        console.log(moviesData);
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <MovieList movies={movies} />
    </div>
  );
}

export default App;
