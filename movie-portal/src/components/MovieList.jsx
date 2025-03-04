import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function MovieList({ movies }) {
  const roundToNearestTenth = (value) => {
    return Math.round(value * 10) / 10;
  };
  return (
    <div className="container">
      <h1 className="my-4">Top Rated Movies</h1>
      <div className="row">
        {movies.map((movie) => (
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
    </div>
  );
}
//import.meta.env.VITE_IMAGE_BASE_URL
export default MovieList;
