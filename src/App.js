import React, {useState} from 'react';
const api = {
  key: "V17b8794dab4ee236b9e5ef49e867b4d6",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt => {
    if(evt.key === "enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
          console.log(result);
        });
    }
  }

  
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }


  return (
    <div className = {(typeof weather.main != "undefined")
      ? ((weather.main.temp > 16) 
        ? 'app warm'
        : 'app') 
        : 'app'}>
      <main>
        <div classname = "search-box">
          <input 
            type = "text"
            classname = "search-bar"
            placeholder = "search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            />
        </div>
          {(typeof weather.main != "undefined") ? (
            <div>


          <div classname = "location-box">
            <div classname = "location"> {weather.name}, {weather.sys.country}</div>
              <div classname = "date">{dateBuilder(new Date())}</div>
          </div>
          <div classname = "weather-box">
          <div classname = "temp">
            {Math.round(weather.main.temp)}°c
          </div>
          <div classname = "weather">{weather.ewather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
