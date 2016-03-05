navigator.geolocation.getCurrentPosition(onSuccess, onFail, {});
function onSuccess(position){
  var crd = position.coords;
  var urlweather = "http://api.openweathermap.org/data/2.5/weather?lat=" + crd.latitude + "&lon=" + crd.longitude + "&appid=44db6a862fba0b067b1930da0d769e98&units=metric";
  $.ajax({
    url: urlweather,
    dataType: "JSON",
    data: {
      escape: "javascript"
    }
  }).done(function(data){
    $("#weatherdiv").empty();
    $("#weatherdiv").append("<h4>Väder: " + data.weather[0].description + "</h4>" +
    "<h4>Temperatur: " + data.main.temp + "  °C</h4>" +
    "<h4>Du är i: " + data.name + "</h4>" +
    "<img src=http://openweathermap.org/img/w/" + data.weather[0].icon + ".png>")
  }).fail(function(data){
    console.log("fail");
  });
}

function onFail(){
  alert("Vi kunde tyvärr inte hämta din plats just nu.");
}
