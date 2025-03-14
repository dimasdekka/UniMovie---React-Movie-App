import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import MovieDetails from './components/MovieDetails';
import { useDebounce } from 'react-use';
import { updateSearchCount, getTrendingMovies } from './appwrite.js';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchTerm, setDebounceSearchTerm] = useState('');
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  
  useDebounce(
    () => {
      setDebounceSearchTerm(searchTerm)
    },
    1000, // Delay 1000 ms
    [searchTerm] // Dependencies
  );

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const endpoint = query 
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}` 
        : `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
      
      const response = await fetch(endpoint, API_OPTIONS);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch movies. Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.response === 'false') {
        setErrorMessage(data.error || 'Failed to fetch movies');
        setMovieList([]);
        return;
      }
      
      setMovieList(data.results || []);
      
      if (query && data.results?.length > 0) {
        try {
          await updateSearchCount(query, data.results[0]);
        } catch (appwriteError) {
          console.error("Failed to update search count:", appwriteError);
        }
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      setErrorMessage('Error fetching movies please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMovieDetails = async (movieId) => {
    setLoadingDetails(true);
    try {
      const endpoint = `${API_BASE_URL}/movie/${movieId}?append_to_response=credits,videos`;
      const response = await fetch(endpoint, API_OPTIONS);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch movie details. Status: ${response.status}`);
      }
      
      const data = await response.json();
      setMovieDetails(data);
    } catch (error) {
      console.error(`Error fetching movie details: ${error}`);
    } finally {
      setLoadingDetails(false);
    }
  };

  const fetchMovieById = async (movieId) => {
    try {
      const endpoint = `${API_BASE_URL}/movie/${movieId}`;
      const response = await fetch(endpoint, API_OPTIONS);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch movie. Status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching movie by ID: ${error}`);
      return null;
    }
  };

  const loadTrendingMovies = async () => {
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log(error);
    }
  };

  // Function to handle regular movie click
  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    fetchMovieDetails(movie.id);
  };
  
  // Function to handle trending movie click
  const handleTrendingMovieClick = async (trendingMovie) => {
    try {
      setLoadingDetails(true);
      // Trending movie from Appwrite contains movie_id
      if (trendingMovie.movie_id) {
        // Fetch full movie data from TMDB using the movie_id
        const movieData = await fetchMovieById(trendingMovie.movie_id);
        if (movieData) {
          setSelectedMovie(movieData);
          fetchMovieDetails(movieData.id);
        }
      } else {
        // Fallback if movie_id is not available
        console.log("Movie ID not available in trending movie data");
      }
    } catch (error) {
      console.error(`Error handling trending movie click: ${error}`);
    } finally {
      setLoadingDetails(false);
    }
  };
  
  // Function to close movie details
  const handleCloseDetails = () => {
    setSelectedMovie(null);
    setMovieDetails(null);
  };

  useEffect(() => {
    fetchMovies(debounceSearchTerm);
  }, [debounceSearchTerm]);

  useEffect(() => {
    loadTrendingMovies();
  }, []);

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className='text-gradient'>Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        
        {trendingMovies.length > 0 && (
          <section className='trending'>
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
                <li 
                  key={movie.$id} 
                  className="cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleTrendingMovieClick(movie)}
                >
                  <p>{index + 1}</p>
                  <img src={movie.poster_url} alt={movie.searchTerm} />
                </li>
              ))}
            </ul>
          </section>
        )}
        
        <section className='all-movies'>
          <h2 className='mt-[40px]'>Popular Movies</h2>
          {isLoading ? (  
            <Spinner />
          ) : errorMessage ? (
            <p className='text-red-500'>{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <MovieCard 
                  key={movie.id} 
                  movie={movie} 
                  onMovieClick={handleMovieClick}
                />
              ))}
            </ul>
          )}
        </section>
      </div>
      
      {/* Movie details modal */}
      {selectedMovie && (
        <MovieDetails 
          movie={selectedMovie}
          details={movieDetails}
          isLoading={loadingDetails} 
          onClose={handleCloseDetails} 
        />
      )}
    </main>
  );
};

export default App;