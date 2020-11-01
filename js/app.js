"use strict";

var totalClicks = 0;
var items = [];
var imgOne = document.getElementById('imgOne');
var imgTwo = document.getElementById('imgTwo');
var imgThree = document.getElementById('imgThree');
var ul = document.getElementById('resultslist');
var results = document.getElementById('results');

function Items(name) {
  this.name = name;
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  items.push(this);
}

new Items('bag');
new Items('banana');
new Items('bathroom');
new Items('boots');
new Items('breakfast');
new Items('bubblegum');
new Items('chair');
new Items('cthulhu');
new Items('dog-duck');
new Items('dragon');
new Items('pen');
new Items('pet-sweep');
new Items('scissors');
new Items('shark');
new Items('sweep');
new Items('tauntaun');
new Items('unicorn');
new Items('usb');
new Items('water-can');
new Items('wine-glass');

function randomItem() {
  return Math.floor(Math.random() * items.length);
}

function renderItems() {
  var itemOne = randomItem();
  var itemTwo = randomItem();
  var itemThree = randomItem();

  itemOne = checkDuplicates(itemOne, itemTwo, itemThree);
  itemTwo = checkDuplicates(itemTwo, itemOne, itemThree);
  itemThree = checkDuplicates(itemThree, itemTwo, itemOne);

  imgOne.src = items[itemOne].src;
  imgOne.alt = items[itemOne].name;
  items[itemOne].views++;

  imgTwo.src = items[itemTwo].src;
  imgTwo.alt = items[itemTwo].name;
  items[itemTwo].views++;

  imgThree.src = items[itemThree].src;
  imgThree.alt = items[itemThree].name;
  items[itemThree].views++;
}

renderItems();

function checkDuplicates(x, y, z){
  while (x === y || x === z){
    x = randomItem();
  }
  return x;
}

function handleClick(e){
  var clickedItem = e.target.alt;
  totalClicks++;
  console.log(clickedItem);
  for(var i = 0; i < items.length; i++){
    if (clickedItem === items[i].name){
      items[i].votes++;
    }
  }
  renderItems();

  if (totalClicks === 25){
    parentElement.removeEventListener('click', handleClick);

    for (var i = 0; i < items.length; i++){
      var li = document.createElement('li');
      li.textContent = `${capitalize(items[i].name)} had ${items[i].votes} votes, and was seen ${items[i].views} times.`;
      ul.appendChild(li);
    }
  }
}

function capitalize(word){
  var wordCapitalized = word.charAt(0).toUpperCase() + word.slice(1);
  return wordCapitalized;
}

var parentElement = document.getElementById('container');
parentElement.addEventListener('click', handleClick);

var trigger = false;
ul.style.marginLeft = '-999px';

function handleResults(){
  if (trigger === false) {
    ul.style.marginLeft = '0';
    ul.style.textAlign = 'center';
    trigger = true;
  } else if (trigger === true) {
    ul.style.marginLeft = '-999px';
    ul.style.textAlign = 'left';
    trigger = false;
  }
}

results.addEventListener('click', handleResults);
