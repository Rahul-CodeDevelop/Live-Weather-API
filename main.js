const date = document.querySelector('#date');
const description = document.querySelector('#description');
const temp = document.querySelector('#temp');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
const search = document.querySelector('#search');
const submitbtn = document.querySelector('#search-icon');
const loc = document.querySelector('#cityName');
const currentLoc_btn = document.querySelector('#currentLoc_btn')

const showWeather = async (city, api_key) => {
    try {
        cityName.innerHTML = city
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_key}`
        // const url = `https://pro.openweathermap.org/data/2.5/forecast/hourly?q=${cityname}&appid=${api_id}`
        let response = await fetch(url);
        if (response.status == 200) {
            let result = await response.json();
            temp.innerHTML = Math.floor(result.main.temp)
            humidity.innerHTML = result.main.humidity
            wind.innerHTML = result.wind.speed
            description.innerHTML = result.weather[0].description
        }
        else {
            throw new Error()
        }
    }
    catch (error) {
        cityName.innerHTML = "Please Enter Valid City Name"
        cityName.style.cssText="color:red"
    }
}

submitbtn.addEventListener('click', () => {
    showWeather(search.value, "da795fe6fde9f96c1f1f843af3335ef7");
})

const getDate = (() => {

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    const today = new Date()
    let dd = today.getDate()
    let mm = months[today.getMonth()]
    let yy = today.getFullYear()
    date.innerHTML = `${dd}-${mm}-${yy}` //output --> 14-March-2023
})()
// getDate()

const getPosition = async () => {
    const successHandler = async (position) => {
        try {
            let latitude = position.coords.latitude
            let longitude = position.coords.longitude

            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=b275f0cfb1a5bf36b58fbf288d72591b`)
            let result = await response.json()

            cityName.innerHTML = result.name
            search.value = result.name
            temp.innerHTML = Math.floor(result.main.temp)
            humidity.innerHTML = result.main.humidity
            wind.innerHTML = result.wind.speed
            description.innerHTML = result.weather[0].description
        }
        catch (error) {
            cityName.innerHTML = "Please Enter Valid City Name"
        }

    }
    const errorHandler = (error) => {
        // console.log(error)
        cityName.innerHTML = "Please allow your location access or search manually !"
    }

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler)
}


currentLoc_btn.addEventListener('click', () => {
    getPosition();
    cityName.innerHTML = "Wait ! Accessing Location.."
})



