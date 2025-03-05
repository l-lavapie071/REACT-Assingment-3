export const getMovies = async (query) => {
  try {
    const url = query
      ? `${import.meta.env.VITE_API_URL}/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(query)}`
      : `${import.meta.env.VITE_API_URL}/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`;

    const response = await fetch(url);
    console.log(response);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};