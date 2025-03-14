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
    <div className="fixed inset-0 bg-[#0d0d14] bg-opacity-95 flex items-center justify-center z-50 overflow-auto py-10">
      <div className="relative max-w-5xl w-full mx-4 rounded-lg bg-[#15151f] text-white overflow-hidden">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-opacity-70 bg-black p-2 rounded-full z-10"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Movie header with poster and info */}
        <div className="flex flex-col lg:flex-row">
          {/* Left poster */}
          <div className="lg:w-1/3">
            <img 
              className="w-full h-auto"
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : '/no-movie.png'} 
              alt={movie.title}
            />
          </div>
          
          {/* Right details */}
          <div className="lg:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
            
            <div className="flex items-center mb-4">
              <div className="bg-indigo-400 text-black font-bold px-2 py-1 rounded flex items-center mr-4">
                <img src="star.svg" alt="Star Icon" className="w-4 h-4 mr-1" />
                <span>{movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}/10</span>
              </div>
              <span>{releaseYear}</span>
              <span className="mx-2">•</span>
              <span>2h 46m</span> {/* Note: You'll need to get actual runtime from API */}
            </div>
            
            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-4">
              {genres.map(genre => (
                <span 
                  key={genre} 
                  className="bg-[#21212b] px-3 py-1 rounded-full text-sm"
                >
                  {genre}
                </span>
              ))}
            </div>
            
            {/* Overview */}
            <div className="mb-4">
              <h3 className="text-xl mb-2">Overview</h3>
              <p className="text-gray-300">{movie.overview || 'No overview available.'}</p>
            </div>
            
            {/* Additional details */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <h4 className="text-gray-400">Release date</h4>
                <p>{movie.release_date || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-gray-400">Vote count</h4>
                <p>{movie.vote_count || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-gray-400">Popularity</h4>
                <p>{movie.popularity?.toFixed(1) || 'N/A'}</p>
              </div>
              <div>
                <h4 className="text-gray-400">Original language</h4>
                <p>{movie.original_language?.toUpperCase() || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;