import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Countries = ({ countries }) => {
  return (
    <>
      {countries.length > 9 ? (
        'Too many matches, specify another filter'
      ) : (
        <dl>
          {countries.map((countrie) => (
            <Countrie
              countrie={countrie}
              single={countries.length === 1 ? true : false}
              key={countrie.alpha2Code}
            />
          ))}
        </dl>
      )}
    </>
  );
};

const Countrie = ({ countrie, single }) => {
  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };
  return (
    <>
      {single ? (
        <CountrieInfo countrie={countrie} />
      ) : (
        <dt>
          {countrie.name}{' '}
          <input type='button' value='show' onClick={handleClick} />
          {show && <CountrieInfo countrie={countrie} />}
        </dt>
      )}
    </>
  );
};

const CountrieInfo = ({ countrie }) => {
  return (
    <>
      <h1>{countrie.name}</h1>
      <p>Capital: {countrie.capital}</p>
      <p>Population: {countrie.population}</p>
      <h2>Languages</h2>
      <Languages languages={countrie.languages} />
      <Img img={countrie.flag} />
      <Weather capital={countrie.capital} />
      <hr />
    </>
  );
};

const Languages = ({ languages }) => {
  return (
    <ul>
      {languages.map((language) => (
        <Language language={language.name} key={language.iso639_1} />
      ))}
    </ul>
  );
};

const Language = ({ language }) => {
  return <li>{language}</li>;
};

const Img = ({ img }) => {
  return <img src={img} alt='flag' width='100px' />;
};

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}&unit=m`
      )
      .then((weather) => {
        setWeather(weather.data);
      });
  }, []);

  console.log(weather);

  return (
    <>
      {Object.keys(weather).length === 0 || weather.error ? (
        <h2>'Cargando...'</h2>
      ) : (
        <>
          <h2>Weather in {capital}</h2>
          <p>Temprature: {weather.current.temperature}° Celsius</p>
          <p>
            Wind: {weather.current.wind_speed}Km/hr, direction{' '}
            {weather.current.wind_dir}
          </p>
          <Img img={weather.current.weather_icons} />
        </>
      )}
    </>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((resp) => {
      setCountries(resp.data);
    });
  }, []);

  const handleSearch = (e) => {
    console.log(e.target.value);
    const searched = countries.filter((countrie) => {
      return countrie.name.includes(e.target.value);
    });
    setSearch(searched);
  };
  return (
    <>
      <h1>Countries Finder</h1>
      <p>
        Find countries <input name='countrie' onChange={handleSearch} />
      </p>
      <Countries countries={search} />
    </>
  );
};

export default App;
