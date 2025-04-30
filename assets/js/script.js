let API_KEY = 'b3844d55';

$(document).ready(() => {
    // Trigger search when clicking the button
    $('#searchBtn').on('click', () => {
        let searchText = $('#searchText').val();
        if (searchText.trim() !== '') {
            getMovies(searchText);
        }
    });
});

function getMovies(searchText) {
    axios.get(`https://www.omdbapi.com/?s=${searchText}&apikey=${API_KEY}`)
        .then((response) => {
            let movies = response.data.Search;
            let output = '';

            if (!movies) {
                $('#movies').html('<p class="red-text">No movies found.</p>');
                return;
            }

            // For each movie, fetch full details
            let requests = movies.map((movie) => {
                return axios.get(`https://www.omdbapi.com/?i=${movie.imdbID}&apikey=${API_KEY}`);
            });

            Promise.all(requests).then(responses => {
                responses.forEach((res) => {
                    let movie = res.data;
                    output += `
                        <div class="col s12 m6 l3">
                          <div class="card">
                            <div class="card-image waves-effect waves-block waves-light">
                              <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450.png?text=No+Image'}">
                            </div>
                            <div class="card-content">
                              <span class="card-title">${movie.Title}</span>
                              <p><strong>Year:</strong> ${movie.Year}</p>
                              <p><strong>Genre:</strong> ${movie.Genre}</p>
                              <p><strong>Director:</strong> ${movie.Director}</p>
                              <p><strong>Actors:</strong> ${movie.Actors}</p>
                              <p><strong>Plot:</strong> ${movie.Plot.length > 100 ? movie.Plot.slice(0, 100) + '...' : movie.Plot}</p>
                            </div>
                          </div>
                        </div>
                    `;
                });

                $('#movies').html(output);
            });
        })
        .catch((err) => {
            console.log(err);
            $('#movies').html('<p class="red-text">Error fetching movies.</p>');
        });
}

$(document).ready(() => {
    // Trigger search when clicking the button
    $('#searchBtn').on('click', (e) => {
        e.preventDefault();
        let searchText = $('#searchText').val();
        if (searchText.trim() !== '') {
            getMovies(searchText);
        }
    });

    // Trigger search on Enter key press
    $('#searchForm').on('submit', (e) => {
        e.preventDefault(); // Prevent default form submission
        let searchText = $('#searchText').val();
        if (searchText.trim() !== '') {
            getMovies(searchText);
        }
    });
});
