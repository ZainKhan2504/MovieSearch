$(document).ready(() => {
  $("#searchForm").on("submit", e => {
    let searchText = $("#searchText").val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText) {
  axios
    .get(`https://www.omdbapi.com/?i=tt3896198&apikey=c0457d5f&s=${searchText}`)
    .then(res => {
      let movies = res.data.Search;
      let output = "";
      $.each(movies, (index, movie) => {
        output += `
        <div class="col-md-3">
            <div class="card card-body bg-light text-center">
                <img src=${movie.Poster} alt="Movie Image" class="poster">
                <h5>${movie.Title}</h5>
                <a onclick="movieSelected("${
                  movie.imdbID
                }")" href="#" class="btn btn-primary">Movie Details</a>
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
