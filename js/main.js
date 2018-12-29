$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get(`https://www.omdbapi.com/?apikey=c0457d5f&s=${searchText}`)
    .then(res => {
      let movies = res.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
        <div class="col-md-3">
            <div class="card card-body bg-light text-center">
                <img src=${movie.Poster} alt="Movie Image" class="poster">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected('${
                  movie.imdbID
                }')" href="#" class="btn btn-primary">Movie Details</a>
            </div>
        </div>
        `;
      });
      $("#movies").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}

function movieSelected(id) {
  sessionStorage.setItem("movieId", id);
  window.location = "movie.html";
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem("movieId");
  axios
    .get(`https://www.omdbapi.com/?apikey=c0457d5f&i=${movieId}`)
    .then(res => {
      let movie = res.data;
      console.log(movie);
      let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="img-thumbnail" alt="Movie Poster">
          </div>
          <div class="col-md-8">
            <h2 style="color: #fff;">${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${
                movie.Genre
              }</li>
              <li class="list-group-item"><strong>Released:</strong> ${
                movie.Released
              }</li>
              <li class="list-group-item"><strong>Rated:</strong> ${
                movie.Rated
              }</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${
                movie.imdbRating
              }</li>
              <li class="list-group-item"><strong>Director:</strong> ${
                movie.Director
              }</li>
              <li class="list-group-item"><strong>Writer:</strong> ${
                movie.Writer
              }</li>
              <li class="list-group-item"><strong>Actors:</strong> ${
                movie.Actors
              }</li>
            </ul>
          </div>
        </div>
        <br/>
        <div class="row">
          <div class="card">
            <div class="card-body">
              <h3 style="color: #fff;">Plot</h3>
              ${movie.Plot}
              <hr />
              <a
                href="https://imdb.com/title/${movie.imdbID}"
                target="_blank"
                class="btn btn-primary"
              >View IMDB</a>
              <a href="index.html" class="btn btn-secondary">Go Back To Search</a>
            </div>
          </div>
        </div>
      `;
      $("#movie").html(output);
    })
    .catch(err => {
      console.log(err);
    });
}
