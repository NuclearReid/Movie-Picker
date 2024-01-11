// API key and URL for OMDb Api
var api_key = "&apikey=9c8e80a7";
var base_url = "http://www.omdbapi.com/?t=";

// API key and URL for Youtube
var youtubeurl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q='
var youtubeSearch = '';
// var youtubeKeyFail = '&key=Fail';
var youtubeKey0 = '&key=AIzaSyCvhXEbyltDGuCtrFOaI6nykv5vIV5mvm4';
var youtubeKey1 = '&key=AIzaSyDW44gDTh3prpr7UOb9ccppmyNIVmr-rH8';
var youtubeKey2 = '&key=AIzaSyCQ3uXWHEAcfDKiLcK3JZW8iZL4BLkxsdo';
var movieYoutubeApiUrl;

// this url is needed so we can embed the youtube video into the website
var baseURL = 'https://www.youtube.com/embed/'
var fullMovieUrl;

// just a test url, not used anywhere else
// var testUrl = "http://www.omdbapi.com/?t=Blade&apikey=9c8e80a7";

// variables used when randomly selecting a movie
var movieOdbApiUrl;
var chosenMovie = 'null';
var correctClass = false;
var theClass;

$(document).ready(function(){
    var storedMovies = JSON.parse(localStorage.getItem('storedMovies'));

    for (var i=0; i< storedMovies.length; i += 2){
        var savedMovie = $('#saved-movies');
        var savedMovieOpt = $('<option>');
        savedMovieOpt.attr('value', chosenMovie);
        savedMovieOpt.text(storedMovies[i]);
        savedMovie.append(savedMovieOpt);
    }
})
document.querySelector("#generate-btn").addEventListener("click", () => {
    // removes class hidden from the selected movie upon clicked "generate movie"
  $('#movie-choice').removeClass('hidden');
    //scrolls to botto,
  window.scrollTo(0,document.body.scrollHeight);
});
// scrolls to bottom when the page gets cut off by the responsivity
window.addEventListener('resize', function () {
    if (window.innerWidth <= 1100) {
        window.scrollTo(0, document.body.scrollHeight);
    }
});


// the function used to get the movie based off the user's selections
function handleFormSubmit(event){
    event.preventDefault();
    // starts correctClass as false otherwise it if you run the form twice it would be true from the last time it was run
    correctClass = false;
    // gets the values from the form (not the text value but the value set by 'value="_____"' in the HTML
    var genre = $('#genre').val();
    var rating = $('#rating').val();
    // This will only be used if the user selects 'Any' for the genre
        // It's set to -1 because -1 is not checked in any of the if statements and i still wanted it declared before starting the do while statement
    var randomGenre = -1;
    if($('#new-movies').val() != 'new-movie'){
        chosenMovie = $('#saved-movies').val();
    }

    if($('#saved-movies').val() == 'new-movie'){
    // This will be running until correctClass becomes true
        do{
            // I have an if statment for each genre. If the user selects 'any' then I run a random number generator that'll pick one of those if statements at random
            if(genre == 'any-genre'){
                randomGenre = Math.floor(Math.random()*5);
            }
            // Each of these if statements essentially work the same, looks to see if the user selected 'action' or if randomGenre is 0
                // the randomGenre is only used if the user selected 'any'
            if(genre == 'action' || randomGenre == 0){
                // selects a random spot from the action movie array
                var actionMoviePick = Math.floor(Math.random()*adventureMovies.length);
                // gets the movie title from that random spot (this is what'll be sent to the OMDb api)
                chosenMovie = adventureMovies[actionMoviePick][0];
                
                // gets the classification from that random spot
                theClass = adventureMovies[actionMoviePick][1];

                // checks if the classification of the movie is the same as the users selected classification (or if they clicked any classification)
                if(theClass == rating || rating == 'any-classification'){
                    // changes correctClass to true and this will end the do while loop
                    correctClass = true;
                }
            }
            if(genre == 'comedy' || randomGenre == 1){
                var comedyMoviePick = Math.floor(Math.random()*comedyMovies.length);
                chosenMovie = comedyMovies[comedyMoviePick][0];
                theClass = comedyMovies[comedyMoviePick][1];
                if(theClass == rating || rating == 'any-classification'){
                    correctClass = true;
                }
            }
            if(genre == 'drama' || randomGenre == 2){
                var dramaMoviePick = Math.floor(Math.random()*dramaMovies.length);
                chosenMovie = dramaMovies[dramaMoviePick][0];
                theClass = dramaMovies[dramaMoviePick][1];
                if(theClass == rating || rating == 'any-classification'){
                    correctClass = true;
                }
            }
            if(genre == 'fantasy' || randomGenre == 3){
                var fantasyMoviePick = Math.floor(Math.random()*fantasyMovies.length);
                chosenMovie = fantasyMovies[fantasyMoviePick][0];
                theClass = fantasyMovies[fantasyMoviePick][1];
                if(theClass == rating || rating == 'any-classification'){
                    correctClass = true;
                }
            }

            if(genre == 'horror'|| randomGenre == 4){
                console.log('in horror ' + genre);
                var horrorMoviePick = Math.floor(Math.random()*horrorMovies.length);
                chosenMovie = horrorMovies[horrorMoviePick][0];
                theClass = horrorMovies[horrorMoviePick][1];
                if(theClass == rating || rating == 'any-classification'){
                    correctClass = true;
                    console.log(chosenMovie +' and the classification '+ theClass);
                }
            }

            // if the selected classification and movie classification are not the same, correctClass remains false and the loop runs again
        }while(correctClass == false);
    }
    
    // This uses the movie picked from the array to create the url for the OMDb 
        // I'll also send this url to the my OMDb api function
    movieOdbApiUrl = base_url + chosenMovie + api_key;
    
    // I only call to the OMDb api because I need info from it to make the youtube api call more accurate
    movieAPIcall(movieOdbApiUrl);
}
// picks a movie within their criteria when they click on the form
$('#selectionForm').on('submit', handleFormSubmit);

// Basically the same as handleFormSubmit() but doesn't have 'event.preventDefault();' <-- breaks the program if left in
function handleButtonClick(){
    correctClass = false;
    var genre = $('#genre').val();
    var rating = $('#rating').val();
    var randomGenre = -1;
    // console.log(genre + ' ' + rating);
    do{
        if(genre == 'any-genre'){
            randomGenre = Math.floor(Math.random()*5);
            // console.log(randomGenre);
        }
        if(genre == 'action' || randomGenre == 0){
            var actionMoviePick = Math.floor(Math.random()*adventureMovies.length);
            chosenMovie = adventureMovies[actionMoviePick][0];
            theClass = adventureMovies[actionMoviePick][1];
            if(theClass == rating || rating == 'any-classification'){
                correctClass = true;
                console.log(chosenMovie + ' and the classification ' + theClass);
            }
            // console.log(chosenMovie + ' and the classification ' + theClass);
        }
        if(genre == 'comedy' || randomGenre == 1){
            var comedyMoviePick = Math.floor(Math.random()*comedyMovies.length);
            chosenMovie = comedyMovies[comedyMoviePick][0];
            theClass = comedyMovies[comedyMoviePick][1];
            if(theClass == rating || rating == 'any-classification'){
                correctClass = true;
                console.log(chosenMovie + ' and the classification ' + theClass);
            }
            // console.log(chosenMovie + ' and the classification ' + theClass);
        }
        if(genre == 'drama'|| randomGenre == 2){
            var dramaMoviePick = Math.floor(Math.random()*dramaMovies.length);
            chosenMovie = dramaMovies[dramaMoviePick][0];
            theClass = dramaMovies[dramaMoviePick][1];
            if(theClass == rating || rating == 'any-classification'){
                correctClass = true;
                console.log(chosenMovie + ' and the classification ' + theClass);
            }
            // console.log(chosenMovie +' and the classification '+ theClass);
        }
        if(genre == 'fantasy'|| randomGenre == 3){
            var fantasyMoviePick = Math.floor(Math.random()*fantasyMovies.length);
            chosenMovie = fantasyMovies[fantasyMoviePick][0];
            theClass = fantasyMovies[fantasyMoviePick][1];
            if(theClass == rating || rating == 'any-classification'){
                correctClass = true;
                console.log(chosenMovie + ' and the classification ' + theClass);
            }
        }
        if(genre == 'horror'|| randomGenre == 4){
            var horrorMoviePick = Math.floor(Math.random()*horrorMovies.length);
            chosenMovie = horrorMovies[horrorMoviePick][0];
            theClass = horrorMovies[horrorMoviePick][1];
            if(theClass == rating || rating == 'any-classification'){
                correctClass = true;
                console.log(chosenMovie +' and the classification '+ theClass);
            }
        }
    }while(correctClass == false);
    //building the api url
    movieOdbApiUrl = base_url + chosenMovie + api_key;
    youtubeSearch = chosenMovie + ' trailer';
    movieYoutubeApiUrl = youtubeurl + youtubeSearch + youtubeKey0;
    
    movieAPIcall(movieOdbApiUrl);    
}
// runs the program again if they click on the 'mmmm not feeling it' button
$('#new-movie-btn').on('click', handleButtonClick);

function storeMovieBtn(){
    if(chosenMovie != 'null'){
        var savedMovie = $('#saved-movies');
        var savedMovieOpt = $('<option>');
        savedMovieOpt.attr('value', chosenMovie);
        savedMovieOpt.text(chosenMovie);
        savedMovie.append(savedMovieOpt);
        
        // var storedYoutubeLink = JSON.parse(localStorage.getItem('storedYoutubeLink'))
        var storedMovies = JSON.parse(localStorage.getItem('storedMovies', chosenMovie, movieYoutubeApiUrl))|| [];
        storedMovies.push(chosenMovie, movieYoutubeApiUrl);
        localStorage.setItem('storedMovies', JSON.stringify(storedMovies, movieYoutubeApiUrl));
    }
}
$('#store-movie').on('click', storeMovieBtn);

// The OMDb Api call function
function movieAPIcall(movieOdbApiUrl){
    $.ajax({
        url: movieOdbApiUrl,
        type: 'GET',
    }).then(function(response){
            // Process and use response as needed
            // console.log(response); 
            
            // sets the text of the page to display the title, year, and synopsis.
            // $('#movie-choice-title').text(response.Title);
            $('#selected-title-year').text(response.Title + ' ('+response.Year +')')
            $('#selected-synopsis').text(response.Plot);
            
            // I grab the year the movie was made from the JSON to create a more accurate search for the trailer on youtube
                // Basically by putting in the year I know I won't be grabbing a re-make 
            youtubeSearch = chosenMovie + ' (' + response.Year + ') '+ 'trailer';
            // creates the url that i'll be sending to the Youtube Api
             movieYoutubeApiUrl = youtubeurl + youtubeSearch + youtubeKey0;
            // console.log(youtubeSearch);
            // calls to the youtube api
             youtubeAPIcall(movieYoutubeApiUrl);
    }).fail(function(fail){
        if(fail.status !== 200){
            
            // this'll have to be changed from being an 'alert'
            alert('Could not get the info for that movie');
            return;
        }
    });
}

// calls to the youtube api with the url I created in the OMDb api function
var failCounter =0;
var youtubeKeys = [youtubeKey0, youtubeKey1 ,youtubeKey2]

function youtubeAPIcall(movieYoutubeApiUrl){
    $.ajax({
        url: movieYoutubeApiUrl,
        method: 'GET'
    }).then(function(response){
        // failCounter = 0;
        // console.log(response);
        // gets the video id from the JSON 
        var movieID = response.items[0].id.videoId;
        // console.log(movieID);

        // creates the url that'll be as the src in the <iframe> of the html
        var trailerURL = baseURL + movieID;
        // console.log(trailerURL);

        // sets the src of the <iframe> to the trailer url and embeds it into the html
       $('#selected-trailer').attr('src', trailerURL);

    }).fail(function(fail){
        if(fail.status !== 200){
            failCounter = (failCounter + 1) % youtubeKeys.length;
            movieYoutubeApiUrl = youtubeurl + youtubeSearch + youtubeKeys[failCounter];
                youtubeAPIcall(movieYoutubeApiUrl);
            // this'll have to be changed from being an 'alert'
            // alert('Could not get the info for that movie');
            return;
        }
    });
}