const button = document.querySelector('.buttonSearch');
const inputCity = document.querySelector('.inputCity');
const city = document.querySelector('.city');
const country = document.querySelector('.country');
const temp = document.querySelector('.temp');
const day = document.querySelector('.actualDay');
const time = document.querySelector('.time');
const drop = document.querySelector('.drop');
const wind = document.querySelector('.wind');
const img = document.querySelector('#imgTemp');

const apiKey = ''

async function getWeather(){
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&appid=${apiKey}&lang=pt_br`, {
        method: 'GET',
        mode: "cors",
        cache: 'default'
    })
    const data = await res.json()
    return data;
}

function handleClick(e){
    e.preventDefault()

    viewInDinsplay()
    clearValue();
}

async function viewInDinsplay(){
    const data = await getWeather()

    if(data.weather[0].main == 'Rain'){
        img.setAttribute('src', './assets/rainyDay.svg')
    }

    console.log(data.weather[0].main)

    city.innerText = data.name
    country.innerHTML = data.sys.country
    temp.innerHTML = parseInt(data.main.temp) 
    drop.innerHTML = data.main.humidity
    wind.innerHTML = `${data.wind.speed}Km/h`
    day.innerHTML = data.lastupdate.value

}

function clearValue(){
    document.querySelector('.inputCity').value = ''
}

console.log(getWeather())
button.addEventListener('click', handleClick);
