'use strict';

const secondHand = document.querySelector('.hand-sec');
const minHand = document.querySelector('.hand-min');
const hourHand = document.querySelector('.hand-hour');

function setDate(){
  const date = new Date();
  const hours = (date.getHours() > 12) ? date.getHours() - 12 : date.getHours();
  const secondDegrees = date.getSeconds() * 6 + 90;
  const minDegrees = ((date.getMinutes() * 60) + date.getSeconds()) * 0.1  + 90;
  const hourDegrees = (hours * 30 + 90) + (date.getMinutes() / 12) * 6;
  secondHand.style.transform = `rotate(${secondDegrees}deg)`;
  minHand.style.transform = `rotate(${minDegrees}deg)`;
  hourHand.style.transform = `rotate(${hourDegrees}deg)`;
};
setInterval(setDate, 1000);
