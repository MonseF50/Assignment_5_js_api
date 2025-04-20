let searchInput = document.getElementById('searchInput');
let cityText = document.getElementById('cityText');
let rowData = document.getElementById('rowData');
let baseUrlWeather = 'https://api.weatherapi.com/v1/forecast.json?key=bc16b74e4a85499bb6f222657251604&q='
let today = new Date();
let curentHour = today.getHours();
let monthName = today.toLocaleDateString('en-US', { month: 'long' }); 
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let curentDay = days[today.getDay()];
let nextDay = days[(today.getDay() + 1) %7];
let afterNextDay = days[(today.getDay() + 2)% 7] ;
let myFrom = document.querySelector('form');
myFrom.addEventListener('submit', (e)=>{
    e.preventDefault();
})
if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
        let latitude   =  position.coords.latitude;
        let longitude  = position.coords.longitude;
        let cityRequest = `https://api.opencagedata.com/geocode/v1/json?q=${latitude},${longitude}&key=0a011d5ef52c4bd6842968a39c1ec048`;
        // console.log(latitude , longitude);
        async function getLocation(params){
            let resopn = await fetch(params);
            let data = await resopn.json();
            let city = data.results[0].components.country;
            getWeather(city)
        }
        getLocation(cityRequest);
    })
}
setTimeout(() => {
    
}, 2000);

searchInput.addEventListener('input', () => {
    getWeather(searchInput.value);
})

async function getWeather(params) {
    let resopn = await fetch(`${baseUrlWeather}${params}&days=3`, { method: 'GET' });
    let data = await resopn.json();
    console.log(data);
    display(data);
};

function display(parm){
    let currentWeatherCard = `
                        <div class="col" data-aos="fade-right"
                                         ata-aos-offset="500"
                                         data-aos-easing="linear">
                        <div class="inner">
                            <div class="card">
                                <div class="card-header d-flex justify-content-between">
                                    <p>${curentDay}</p>
                                    <p>${today.getDate()}${monthName}</p>
                                </div>
                                <div class="card-body">
                                    <h3 class="text-secondary">${parm.location.name}</h3>
                                    <span class="d-block text-white">${parm.current.temp_c}<sup>o</sup>C</span>
                                    <img src="http:${parm?.current?.condition?.icon}" alt="at night" class="d-block">
                                    <span class="d-block text">${parm?.current?.condition?.text}</span>
                                    <div class="icons-weatherData d-flex justify-content-start gap-4 mt-3">
                                        <div class="umbrella">
                                            <img src="./img/icon-umberella.png" alt="umbrerlla icon">
                                            <span>20%</span>    
                                        </div>
                                        <div class="wind">  
                                            <img src="./img/icon-wind.png" alt="wind icon">
                                            <span>${parm?.current?.wind_kph} m/h</span>
                                        </div>
                                        <div class="compass">
                                            <img src="./img/icon-compass.png" alt="compass icon">
                                            <span>${parm?.current?.wind_dir}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                        <div class="col myCard"     data-aos="zoom-in-up"
                                                    ata-aos-offset="1200"
                                                    data-aos-easing="linear">
                        <div class="inner">
                            <div class="card">
                                <div class="card-header text-center">
                                    <p>${nextDay}</p>
                                </div>
                                <div class="card-body">
                                    <img src="http:${parm.forecast.forecastday[1].day.condition.icon}" alt="at night" class="d-block m-auto">
                                    <div class="text-white text-center h3">${parm.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
                                    <small class=" d-flex justify-content-center  text-secondary">${parm.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
                                    <p class="d-block text-center text my-3">${parm.forecast.forecastday[1].hour[curentHour].condition.text}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col myCard"  data-aos="fade-left"
                                            ata-aos-offset="2000"
                                            data-aos-easing="linear">
                        <div class="inner">
                            <div class="card">
                                <div class="card-header text-center">
                                    <p>${afterNextDay}</p>
                                </div>
                                <div class="card-body">
                                    <img src="http:${parm.forecast.forecastday[2].day.condition.icon}" alt="at night" class="d-block m-auto">
                                    <div class="text-white text-center h3">${parm.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
                                    <small class=" d-flex justify-content-center  text-secondary">${parm.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
                                    <p class="d-block text-center text my-3">${parm.forecast.forecastday[2].hour[curentHour].condition.text}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    `
                    rowData.innerHTML = currentWeatherCard
}











