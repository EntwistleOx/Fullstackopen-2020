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
  return (
    <>
      {single ? <CountrieInfo countrie={countrie} /> : <dt>{countrie.name}</dt>}
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
      <Flag flag={countrie.flag} />
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

const Flag = ({ flag }) => {
  return <img src={flag} alt='flag' width='100px' />;
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
