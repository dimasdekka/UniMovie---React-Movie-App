import React from 'react';

// Genre mapping - same as in MovieCard
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
};

const MovieDetails = ({ movie, onClose }) => {
  // Convert genre IDs to names
  const genres = movie.genre_ids?.map(id => GENRE_MAPPING[id]).filter(Boolean) || [];
  
  // Format release date
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto py-10">
      <div className="pattern"></div>
      <div className="relative max-w-5xl w-full mx-4 rounded-xl overflow-hidden z-10">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-opacity-70 bg-dark-100 p-2 rounded-full z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="#E0FFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Movie header with poster and info */}
        <div className="flex flex-col lg:flex-row bg-dark-100/60 backdrop-blur-md border border-light-100/5">
          {/* Left poster */}
          <div className="lg:w-1/3">
            <img 
              className="w-full h-auto rounded-lg transform-gpu transition-transform hover:scale-105"
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} 
              alt={movie.title}
              style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.3)' }}
            />
          </div>
          
          {/* Right details */}
          <div className="lg:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2 mx-0 text-left max-w-full">
              {movie.title}
            </h1>
            
            <div className="flex items-center mb-4">
              <div className="flex flex-row items-center gap-2 bg-accent/10 px-3 py-1 rounded-full mr-4">
                <img src="/star.svg" alt="Star Icon" className="size-4 object-contain" />
                <p className="font-bold text-base text-accent">
                  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10
                </p>
              </div>
              <span className="year text-light-200 font-medium text-sm px-3 py-1 rounded-full bg-secondary/20">{releaseYear}</span>
              <span className="mx-2 text-light-200">•</span>
              <span className="text-light-200 font-medium text-sm">2h 46m</span>
            </div>
            
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {genres.map(genre => (
                <span 
                  key={genre} 
                  className="lang capitalize text-light-200 font-medium text-sm px-3 py-1 rounded-full bg-secondary/20"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            {/* Overview */}
            <div className="mb-4">
              <h2>Overview</h2>
              <p className="text-light-200">{movie.overview || 'No overview available.'}</p>
            </div>
            
            {/* Additional details */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <h4 className="text-gray-100">Release date</h4>
                <p className="text-light-200">{movie.release_date || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-gray-100">Vote count</h4>
                <p className="text-light-200">{movie.vote_count || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-gray-100">Popularity</h4>
                <p className="text-light-200">{movie.popularity?.toFixed(1) || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-gray-100">Original language</h4>
                <p className="text-light-200">{movie.original_language?.toUpperCase() || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;