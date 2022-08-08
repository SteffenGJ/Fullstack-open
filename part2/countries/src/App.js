import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {

const [search, setSearch] = useState("");
const [countries, setCountries] = useState([]);
const [chosen, setChosen] = useState(null)
const [weather, setWeather] = useState(null);
const apiKey = process.env.REACT_APP_API_KEY;



const relevant = countries.filter(country => country.name.common.toLowerCase().startsWith(search.toLowerCase()));

useEffect(() => {
  axios
    .get("https://restcountries.com/v3.1/all")
    .then(response => {
      setCountries(response.data);
    })
}, [])

useEffect(() => {
  if (relevant.length === 1) {
  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${relevant[0].capitalInfo.latlng[0]}&lon=${relevant[0].capitalInfo.latlng[1]}&appid=${apiKey}`)
    .then(response => {
      setWeather(response.data);
    })
  }
}, [search])

  

  return (
    <div>
      <div>Countries: <input value={search} onChange={(e) => setSearch(e.target.value)}/></div>
      {relevant.length === 1 ? 
      <div>
        <h1>{relevant[0].name.common} {relevant[0].flag}</h1>
        <p><strong>Captial:</strong> {relevant[0].capital}</p>
        <p><strong>Population:</strong>{relevant[0].population}</p>
        <p><strong>Languages:</strong></p>
        <ul>
          {relevant.length === 1 && Object.keys(relevant[0].languages).map(key => <li key={relevant[0].languages[key]}>{relevant[0].languages[key]}</li>)}
        </ul>
        <p><strong>Weather in {relevant[0].capital}:</strong></p>
        {weather && 
        <div>
        <p>Temperature is {Math.round(weather.main.temp - 272.15)} C</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>{weather.weather[0].description}</p>
        </div>
        }
      </div> 
      :
      <div>
        {relevant.length <= 10 ? 
        <div>
          {relevant.map(country => {
            return (
              <div key={country.name.common}>
                <p>{country.name.common}</p>
                <button onClick={() => setChosen(relevant.indexOf(country))}>Show country {relevant.indexOf(country)}</button>
                {chosen === relevant.indexOf(country) &&
                <div>
                <h1>{relevant[chosen].name.common} {relevant[chosen].flag}</h1>
                <p><strong>Captial:</strong> {relevant[chosen].capital}</p>
                <p><strong>Population:</strong>{relevant[chosen].population}</p>
                <p><strong>Languages:</strong></p>
                <ul>
                  {Object.keys(relevant[chosen].languages).map(key => <li key={relevant[chosen].languages[key]}>{relevant[chosen].languages[key]}</li>)}
                </ul>
              </div>}
              </div>)
          })}
        </div> 
        : <p>Too many matches, specify filter</p>}
      </div>}
    </div>
  );
}

export default App;
