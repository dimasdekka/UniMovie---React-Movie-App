import React from 'react'

// Daftar genre mapping (sesuaikan dengan kebutuhan Anda)
const GENRE_MAPPING = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western'
}

const MovieCard = ({ movie, onMovieClick }) => {
  const { 
    title, 
    vote_average, 
    poster_path, 
    release_date, 
    genre_ids 
  } = movie;

  // Ambil genre pertama dari array genre_ids
  const firstGenre = genre_ids?.[0] ? GENRE_MAPPING[genre_ids[0]] : 'Unknown Genre'

  return (
    <div className='movie-card' onClick={() => onMovieClick(movie)}>
      <img 
        src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : '/no-movie.png'} 
        alt={title} 
      />
      <div className='mt-4'>
        <h3>{title}</h3>
        <div className='content'>
          <div className='rating'>
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            <span>•</span>
            <p className='genre'>{firstGenre}</p>
            <span>•</span>
            <p className='year'>{release_date ? release_date.split('-')[0] : 'N/A'}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard