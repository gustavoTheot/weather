const api = {
    key: '5d9ff841d602718c14e5eb161f39e8c3',
    url: 'https://api.openweathermap.org/data/2.5/',
    lang: 'pt_br',
    units: 'metric'
}

const button = document.querySelector('.buttonSearch');
const inputCity = document.querySelector('.inputCity');
const city = document.querySelector('.city');
const country = document.querySelector('.country');
const temp = document.querySelector('.temp');
const day = document.querySelector('.actualDay');
const time = document.querySelector('.time');
const drop = document.querySelector('.drop');
const wind = document.querySelector('.wind');
const description = document.querySelector('.description');
const img = document.querySelector('#imgTemp');
const body = document.querySelector('body')


function veryTimeModifcTheme(){
    const hours = new Date().getHours()

    if(hours >= 18){
        body.classList.toggle('onDarkMode')
    }else{
        body.classList.remove('onDarkMode')
    }
}

veryTimeModifcTheme()
window.addEventListener('load', geolocation)

function geolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(successCallback, erroCallback) 
    }else{
        alert('Your navigator not supported geolocation')
    }

    function successCallback(position){
        let lat = position.coords.latitude;
        let long = position.coords.longitude;
        getWeatherLatAndLon(lat, long)
    }

    function erroCallback(error){
        return error
    }
}

async function getWeatherLatAndLon(lat, long){    
    const res = await fetch(`${api.url}weather?lat=${lat}&lon=${long}&lang=${api.lang}&units=${api.units}&APPID=${api.key}`, {
        method: 'GET',
        mode: "cors",
        cache: 'default'
    })
    const data = await res.json()
    viewInDinsplay(data)
    
}

button.addEventListener('click', handleClick);
function handleClick(e){
    e.preventDefault()

    getWeather(city.value)
    clearValue()
} 

async function getWeather(){
    const res = await fetch(`${api.url}weather?q=${inputCity.value}&lang=${api.lang}&units=${api.units}&appid=${api.key}`, {
        method: 'GET',
        mode: "cors",
        cache: 'default'
    })

    const data = await res.json()
    viewInDinsplay(data)
}

async function viewInDinsplay(data){
    const semana = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date()

    if(body.classList.contains('onDarkMode')){
        switch(data.weather[0].main){
            case 'Rain':
                img.setAttribute('src', './assets/rainyNight.svg')
                break;
            case 'Clouds': 
                img.setAttribute('src', './assets/noite-nublada.svg')
                break;
            case 'Clear':
                img.setAttribute('src', './assets/night.svg')
                break;
            default:
                img.setAttribute('src', './assets/weather.svg')
        }
    }else{
        switch(data.weather[0].main){
            case 'Rain':
                img.setAttribute('src', './assets/rainyDay.svg')
                break;
            case 'Clouds': 
                img.setAttribute('src', './assets/nublado.svg')
                break;
            case 'Clear':
                img.setAttribute('src', './assets/sun.svg')
                break;
            default:
                img.setAttribute('src', './assets/weather.svg')
        }
    }

    description.innerHTML = data.weather[0].description
    city.innerText = data.name
    day.innerHTML = `${semana[date.getDay()]},`
    time.innerHTML = `${date.getHours()}:${date.getMinutes()}` 
    country.innerHTML = data.sys.country
    temp.innerHTML = `${parseInt(data.main.temp)}°`
    drop.innerHTML = `${data.main.humidity}%`
    wind.innerHTML = `${data.wind.speed}Km/h`
}

function clearValue(){
    document.querySelector('.inputCity').value = ''
}
let date = new Date()
console.log(date.getHours(),':',date.getMinutes())




