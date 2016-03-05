var urltype;
var searchfield;
console.log("searchmovie");
$(".form-control").on("change", function(){
  searchfield = $('#searchmovie').val();
  urltype ="http://www.omdbapi.com/?s=" + searchfield + "&page=1"
});
$("#sokomdb").on("click", function(){
  console.log(urltype)
  $.ajax({
      url: urltype,
      dataType: "JSON",
      data: {
        escape: "javascript"
      }
    }).done(function(data){
      $("#searchresult").empty();
      var movieArr = [];
      var i, e;
      var title;
      var year;
      var backgroundcolors = ["#629462", "#BA977B", "#BA7B7B", "#4A7070" ];
      movieArr = data;
      var moviePoster;
      var splittedarki;
      var arkimovies = localStorage.getItem("arklist");
      splittedarki = JSON.parse(arkimovies);

      for(i = 0; i < movieArr.Search.length; i++){
        var rand = backgroundcolors[Math.floor(Math.random() * backgroundcolors.length)];
        var id = movieArr.Search[i].imdbID;
        var title = movieArr.Search[i].Title;
        var favmovies = [];
        $("#searchresult").append("<div class=" + '"row"' + " id=" + "singleresult" + i + "><div class=" + "col-md-6>" +"<h2> Titel: " + movieArr.Search[i].Title + "</h2>" +
        "<p>År: " + data.Search[i].Year + "</p>" +
        "<a href =" + '"http://www.imdb.com/title/' + id + '"' + ">Imdb-länk</a><hr>" +
        "<button type=" + '"button"' + " id=" + '"arkbutton' + i +'"' + " class=" + '"btn btn-primary"'+ " data-movie=" + id + ">Arkiv</button>" +
        "<button type=" +  '"button"' + " id=" + 'favbutton' + i + " class=" + '"btn btn-success"' + " data-movie=" + id + ">Favoritfilm</button></div>" +
        "<div class=" + "col-md-4>" +"<img id=" + '"poster"' + " src=" + data.Search[i].Poster + " alt=" + '"Till den här filmen fanns ingen poster" + "' + "></div></div>");
        $("#arkbutton" + i).on("click", function(){
          if(!containsObject($(this).attr("data-movie"), splittedarki)){
            splittedarki.push($(this).attr("data-movie"));
            console.log("Har lagts till i listan - " + splittedarki);
            localStorage.setItem("arklist", JSON.stringify(splittedarki));
          }
        });
        $("#favbutton" + i).on("click", function(){
          localStorage.setItem("favmovie",  $(this).attr("data-movie"));
          console.log("Ny favoritfilm " + $(this).attr("data-movie"));
          alert("Du har nu lagt till filmen som ny favoritfilm!");
        });
        $("#singleresult" + i).css("background-color", rand);
        $("#singleresult" + i).css("margin", "8px");
        $("#singleresult" + i).css("padding", "5px");
        $("#singleresult" + i).css("border-radius", "3px");
      }
  });
});

function containsObject(obj, list) {
  var j;
  for (j = 0; j < list.length; j++) {
    if (list[j] === obj) {
      return true;
    }
  }
  return false;
}



var k;
var arkivrequest;

if(localStorage.getItem("arklist") != undefined){
  var movielist = localStorage.getItem("arklist");
  var splittedml = JSON.parse(movielist);
  for(k = 0; k < splittedml.length ; k++){
    arkivrequest = "http://www.omdbapi.com/?i=" + splittedml[k];
    if(splittedml != undefined){
      createfield(splittedml[k]);
    }
  }
}

  function createfield(id){
  $.ajax({
      url: arkivrequest,
      dataType: "JSON",
      data: {
        escape: "javascript"
      }
    }).done(function(data){
      var title = data.Title;
      var year;
      var backgroundcolors = ["#629462", "#BA977B", "#BA7B7B", "#4A7070" ];
      movieArr = data;
      var moviePoster;
      var rand = backgroundcolors[Math.floor(Math.random() * backgroundcolors.length)];
      $("#arkivresult").append("<div class=" + '"row"' + " id=" + '"arkivresult"' + id + "><div class=row>" +
      "<div class=" + '"col-md-2 col-xs-2"' + ">" +
      "<img id=" + '"posterarkiv"' + " src=" + data.Poster + " alt=" + '"Till den här filmen fanns ingen poster" + "' + "></div>" +
      "<div class=" + '"col-md-3 col-xs-3"' + ">" +
      "<p>" + data.Title + "</p></div>" +
      "<div class=" + '"col-md-1 col-xs-1"' + ">" +
      "<p>" + data.Year + "</p></div>" +
      "<div class=" + '"col-md-2 col-xs-2"' + ">" +
      "<p>" + data.Runtime + "</p></div>" +
      "<div class=" + '"col-md-2 col-xs-2"' + ">" +
      "<button type=" + '"button"' + " id=" + '"removebutton' + id +'"' + " class=" + '"btn btn-warning"'+ " data-movie=" + data.imdbID + ">Ta bort från Arkiv</button>" +
      "</div>"); // slutdiv -->
      $("#removebutton" + id).on("click", function(){
        var sok = localStorage.getItem("arklist");
        var ids = JSON.parse(sok);
        var indexrem = ids.indexOf($(this).attr("data-movie"));
        if(indexrem > -1){
          ids.splice(indexrem, 1);
        }
        localStorage.setItem("arklist", JSON.stringify(ids));
        $(this).parent("#arkivresult" + id).remove().fadeOut(500);
      });
    });
    }
    
