const API_KEY = 'your_api_key';
const searchButton = document.querySelector('.search-button');
const searchBar = document.querySelector('.search-bar');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const container = document.querySelector('.container');

searchButton.addEventListener('click', () => {
    const city = searchBar.value.trim();
    if (!city) {
        alert("Proszę wprowadz nazwę miasta!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error('Nie znaleziono miasta!');
            return response.json();
        })
        .then(data => {
            const temprature = document.querySelector('.temprature');
            const description = document.querySelector('.description');
            const image = document.querySelector('.weather-box img');
            const humidity = document.querySelector('.humidity');
            const pressure = document.querySelector('.pressure');
            const windSpeed = document.querySelector('.wind-speed');

            temprature.textContent = `${Math.round(data.main.temp)}°C`;
            description.textContent = data.weather[0].main;
            humidity.textContent = `${data.main.humidity}%`;
            pressure.textContent = `${data.main.pressure} hPa`;
            windSpeed.textContent = `${data.wind.speed} m/s`;

            const weatherCondition = data.weather[0].main.toLowerCase();
            switch (weatherCondition) {
                case 'clear':
                    image.src = 'images/clear.jpg';
                    description.textContent = 'Czyste niebo';
                    break;
                case 'clouds':
                    image.src = 'images/cloud.jpg';
                    description.textContent = 'Zachmurzenie';
                    break;
                case 'rain':
                    image.src = 'images/rain.jpg';
                    description.textContent = 'Deszczowo';
                    break;
                case 'snow':
                    image.src = 'images/snow.jpg';
                    description.textContent = 'Śnieg';
                    break;
                case 'thunderstorm':
                    image.src = 'images/thunderstorm.jpg';
                    description.textContent = 'Burza';
                    break;
                default:
                    image.src = 'images/404.jpg';
                    break;
            }

            weatherDetails.style.display = 'flex';
            weatherBox.style.maxHeight = '500px';
            weatherBox.style.padding = '20px 0';
        })
        .catch(error => {
            const temprature = document.querySelector('.temprature');
            const description = document.querySelector('.description');
            const image = document.querySelector('.weather-box img');

            temprature.textContent = '';
            description.textContent = 'Nie znaleziono takiego miasta';
            image.src = 'images/404.jpg';

            
            weatherDetails.style.display = 'none';
            weatherBox.style.maxHeight = '300px';
            weatherBox.style.padding = '20px 0';
        });
});