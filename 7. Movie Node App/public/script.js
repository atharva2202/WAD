document.addEventListener("DOMContentLoaded", () => {
  const moviesContainer = document.getElementById("movies");
  const movieDetails = document.getElementById("movieDetails");
  const moviePoster = document.getElementById("moviePoster");
  const movieTitle = document.getElementById("movieTitle");
  const showtimes = document.getElementById("showtimes");
  const bookTicketBtn = document.getElementById("bookTicketBtn");
  let moviesData = [];

  // Fetch movie data from JSON file
  fetch("/movies.json")
    .then((response) => response.json())
    .then((data) => {
      moviesData = data;
      // Display movies with posters
      data.forEach((movie) => {
        const movieItem = document.createElement("div");
        movieItem.classList.add("col-md-4", "mb-4");
        movieItem.innerHTML = `
            <div class="movie-container">
              <img src="${movie.image}" alt="${movie.title}" class="img-fluid movie-poster" data-title="${movie.title}">
              <p class="text-center">${movie.title}</p>
            </div>
          `;
        moviesContainer.appendChild(movieItem);
      });
    })
    .catch((error) => console.error("Error fetching movies:", error));

  // Event listener for clicking on movie posters
  moviesContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("movie-poster")) {
      const title = event.target.getAttribute("data-title");
      const selectedMovie = moviesData.find((movie) => movie.title === title);
      if (selectedMovie) {
        showMovieDetails(selectedMovie);
      }
    }
  });

  // Show movie details
  function showMovieDetails(movie) {
    moviePoster.src = movie.image;
    movieTitle.textContent = movie.title;
    showtimes.textContent = `Showtimes: ${movie.showtimes.join(", ")}`;
    movieDetails.classList.remove("d-none");
  }

  // Book ticket button click handler (you can implement actual booking logic here)
  bookTicketBtn.addEventListener("click", () => {
    const selectedMovieTitle = movieTitle.textContent;
    alert(`Booking tickets for ${selectedMovieTitle}`);
  });
});
