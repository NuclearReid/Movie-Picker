// API key and URLs

var api_key = "&apikey=9c8e80a7";
var base_url = "http://www.omdbapi.com/?t=";
var movie_id = ""
// var movieName = prompt('enter in a movie name');
// var totalUrl = base_url + movieName + api_key;

var chosenMovie;
var correctClass = false;
var theClass;
function handleFormSubmit(event){
    event.preventDefault();
    correctClass = false;
    var genre = $('#genre').val();
    var rating = $('#rating').val();
    var randomGenre = -1;
    console.log(genre + ' ' + rating);
    do{
        if(genre == 'any-genre'){
            randomGenre = Math.floor(Math.random()*4);
            console.log(randomGenre);
        }
        if(genre == 'action' || randomGenre == 0){
            var actionMoviePick = Math.floor(Math.random()*adventureMovies.length);
            chosenMovie = adventureMovies[actionMoviePick][0];
            theClass = adventureMovies[actionMoviePick][1];
            if(theClass == rating || rating == 'any-classification'){
                correctClass = true;
                console.log(chosenMovie +' and the classification '+ theClass);
            }
            // console.log(chosenMovie +' and the classification '+ theClass);
        }
        if(genre == 'comedy'|| randomGenre == 1){
            var comedyMoviePick = Math.floor(Math.random()*comedyMovies.length);
            chosenMovie = comedyMovies[comedyMoviePick][0];
            theClass = comedyMovies[comedyMoviePick][1];
            if(theClass == rating || rating == 'any-classification'){
                correctClass = true;
                console.log(chosenMovie +' and the classification '+ theClass);
            }
            // console.log(chosenMovie +' and the classification '+ theClass);
        }
        if(genre == 'drama'|| randomGenre == 2){
            var dramaMoviePick = Math.floor(Math.random()*dramaMovies.length);
            chosenMovie = dramaMovies[dramaMoviePick][0];
            theClass = dramaMovies[dramaMoviePick][1];
            if(theClass == rating || rating == 'any-classification'){
                correctClass = true;
                console.log(chosenMovie +' and the classification '+ theClass);
            }
            // console.log(chosenMovie +' and the classification '+ theClass);
        }
        if(genre == 'fantasy'|| randomGenre == 3){
            var fantasyMoviePick = Math.floor(Math.random()*fantasyMovies.length);
            chosenMovie = fantasyMovies[fantasyMoviePick][0];
            theClass = fantasyMovies[fantasyMoviePick][1];
            if(theClass == rating || rating == 'any-classification'){
                correctClass = true;
                console.log(chosenMovie +' and the classification '+ theClass);
            }
        }
    }while(correctClass == false);
}
$('#selectionForm').on('submit', handleFormSubmit);


function movieAPIcall(){
    $.ajax({
        url: totalUrl,
        type: 'GET',
        // dataType: 'json',
    }).then(function(response){
            // Process and use response as needed
            console.log(response);   

    }).fail(function(fail){
        if(fail.status !== 200){
            alert('Could not get the info for that city');
            return;
        }
    });
}
// getMovieDetails(movie_id);  // Replace with an actual IMDb movie ID
