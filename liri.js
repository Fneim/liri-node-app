var TwitterKeys = require("./keys.js");
// var SpotifyKeys = require("./spotify-keys.js");

var Spotify = require("./spotify-keys");

var twitter = require("twitter");
var spotify = require("node-spotify-api");
var omdb = require("omdb");
var request = require("request");

//switch takes input and executes the function for the input

var command = process.argv[2];
var anotherCommand = process.argv[3];

switch(command){
  case "my-tweets":
  twitter();
  break;
  case "spotify-this-song":
  spotify();
  break;
  case "movie-this":
  omdbMovie();
  break;
  case "do-what-it-says":
  something();
  break;
  default:
  console.log("Do nothing");
}

//twitter api
var client = new twitter(TwitterKeys);
  client.get('statuses/user_timeline', {screen_name:"Tyrant"}, function(error, tweets, response) {
    if (!error) {
      for(var i = 0; i < tweets.length; i++){
      console.log(tweets[i].text);
      }
    }
  });

//spotify api
var newClient = new spotify(Spotify);
function spotify(){
  spotifyKeys.search({ type: "track", query: anotherCommand, limit:1}, function(err, data) {
    if (!err) {
      console.log(JSON.stringify(data, null, 2));
      console.log("Artist(s): "+ data.artists[name]);
    }
  });
}

//OMDB api
function omdbMovie(){
    request("http://www.omdbapi.com/?t="+ anotherCommand +"&y=&plot=short&apikey=40e9cece", function(err, response, body){
      if(!err && response.statusCode === 200){
        var body = JSON.parse(body);

        console.log("Title: "+ body.Title+ "\nYear: "+body.Year+ "\nIMDB Rating: "+ body.imdbRating
        +"\nCountry: "+body.Country+ "\nLanguage: "+body.Language +
      "\nPlot: "+body.Plot + "\nActors: "+body.Actors);
        console.log("\nRotten Tomatoes: "+ body.rottentomato);
    }
  })
}
