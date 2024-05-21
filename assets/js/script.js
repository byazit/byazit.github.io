let API_KEY = 'b3844d55';

$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
      
});


function getMovies(searchText){
    axios.get('http://www.omdbapi.com/?s='+searchText+'&apikey=b3844d55')
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output ='';
            $.each(movies, (index, movie) => {
                output += `
                <div class ="colMovie">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div> 
                </div>
                `;
            });
            $('#movies').html(output);
        })
    
        .catch((err) =>{
            console.log(err);
        })
    }
    window.onload = function(){
        axios.get('http://www.omdbapi.com/?s='+'Action'+'&apikey=b3844d55')
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output ='';
            $.each(movies, (index, movie) => {
                output += `
                <div class ="colMovie">
                    <div class="well text-center">
                        <img src="${movie.Poster}">
                        <h5>${movie.Title}</h5>
                        <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                    </div> 
                </div>
                `;
            });
            $('#movies').html(output);
        })
    
        .catch((err) =>{
            console.log(err);
        })

    }