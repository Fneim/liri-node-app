var TwitterKeys = require("./keys");

var twitter = require("twitter");
var spotify = require("node-spotify-api");
var omdb = require("omdb");
var request = require("request");
var fs = require("fs");

var client = new twitter(TwitterKeys);

//spotify keys
var newClient = new spotify ({
  id: '8c642386af1c45ff8d8e95739d820fa7',
  secret: '818b6f66c5e74df29646f8bce8fafa14'
});

//switch takes command and executes the function for the command
var command = process.argv[2];
var anotherCommand = process.argv[3];

switch(command){
  case "my-tweets":
  tweets();
  break;
  case "spotify-this-song":
  music();
  break;
  case "movie-this":
  omdbMovie();
  break;
  case "do-what-it-says":
  doWhatItSays();
  break;
  default:
  console.log("Do nothing");
}

//twitter api
function tweeter(){
  client.get('statuses/user_timeline', {screen_name:"Tyrant"}, function(error, tweets, response) {
    if (!error) {
      for(var i = 0; i < tweets.length; i++){
        console.log(tweets[i].text);
      }
    }
  });
}
//callback
function tweets(){
  tweeter();
}
//---------------------------------------------------------------------------------------------------------
//spotify api
function tracks(){
  newClient.search({ type: "track", query: anotherCommand, limit:1}, function(err, data) {
    if (!err) {
      // console.log(JSON.stringify(data, null, 1));
      var data = data.tracks.items[0];
      console.log("Artist(s): "+ data.artists[0].name);
      console.log("Song: "+ data.name+"\nLink: "+ data.href +"\nAlbum: "+ data.album.name);
    }
  });
}
//callback
function music(){
  tracks();
}

//----------------------------------------------------------------------------------------------------------
//OMDB api
function omdbMovie(){
    request("http://www.omdbapi.com/?t="+ anotherCommand +"&y=&plot=short&apikey=40e9cece", function(err, response, body){
      if(!err && response.statusCode === 200){
        var body = JSON.parse(body);
        console.log("Title: "+ body.Title+ "\nYear: "+body.Year+ "\nIMDB Rating: "+ body.imdbRating
        +"\nCountry: "+body.Country+ "\nLanguage: "+body.Language +
      "\nPlot: "+body.Plot + "\nActors: "+body.Actors);
        // console.log("\nRotten Tomatoes: "+ body.rottentomato);
    }
  })
}

//----------------------------------------------------------------------------------------------------------
//do what it says
function doWhatItSays(command, anotherCommand) {
  fs.readFile("random.txt", "utf8", function(err, data){
    if(!err){
      console.log(data);
    }
  })
}
