'use strict';
const endpoint = "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.city_list');

fetch(endpoint) // fetch method returns a promise with a data and methods
  .then(blob => blob.json()) // Data named here as a blob descripted by a promise method .json(), which returns another promise with data;
  .then(data => cities.push(...data));
//console.log(cities);

function findMathes(wordToMatch, cities) {
  return cities.filter(place => {
    const regex = new RegExp(wordToMatch, 'gi'); //gi stands for 'gobally' , i.e. through all array, and 'insensityve' to register;
    return place.city.match(regex) || place.state.match(regex);
  });
};

//special function that adds commt to looong numbers
function numbersWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function displayMatches(){
  const matchArray = findMathes(this.value, cities);
  const html = matchArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
   return `
      <li>
        <span class="city">${cityName}, ${stateName}</span>
        <span class="population">${numbersWithCommas(place.population)}           </span>
      </li>
      `;
 }).join('');
  //const suggestions = document.querySelector('.city_list');
  suggestions.innerHTML = html;
  //console.log(html);
};

searchInput.addEventListener('keyup', displayMatches);

var listItem = document.querySelectorAll('.city_list li');
document.addEventListener('click', listItem, function(){
  console.log(this, 1);
} );
