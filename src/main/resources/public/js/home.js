$(document).ready(function () {
  function config_select_options() {
    var occupation_options = [
      "Occupation",
      "academic/educator",
      "artist",
      "clerical/admin",
      "college/grad student",
      "customer service",
      "doctor/health care",
      "executive/managerial",
      "farmer",
      "homemaker",
      "K-12 student",
      "lawyer",
      "programmer",
      "retired",
      "sales/marketing",
      "scientist",
      "self-employed",
      "technician/engineer",
      "tradesman/craftsman",
      "unemployed",
      "writer",
      "other",
    ];
    $("#occupation-selection").append(
      $('<option value="">Occupation</option>')
    );
    for (var i = 1; i < occupation_options.length; i++) {
      var value = occupation_options[i];
      var option = $('<option value="' + value + '">' + value + "</option>");
      $("#occupation-selection").append(option);
    }

    var genre_options = [
      "Genre",
      "Action",
      "Adventure",
      "Animation",
      "Children's",
      "Comedy",
      "Crime",
      "Documentary",
      "Drama",
      "Fantasy",
      "Film-Noir",
      "Horror",
      "Musical",
      "Mystery",
      "Romance",
      "Sci-Fi",
      "Thriller",
      "War",
      "Western",
    ];

    $(".genre-selection").append($('<option value="">Genre</option>'));
    for (var i = 1; i < genre_options.length; i++) {
      var value = genre_options[i];
      var option = $('<option value="' + value + '">' + value + "</option>");
      $(".genre-selection").append(option);
    }
  }
  config_select_options();

  var default_data = { gender: "", age: "", occupation: "", genres: "" };
  $result = $('<div class="result"></div>');
  $.ajax({
    contentType: "application/json; charset=utf-8",
    type: "GET",
    data: default_data,
    url: "/users/recommendations",
  }).then(function (data) {
    for (var i = 0; i < Object.keys(data).length; i++) {
      $link = $(
        '<a href="' +
          data[i].imdb.substring(1, data[i].imdb.length - 1) +
          '" target="_blank"></a>'
      );
      $card = $('<div class="card"></div>');
      $card_img = $('<img class="card-img" src="' + data[i].poster + '"/>');
      $card.append($card_img);
      $link.append($card);
      $result.append($link);
    }
    console.log(data);
    $(".contents").append($result);
  });
});
