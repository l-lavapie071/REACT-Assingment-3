export const getMovies = async (query) => {
  try {
    const url = query
      ? `${import.meta.env.VITE_API_URL}/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${encodeURIComponent(query)}`
      : `${import.meta.env.VITE_API_URL}/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error.message);
    throw error;
  }
};

export const getMovieDetails = async (id) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=credits`);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const data = await response.json();
    const cast = data.credits.cast.map(member => ({
      name: member.name,
      profile_path: member.profile_path,
    }));
    return { ...data, cast };
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    throw error;
  }
};