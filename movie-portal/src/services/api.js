export const getMovies = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/movie/top_rated?api_key=${import.meta.env.VITE_API_KEY}`);
     /*    console.log(import.meta.env.VITE_API_URL);
        console.log(import.meta.env.VITE_API_KEY); */
      //const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=27844ed174b92027b1e9d5376f80ae29`);
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