// Your code here
// key: 508e60c837e224615d876c902697bf3f
// test: https://api.openweathermap.org/data/2.5/weather?q=London&units=imperial&appid=APIKEY
const form = document.querySelector('form')
const cityInput = document.getElementById('weather-search')
const section = document.getElementById('weather')



form.onsubmit = async (e) => {
    e.preventDefault()
    const city = cityInput.value.trim()
    const apiKey = '508e60c837e224615d876c902697bf3f'
    if (!city) return 
    cityInput.value = ''
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`) 
        const weatherData = await res.json()
        renderWeather(weatherData)
       
        //console.log(weatherData)
    } catch {
        section.innerHTML = `<p>Location not found</p>`
       
    }
    
}
const renderWeather = ({
    name,
    dt,
    sys: {
        country
    },
    coord: {
        lat,
        lon
    },
    main: {
        temp,
        feels_like
    },
    weather: [
        {
            icon,
            description
        }
    ]

}) => {
    //console.log(renderWeather)
    section.innerHTML = `<h2>${name}, ${country}</h2>
    <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lon}" target="_blank">Click to view map</a>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <p>${description}</p>
    <p>Current: ${temp}° F</p>
    <p>Feels like: ${feels_like}° F</p>
    <p>Last updated: ${formatTime(dt)}</p>`

    

}

const formatTime = (timestamp) => {
    const time = new Date(timestamp * 1000)
    const timeString = time.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    return timeString 
}
    
   
   
      
            
            
        
       
