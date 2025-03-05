import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getMovies } from "./services/api";
import Home from "./components/Home";
import MovieDetails from "./components/MovieDetails";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("Top Rated");

  const fetchMovies = async (searchQuery) => {
    try {
      const moviesData = await getMovies(searchQuery);
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
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                movies={movies}
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                source={source}
              />
            }
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
