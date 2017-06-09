'use strict';

let resultObj = {};
let finalString = '';

function getRandomeCity() {

  const cities =
    {"New York": "8405837",
    "Los Angeles":"3884307",
    "Chicago":"2718782",
    "Houston": "2195914",
    "Philadelphia": "1553165"
    // "Phoenix": "1513367",
    // "San Antonio": "1409019",
    // "San Diego": "1355896",
    // "Dallas": "1257676",
    // "San Jose": "998537",
    // "Austin": "885400",
    // "Indianapolis": "843393",
    // "Jacksonville": "842583",
    // "San Francisco": "837442",
    // "Columbus": "822553",
    // "Charlotte": "792862",
    // "Fort Worth": "792727",
    // "Detroit": "688701",
    // "El Paso": "674433",
    // "Memphis": "653450",
    // "Seattle": "652405",
    // "Denver": "649495",
    // "Washington": "646449",
    // "Boston": "645966",
    // "Nashville-Davidson": "634464",
    // "Baltimore": "622104",
    // "Oklahoma City": "610613",
    // "Louisville/Jefferson County": "609893",
    // "Portland": "609456",
    // "Las Vegas": "603488",
    // "Milwaukee": "599164",
    // "Albuquerque": "556495",
    // "Tucson": "526116",
    // "Fresno": "509924",
    // "Sacramento": "479686",
    // "Long Beach": "469428",
    // "Mesa": "457587",
    // "Virginia Beach": "448479",
    //  "Atlanta": "447841",
    // "Colorado Springs": "439886",
    // "Omaha": "434353",
    // "Raleigh": "431746",
    // "Miami": "417650",
    // "Oakland": "406253",
    // "Minneapolis": "400070",
    // "Tulsa": "398121",
    // "Cleveland": "390113",
    // "Wichita": "386552",
    // "Arlington": "379577",
    // "New Orleans": "378715",
    // "Bakersfield": "363630",
    // "Tampa": "352957",
    // "Honolulu": "347884",
    // "Aurora": "345803",
    // "Anaheim": "345012",
    // "Santa Ana": "334227",
    // "St. Louis": "318416",
    // "Riverside": "316619",
    // "Corpus Christi": "316381",
    // "Lexington-Fayette": "308428",
    // "Pittsburgh": "305841",
    // "Anchorage": "300950",
    // "Stockton": "298118",
    // "Cincinnati": "297517",
    // "St. Paul": "294873",
    // "Toledo": "282313",
    // "Greensboro": "279639",
    // "Newark": "278427",
    // "Plano": "274409"
    };

    let countingArr = [];
    let minimum = 9999999;

    function getMin() {
      for (var city in cities) {
        if (minimum > +cities[city]) { return minimum = cities[city] }
        }
      };

    function createCountingArr() {
      for (var city in cities) {
        const index = Math.round((+cities[city]/minimum) * 10);
        for(let i = 0; i < index; i++) {
          countingArr.push(city);
        }
      }
    };
   createCountingArr();

   function getRandom(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min + 1)) + min;
   };
  let randomCity = countingArr[getRandom(1, countingArr.length-1)];
  if(!resultObj[randomCity]) {
    resultObj[randomCity] = 1;
  } else {
    resultObj[randomCity] += 1;
  };
};

function multiplyCall() {
   resultObj = {};
   finalString = '';
   for (var i = 0; i < 1000; i++) {
        getRandomeCity();
    }
    for (let item in resultObj) {
    finalString += `<div>${item} : ${resultObj[item]}</div>`;
  }
   document.querySelector('.result').innerHTML = finalString;
};

document.querySelector('button').addEventListener('click', multiplyCall);
