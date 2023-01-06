$(document).ready(function () {
    var cityH2 = $(".card-title");
    var ul = $(".list-group");
    var cardBody = $(".card-body");


    // Variables for ajax call
    var APIKey = "7e9660df6b46d307a4673d7d7829d2f1";
    var citySearch = "El Paso";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
        "q=" + citySearch + "&units=imperial&appid=" + APIKey;
    // Search button click event
    $(".btn").on("click", function (event) {
        event.preventDefault();
        // Get user search info
        var target = $(this).attr("data-target");
        console.log(target);
        var citySearch = $("#" + target).val();

    // Ajax call to openweather API
    $.ajax({
        url: queryURL,
        method: "GET"
    })
        // We store all of the retrieved data inside of an object called "response"
        .then(function (response) {

            // Log the queryURL
            console.log(queryURL);
        // Variables for ajax call
        var APIKey = "7e9660df6b46d307a4673d7d7829d2f1";
        var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?" +
            "q=" + citySearch + "&units=imperial&appid=" + APIKey;


        // First Ajax call to populate main card
        $.ajax({
            url: currentWeatherURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);

                var lattitude = response.coord.lat;
                var longitude = response.coord.lon;
                var uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lattitude + "&lon=" + longitude + "&appid=" + APIKey;


            // Log the resulting object
            console.log(response);
            
                var searchDate = new Date(response.dt * 1000);
                formatedDate = searchDate.toLocaleString("en-US", { month: "long", day: "numeric", year: "numeric" });


                // Create icon element from search
                var iconCode = response.weather[0].icon;
                iconUrl = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
                console.log(iconCode);

            cityH2.text(citySearch);

                cardBody.empty();
                cardBody.append(/*html*/`<h2 class="card-title">${response.name} ${formatedDate} <img src="${iconUrl}"></h2>
                        <p class="card-text" id="temp">Temperature: ${response.main.temp} &#8457;</p>
                        <p class="card-text" id="humidity">Humidity: ${response.main.humidity}%</p>
                        <p class="card-text" id="wind">Wind Speed: ${response.wind.speed}MPH</p>
                        <p class="card-text">Uv Index: <span class="badge bg-success" id="uv-index">0/10</span></p>
                        `);
        });
                //Second Ajax call for UV Index
                $.ajax({
                    url: uvIndexURL,
                    method: "GET"
                })
                    .then(function (response) {
                        console.log(uvIndexURL);
                        console.log(response);
                        $("#uv-index").text("UV Index: " + response.value);

                    })
                    .catch(function (error) {
                        console.log(error);
                    })


            })
            .catch(function (error) {
                console.log(error);
            });

    })

})