import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Pagination from "react-bootstrap/Pagination";

const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

function MovieList({ movies }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const moviesPerPage = 6;

  const roundToNearestTenth = (value) => {
    return Math.round(value * 10) / 10;
  };

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    setCurrentPage(1); // Reset to first page when genre changes
  };

  const filteredMovies = selectedGenre
    ? movies.filter((movie) =>
        movie.genre_ids.includes(parseInt(selectedGenre))
      )
    : movies;

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = filteredMovies.slice(
    indexOfFirstMovie,
    indexOfLastMovie
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredMovies.length / moviesPerPage);

  return (
    <div className="container">
      <h1 className="my-4">Top Rated Movies</h1>
      <div className="mb-4">
        <label htmlFor="genre-select">Filter by Genre: </label>
        <select
          id="genre-select"
          value={selectedGenre}
          onChange={handleGenreChange}
        >
          <option value="">All</option>
          {Object.entries(genres).map(([id, name]) => (
            <option key={id} value={id}>
              {name}
            </option>
          ))}
        </select>
      </div>
      <div className="row">
        {currentMovies.map((movie) => (
          <div className="col-6 col-md-4 col-lg-3 col-xl-2 mb-4" key={movie.id}>
            <div className="card h-100">
              <img
                src={`${import.meta.env.VITE_IMAGE_BASE_URL}${
                  movie.poster_path
                }`}
                className="card-img-top"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="card-text">
                  Release Year: {new Date(movie.release_date).getFullYear()}
                </p>
                <p className="card-text">
                  Rating: {roundToNearestTenth(movie.vote_average)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Pagination>
        {[...Array(totalPages).keys()].map((number) => (
          <Pagination.Item
            key={number + 1}
            active={number + 1 === currentPage}
            onClick={() => paginate(number + 1)}
          >
            {number + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default MovieList;
