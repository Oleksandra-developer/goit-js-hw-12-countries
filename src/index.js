import './styles.css';
import '../node_modules/@pnotify/core/dist/PNotify.css';
import '../node_modules/@pnotify/mobile/dist/PNotifyMobile.css';
import { alert, defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
  import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import countryMarkup from './templates/markupOneCard.hbs';
import countriesMarkUp from './templates/markupList.hbs'
import fetchCountries from './js/fetchCountries.js';
import debounce from 'lodash.debounce';


const refs = {
  searchForm: document.querySelector('.js-search-form'),
  input: document.querySelector('#searchQuery'),
 result: document.querySelector('.container_result') 
}
 
refs.input.addEventListener('input', debounce(onSearch, 1000));
refs.input.addEventListener('blur', clearPage);

function onSearch(e) {
  const inputValue = e.target.value;
  if (inputValue !== "") {
    fetchCountries(inputValue).then(countryToFound).catch(() => {defaultModules.set(PNotifyMobile, {});
    alert ({
  title: 'Error onSearch',
  text: 'Sorry, we cannot render markup'
})});
  }
  clearPage();
}
function countryToFound(data) {
  if (data.length === 1) {
    console.log(...data);
    const markUpOneCard = countryMarkup(...data);
    refs.result.innerHTML = markUpOneCard;
  } else
    if (1 < data.length && data.length < 10) {
    console.log(data);
    const markUpCardsList = countriesMarkUp(data);
    refs.result.innerHTML = markUpCardsList;
  } else {
    console.log('render error')
     defaultModules.set(PNotifyMobile, {});
  alert({
    title: 'Bad request',
  text: 'To many matches found. Please enter a more specific query!'
  })
    }
  }
function clearPage() {
  refs.result.innerHTML = '';
}