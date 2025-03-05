import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieDetails } from "../services/api";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMovieDetails(id);
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const releaseYear = new Date(movie.release_date).getFullYear();

  return (
    <div className="container mt-4">
      <button
        type="button"
        className="btn btn-secondary mb-3"
        onClick={() => navigate(-1)}
      >
        Back
      </button>
      <div className="row">
        <div className="col-md-4">
          <img
            src={`${import.meta.env.VITE_IMAGE_BASE_URL}${movie.poster_path}`}
            className="img-fluid"
            alt={movie.title}
          />
        </div>
        <div className="col-md-8">
          <h2>{movie.title}</h2>
          <p>
            <strong>Summary:</strong> {movie.overview}
          </p>
          <p>
            <strong>Release Year:</strong> {releaseYear}
          </p>
          <p>
            <strong>Rating:</strong> {movie.vote_average}
          </p>
          <div>
            <h4>Cast:</h4>
            <div className="row">
              {movie.cast.map((member, index) => (
                <div className="col-4 col-md-3 col-lg-2 mb-3" key={index}>
                  {member.profile_path ? (
                    <img
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}${
                        member.profile_path
                      }`}
                      className="img-fluid rounded"
                      alt={member.name}
                    />
                  ) : (
                    <div className="img-placeholder rounded bg-secondary text-white d-flex align-items-center justify-content-center">
                      No Image
                    </div>
                  )}
                  <p className="mt-2">{member.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
