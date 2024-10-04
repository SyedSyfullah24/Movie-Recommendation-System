// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import ArticleCard from '../components/ArticleCard';
// import LoadingSpinner from '../components/LoadingSpinner';

// const NewsFeed = () => {
//   const [articles, setArticles] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef();

//   const fetchArticles = useCallback(async () => {
//     if (loading) return; // Prevent multiple fetches
//     setLoading(true);
//     console.log(`Fetching page ${page}...`);
//     try {
//       // Using JSONPlaceholder API for mock data
//       const response = await fetch(
//         `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
//       );
//       const data = await response.json();

//       // If the data is empty, set hasMore to false
//       if (data.length === 0) {
//         setHasMore(false);
//       } else {
//         setArticles((prevArticles) => [...prevArticles, ...data]);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//       setLoading(false);
//     }
//   }, [page, loading]);

//   useEffect(() => {
//     if (hasMore) {
//       fetchArticles();
//     }
//   }, [fetchArticles, hasMore]);

//   const lastArticleElementRef = useCallback(
//     (node) => {
//       if (loading || !hasMore) return;
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting) {
//           console.log('Last element in view, loading more...');
//           setPage((prevPage) => prevPage + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [loading, hasMore]
//   );

//   return (
//     <div className="news-feed">
//       {articles.map((article, index) => {
//         if (articles.length === index + 1) {
//           return (
//             <div ref={lastArticleElementRef} key={article.id}>
//               <ArticleCard
//                 title={article.title}
//                 description={article.body}
//               />
//             </div>
//           );
//         } else {
//           return (
//             <ArticleCard
//               key={article.id}
//               title={article.title}
//               description={article.body}
//             />
//           );
//         }
//       })}
//       {loading && <LoadingSpinner />}
//       {!hasMore && <div>No more articles to load.</div>}
//     </div>
//   );
// };

// export default NewsFeed;

import React, { useEffect, useState, useRef, useCallback } from 'react';
import MovieCard from '../components/MovieCard'; // Ensure this file path is correct
import LoadingSpinner from '../components/LoadingSpinner'; // Ensure this file path is correct

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const fetchMovies = useCallback(async () => {
    if (loading) return;
    setLoading(true);
    try {
      const apiKey = 'b3025798d43b0aa539630ffad8d7bd59'; // Replace with your TMDb API key
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
      const response = await fetch(url);
      const data = await response.json();

      const newMovies = data.results;

      setMovies((prevMovies) => [...prevMovies, ...newMovies]);
      setHasMore(data.page < data.total_pages); // Check if there are more pages to load
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  }, [page, loading]);

  useEffect(() => {
    if (hasMore) {
      fetchMovies();
    }
  }, [fetchMovies, hasMore]);

  const lastMovieElementRef = useCallback(
    (node) => {
      if (loading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1); // Load next page of movies
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <div className="movie-list">
      {movies.map((movie, index) => {
        if (movies.length === index + 1) {
          return (
            <div ref={lastMovieElementRef} key={movie.id}>
              <MovieCard
                title={movie.title}
                description={movie.overview}
                poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Use TMDb poster image
              />
            </div>
          );
        } else {
          return (
            <MovieCard
              key={movie.id}
              title={movie.title}
              description={movie.overview}
              poster={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // Use TMDb poster image
            />
          );
        }
      })}
      {loading && <LoadingSpinner />}
      {!hasMore && <div className="no-more-movies">No more movies to load.</div>}
    </div>
  );
};

export default MovieList;
