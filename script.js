var urltype;
var searchfield;
console.log("searchmovie");
$(".form-control").on("change", function(){
  searchfield = $('#searchmovie').val();
  urltype ="http://www.omdbapi.com/?t=" + searchfield + "&y=&plot=short&r=json"
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
      console.log(data.Year);
      $("#searchresult").text("Titel:" + data.Title + ", year: " + data.Year + ", plot: " + data.Plot ).fadeIn(500);
  });
});
