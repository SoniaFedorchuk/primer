function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

let lan, lon

navigator.geolocation.getCurrentPosition(function(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    fetch('http://api.weatherbit.io/v2.0/current?lat=' + lat + '&lon=' + lon + '&key=61d3de37c767432591ba735c11fb7d96&include=minutely').then(function(response) {
        response.json().then(function(weather) {
            SetWeatherData(weather)
        });
    });
}, function(error) {
    fetch('http://api.weatherbit.io/v2.0/current?city=Kiev&key=61d3de37c767432591ba735c11fb7d96&include=minutely').then(function(response) {
        response.json().then(function(weather) {
            SetWeatherData(weather);
        });
    });
})

function SetWeatherData(weather) {
    document.querySelector(".name-city").textContent = weather.data[0]["city_name"]
    let img = document.createElement("img")
    img.height = 64
    img.width = 64
    img.src = "icons/" + weather.data[0]["weather"]["icon"] + ".png"
    document.querySelector(".weather-description").textContent = weather.data[0]["weather"]["description"]
    document.querySelector(".weather-description").appendChild(img)
    document.querySelector(".tempnow").textContent = weather.data[0]["temp"]
    document.querySelector(".tempfeel").textContent = weather.data[0]["app_temp"]
    document.querySelector(".cyclehour").textContent = weather.data[0]["datetime"]
    document.querySelector(".partday").textContent = weather.data[0]["pod"] == "d" ? "☀️" : "🌙"
    document.querySelector(".visible").textContent = weather.data[0]["vis"]

    document.querySelector(".speed").textContent = weather.data[0]["wind_spd"]
    document.querySelector(".sunrtime").textContent = weather.data[0]["sunrise"]
    document.querySelector(".sunstime").textContent = weather.data[0]["sunset"]
    document.querySelector(".cloud").textContent = weather.data[0]["clouds"]
    document.querySelector(".wdirect").textContent = weather.data[0]["wind_dir"]

    document.querySelector(".snowfall").textContent = weather.data[0]["snow"]
    document.querySelector(".timezone").textContent = weather.data[0]["timezone"]
    document.querySelector(".countrycode").textContent = weather.data[0]["country_code"]
    document.querySelector(".solarad").textContent = weather.data[0]["solar_rad"]
    document.querySelector(".verbdirect").textContent = weather.data[0]["wind_cdir_full"]
}

let CityChanged = (event) => {
    if (event.target.firstChild.textContent != "Current position") {
        fetch('http://api.weatherbit.io/v2.0/current?city=' + event.target.firstChild.textContent + '&key=61d3de37c767432591ba735c11fb7d96&include=minutely').then(function(response) {
            response.json().then(function(weather) {
                SetWeatherData(weather);
            });
        });
    } else {
        fetch('http://api.weatherbit.io/v2.0/current?lat=' + lat + '&lon=' + lon + '&key=61d3de37c767432591ba735c11fb7d96&include=minutely').then(function(response) {
            response.json().then(function(weather) {
                SetWeatherData(weather)
            });
        });
    }
}

document.getElementById("myDropdown").childNodes.forEach(element => {
    if (element.nodeName == "A") {
        element.addEventListener("click", CityChanged)
    }
})