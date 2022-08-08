function findDom() {
    const city = document.querySelector(".city")
    const temp = document.querySelector(".temp")
    const description = document.querySelector(".description")
    const img = document.querySelector("img")
    const button = document.querySelector(".btn")
    const input = document.querySelector("#searchInput")
    return { city, temp, description, img, button, input }
}

const dom = findDom()

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=8f2dc524675829b976cff613c1123e33`)
        const weatherData = await response.json()
        console.log(weatherData)
        return weatherData
    }
    catch (error) {
        console.log(error)
        alert("Unable to get weather data.")
    }
}

async function putDataIntoCard(city) {
    const weatherData = await getWeatherData(city)
    if (weatherData.cod === "404") {
        dom.city.textContent = ""
        dom.temp.textContent = "City not found"
        dom.description.textContent = ""
    }
    else {
        dom.city.textContent = weatherData.name
        const tempC = (weatherData.main.temp - 273.15).toFixed(1)
        dom.temp.textContent = `${tempC}\u00B0C`
        dom.description.textContent = weatherData.weather[0].main
        const weather = weatherData.weather[0].main
        getGif(weather)
    }
}

async function getGif(weather) {
    try {
        const response = await fetch(`https://api.giphy.com/v1/gifs/translate?api_key=nGJtmI3LkyCFA0RIX1cmVdUUAmtpT47W&s=${weather}`)
        const gifData = await response.json()
        dom.img.src = gifData.data.images.original.url
    }
    catch (error) {
        alert("Something went wrong with gif :(")
    }
}

dom.button.addEventListener("click", function () {
    if (dom.input.value !== "") {
        let city = dom.input.value
        putDataIntoCard(city)
    }
})

putDataIntoCard("wroclaw")