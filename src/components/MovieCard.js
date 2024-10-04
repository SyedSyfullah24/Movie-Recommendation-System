import React from 'react';

const MovieCard = ({ title, description, poster }) => {
  return (
    <div className="movie-card">
      <img src={poster} alt={title} /> {/* Display the movie poster */}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default MovieCard;
