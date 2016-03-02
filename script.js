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
      var i;
      var title;
      var year;
      var backgroundcolors = ["#629462", "#BA977B", "#BA7B7B", "#4A7070" ];
      movieArr = data;
      var moviePoster;

      for(i = 0; i < movieArr.Search.length; i++){
        var rand = backgroundcolors[Math.floor(Math.random() * backgroundcolors.length)];
        var id = movieArr.Search[i].imdbID;
        var title = movieArr.Search[i].Title;
        var arkimovies = [];
        var favmovies = [];
        $("#searchresult").append("<div class=" + '"row"' + " id=" + "singleresult" + i + "><div class=" + "col-md-6>" +"<h2> Titel: " + movieArr.Search[i].Title + "</h2>" +
        "<p>År: " + data.Search[i].Year + "</p>" +
        "<a href =" + '"http://www.imdb.com/title/' + id + '"' + ">Imdb-länk</a><hr>" +
        "<button type=" + '"button"' + " id=" + '"arkbutton' + i +'"' + " class=" + '"btn btn-primary"'+ " data-movie=" + id + ">Arkiv</button>" +
        "<button type=" +  '"button"' + " id=" + 'favbutton' + i + " class=" + '"btn btn-success"' + " data-movie=" + id + ">Favoritfilm</button></div>" +
        "<div class=" + "col-md-4>" +"<img id=" + '"poster"' + " src=" + data.Search[i].Poster + " alt=" + '"Till den här filmen fanns ingen poster" + "' + "></div></div>");
        $("#arkbutton" + i).on("click", function(){
          arkimovies.push($(this).attr("data-movie"));
          console.log(arkimovies);
          localStorage.setItem("arklist", JSON.stringify(arkimovies));
        });
        $("#favbutton" + i).on("click", function(){
          favmovies.push($(this).attr("data-movie"));
          console.log(favmovies);
          localStorage.setItem("favlist",  JSON.stringify(favmovies));
        });
        $("#singleresult" + i).css("background-color", rand);
        $("#singleresult" + i).css("margin", "8px");
        $("#singleresult" + i).css("padding", "5px");
        $("#singleresult" + i).css("border-radius", "3px");
      }
  });
});
