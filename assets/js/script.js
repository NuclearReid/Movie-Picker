// API key and URL for OMDb Api
var api_key = "&apikey=9c8e80a7";
var base_url = "http://www.omdbapi.com/?t=";

// API key and URL for Youtube
var youtubeurl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q='
var youtubeSearch = '';
// var youtubeKeyFail = '&key=Fail';
var youtubeKey0 = '&key=AIzaSyCvhXEbyltDGuCtrFOaI6nykv5vIV5mvm4';
var youtubeKey1 = '&key=AIzaSyDW44gDTh3prpr7UOb9ccppmyNIVmr-rH8';
var youtubeKey2 = '&key=AIzaSyDCmq6dtV3eKpAJDNLOxYyoQXkHpER-Shs';
var movieYoutubeApiUrl;
var trailerURL ='';

// calls to the youtube api with the url I created in the OMDb api function
var failCounter =0;
var youtubeKeys = [youtubeKey0, youtubeKey1 ,youtubeKey2]


// this url is needed so we can embed the youtube video into the website
var baseURL = 'https://www.youtube.com/embed/'
var fullMovieUrl;

// variables used when randomly selecting a movie
var movieOdbApiUrl;
var chosenMovie;
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

function handleFormSubmit(event){
    event.preventDefault();
    // starts correctClass as false otherwise it if you run the form twice it would be true from the last time it was run
    correctClass = false;
    // gets the values from the form (not the text value but the value set by 'value="_____"' in the HTML
    var genre = $('#genre').val();
    var rating = $('#rating').val();
    // This variable will only be used if the user selects 'Any' for the genre
        // It's set to -1 because -1 is not checked in any of the if statements and i still wanted it declared before starting the do while statement
    var randomGenre = -1;

    // Basically looking to see if the user wants a saved movie or a new movie
    if($('#new-movies').val() != 'new-movie'){
        // If the user wants a saved movie, then the value set of the chosen movie is that saved movie's value
        chosenMovie = $('#saved-movies').val();
    }

    // if the user wants a new movie, this code will generate a new movie based off their selection
    if($('#saved-movies').val() == 'new-movie'){

    // This will run until 'correctClass' becomes true (when correctClass is true that means the movie selected is the right genre and rating)
        do{
            // I have an if statment for each genre. If the user selects 'any' then I run a random number generator 
            // This random number will be used to select the genre (0 will pick action, 1 will pick comedy, 2 will pick drama etc etc)
            if(genre == 'any-genre'){
                randomGenre = Math.floor(Math.random()*5);
            }

            // Each of these if statements essentially work the same
                // They look to see if the user selected 'action' or if randomGenre var matches with if statment
                // (the randomGenre is only used if the user selected 'any')
            if(genre == 'action' || randomGenre == 0){
                // selects a random spot from the action movie array
                var actionMoviePick = Math.floor(Math.random()*adventureMovies.length);
                // gets the movie title from that random spot (this is what'll be sent to the OMDb api)
                //   this is the spot in the array-----v       v------this is the spot in the nested array [0] is the title [1] is the classification
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
                var horrorMoviePick = Math.floor(Math.random()*horrorMovies.length);
                chosenMovie = horrorMovies[horrorMoviePick][0];
                theClass = horrorMovies[horrorMoviePick][1];
                if(theClass == rating || rating == 'any-classification'){
                    correctClass = true;
                }
            }

            // if the selected classification and movie classification are not the same, correctClass remains false and the loop runs again
        }while(correctClass == false);
    // I only call to the OMDb api because I need info from it to make the youtube api call more accurate 
    }
    // This uses the movie picked from the array to create the url for the OMDb 
    movieOdbApiUrl = base_url + chosenMovie + api_key;
    // Sends that created URL to the OMDb api
    movieAPIcall(movieOdbApiUrl);
    
}
// picks a movie within their criteria when they click on the form
$('#selectionForm').on('submit', handleFormSubmit);


// Basically the same as handleFormSubmit() but doesn't have 'event.preventDefault();' <-- breaks the program if left in
    // it's used for if the user clicks the 'mmmm not feeling this one' button
function handleButtonClick(){
   // starts correctClass as false otherwise it if you run the form twice it would be true from the last time it was run
   correctClass = false;
   // gets the values from the form (not the text value but the value set by 'value="_____"' in the HTML
   var genre = $('#genre').val();
   var rating = $('#rating').val();
   // This variable will only be used if the user selects 'Any' for the genre
       // It's set to -1 because -1 is not checked in any of the if statements and i still wanted it declared before starting the do while statement
   var randomGenre = -1;

   // Basically looking to see if the user wants a saved movie or a new movie
   if($('#new-movies').val() != 'new-movie'){
       // If the user wants a saved movie, then the value set of the chosen movie is that saved movie's value
       chosenMovie = $('#saved-movies').val();
   }

   // if the user wants a new movie, this code will generate a new movie based off their selection
   if($('#saved-movies').val() == 'new-movie'){

   // This will run until 'correctClass' becomes true (when correctClass is true that means the movie selected is the right genre and rating)
       do{
           // I have an if statment for each genre. If the user selects 'any' then I run a random number generator 
           // This random number will be used to select the genre (0 will pick action, 1 will pick comedy, 2 will pick drama etc etc)
           if(genre == 'any-genre'){
               randomGenre = Math.floor(Math.random()*5);
           }

           // Each of these if statements essentially work the same
               // They look to see if the user selected 'action' or if randomGenre var matches with if statment
               // (the randomGenre is only used if the user selected 'any')
           if(genre == 'action' || randomGenre == 0){
               // selects a random spot from the action movie array
               var actionMoviePick = Math.floor(Math.random()*adventureMovies.length);
               // gets the movie title from that random spot (this is what'll be sent to the OMDb api)
               //   this is the spot in the array-----v       v------this is the spot in the nested array [0] is the title [1] is the classification
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
               var horrorMoviePick = Math.floor(Math.random()*horrorMovies.length);
               chosenMovie = horrorMovies[horrorMoviePick][0];
               theClass = horrorMovies[horrorMoviePick][1];
               if(theClass == rating || rating == 'any-classification'){
                   correctClass = true;
               }
           }

           // if the selected classification and movie classification are not the same, correctClass remains false and the loop runs again
       }while(correctClass == false);
   // I only call to the OMDb api because I need info from it to make the youtube api call more accurate 
   }
   // This uses the movie picked from the array to create the url for the OMDb 
   movieOdbApiUrl = base_url + chosenMovie + api_key;
   // Sends that created URL to the OMDb api
   movieAPIcall(movieOdbApiUrl);
   
}
// runs the program again if they click on the 'mmmm not feeling it' button
$('#new-movie-btn').on('click', handleButtonClick);

// The OMDb Api call function
function movieAPIcall(movieOdbApiUrl){
    $.ajax({
        url: movieOdbApiUrl,
        type: 'GET',
    }).then(function(response){
            // Process and use response as needed

            // sets the text of the page to display the title, year, and synopsis. 
            // (I was having an error when using 'response.year'. HAS to be exact to the json which is 'response.Year')
            $('#selected-title-year').text(response.Title + ' ('+ response.Year +')')
            $('#selected-synopsis').text(response.Plot);
            
            // I grab the year the movie was made from the JSON to create a more accurate search for the trailer on youtube
                // Basically by putting in the year I know I won't be grabbing a re-make (ie the live action lion king instead of the animated lion king)
            youtubeSearch = chosenMovie + ' (' + response.Year + ') '+ 'trailer';

            // creates the url that i'll be sending to the Youtube Api
             movieYoutubeApiUrl = youtubeurl + youtubeSearch + youtubeKey2;
            // calls to the youtube api
             youtubeAPIcall(movieYoutubeApiUrl);

    }).fail(function(fail){
        if(fail.status !== 200){
        // make a list of all the things the user could be doing with their time if they didn't watch a movie
            $('#selected-title-year').text("We couldn't get the movie. Think about what you could be doing!");
            $('#selected-synopsis').text("That pile of clothes you've been putting off? Maybe get that sorted. Another option, Did you know meal preping can save about $2,600 a year? Maybe use this time to get some lunches made! Or that coding project you've been putting off? Get that done!");
            return;
        }
    });
}

// Works the call to the YouTube API
function youtubeAPIcall(movieYoutubeApiUrl){
    $.ajax({
        url: movieYoutubeApiUrl,
        method: 'GET'
    }).then(function(response){

        // gets the video id from the JSON 
        var movieID = response.items[0].id.videoId;

        // creates the url that'll be as the src in the <iframe> of the html
        trailerURL = baseURL + movieID;

        // sets the src of the <iframe> to the trailer url and embeds it into the html
       $('#selected-trailer').attr('src', trailerURL);

    }).fail(function(fail){
        if(fail.status !== 200){
            //figure out what to append if nothing happens (maybe the poster of the movie)

            return;
        }
    });
}

// stores the movie title into the local storage
    // also stores the trailerURL but that's not currently being used anywhere else
function storeMovieBtn(){
    // if the chosen movie isn't null, will store data. I don't want 'null' to ever somehow make it into the local storage
        // a null value was getting stored at some point but i forget when
    if(chosenMovie != 'null'){
        var storedMovies = JSON.parse(localStorage.getItem('storedMovies', chosenMovie))|| [];
        // this variable is used to make sure i'm not storing the same movie twice
        var newMovie = true;
        // cycles through the saved movies
        for(var i = 0; i<storedMovies.length;i++){
            // If the chosen movie is already in the array then it won't let you save it again
            if(storedMovies[i] == chosenMovie){
                newMovie = false;
            }
        }
        // if the movie isn't in the local storage:
            // appends the name of the movie to the 'Saved Movies' drop down menu and stores it in the local storage
        if(newMovie == true){
            var savedMovie = $('#saved-movies');
            var savedMovieOpt = $('<option>');
            savedMovieOpt.attr('value', chosenMovie);
            savedMovieOpt.text(chosenMovie);
            savedMovie.append(savedMovieOpt);
            storedMovies.push(chosenMovie, trailerURL);
            localStorage.setItem('storedMovies', JSON.stringify(storedMovies));
        }
    }
}
$('#store-movie').on('click', storeMovieBtn);

document.querySelector("#generate-btn").addEventListener("click", () => {
      // removes class hidden from the selected movie upon clicked "generate movie"
    $('#movie-choice').removeClass('hidden');
      //scrolls to botto,
    window.scrollTo(0,document.body.scrollHeight);
  });

// Show/hide scroll-to-top button based on scroll position
document.addEventListener('scroll', function () {
    var scrollButton = document.getElementById('scroll-up');
    if (window.scrollY > 200) {
        scrollButton.classList.remove('is-hidden');
        scrollButton.classList.add('is-shown');
    } else {
        scrollButton.classList.add('is-hidden');
        scrollButton.classList.remove('is-shown');
    }
});

document.querySelector("#scroll-up").addEventListener("click", () => {
    window.scrollTo(0,0);
});


