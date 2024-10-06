
const cities = [    // The array of cities, with their coordinates that are to be shown on the webpage
    {name: 'Oslo', latitude: 59.911491, longitude: 10.757933},
    {name: 'Stockholm', latitude: 59.334591, longitude: 18.063240},
    {name: 'Copenhagen', latitude: 55.676098, longitude: 12.568337},
    {name: 'Helsinki', latitude: 60.192059, longitude: 24.945831},
    {name: 'Reykjavik', latitude: 64.128288, longitude: -21.827774}
];

const locationsContainer = document.getElementById('locations');    // Fetches the HTML div where the locations and their weather data are to be shown

async function getWeather() {
    locationsContainer.innerHTML = ``; //Empty the container, as we want updated data

    //Go through every city amd get data
    for (let location of cities) {  // GO through every city in the array, and fetches the weather data
        fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true`)
            .then(response => response.json())  // Convert to JSON format
            .then(data => {

                const locationElement = document.createElement('div'); // Makes a div for this city's data
                const weather = data.current_weather; // Fetches the weather data from API

                // Filling the city's data in the div created above
                locationElement.innerHTML = `
                    <h3>${location.name}</h3>
                    <p>Temperature: ${data.current_weather.temperature}°C</p>
                    <p>Wind Speed: ${data.current_weather.windspeed} km/h</p>
                    <p>Weather: ${data.current_weather.weathercode}</p>
                `;
                locationsContainer.appendChild(locationElement); // Adding location element in locations container to display it on the webpage
            })
        }
    };

    getWeather();  // Initial call of the function to fetch the data
    setInterval(getWeather, 300000); // Update the data every 5 minutes

