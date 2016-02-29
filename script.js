var urltype;
var searchfield;
console.log(searchmovie);
$(".form-control").on("change", function(){
  searchfield = $('#searchmovie').val();
  console.log(searchmovie);
}
$("#sokomdb").on("click", function(){
  $.ajax({
      url: urltype,
      dataType: "JSON",
      data: {
        escape: "javascript"
      }
    }).done(function(data){
      $("#searchresult").text(data.value.rated).fadeIn(500);
  });
});
