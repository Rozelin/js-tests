'use strict';

const cities =
    {"New York": "5",
    "Los Angeles":"22",
    "Chicago":"12",
    "Houston": "5",
    "Philadelphia": "2"
    };
let resultObj = {};
let finalString = '';
let minimum = 9999999;
let countingArr = [];

function getRandomeCity() {
   function getMin() {
     for (var city in cities) {
       if (minimum > +cities[city]) { minimum = cities[city] }
       }
    };
    getMin();

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
  resultObj[randomCity] = (!resultObj[randomCity]) ?  1 : resultObj[randomCity] + 1;
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
