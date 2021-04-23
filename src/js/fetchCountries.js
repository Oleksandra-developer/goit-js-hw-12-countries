const BASE_URL = `https://restcountries.eu//rest/v2`;

export default function fetchCountries (searchQuery) {
  
    const url = `${BASE_URL}/name/${searchQuery}`;
  
    return fetch(url) 
      .then(response => response.json())
      .catch(() => PNotify.notice({
  title: 'Error',
  text: 'Sorry, we have an error'
}));
  }
  