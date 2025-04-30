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
    axios.get('https://www.omdbapi.com/?s=' + searchText + '&apikey=' + API_KEY)
        .then((response) => {
            let movies = response.data.Search;
            let output = '';

            $.each(movies, (index, movie) => {
                output += `
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450.png?text=No+Image'}">
                        </div>
                        <div class="card-content">
                        <span class="card-title">${movie.Title}</span>
                        </div>
                        <div class="card-action">
                        <a onclick="movieSelected('${movie.imdbID}')" href="#">Movie Details</a>
                        </div>
                    </div>
                    `;
            });

            $('#movies').html(output);

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
