'use strict';

var user = prompt('Please Enter Your Name.. ');
var totalClicks = 0;
var items = [];
var imgOne = document.getElementById('imgOne');
var imgTwo = document.getElementById('imgTwo');
var imgThree = document.getElementById('imgThree');
var ul = document.getElementById('resultslist');
var results = document.getElementById('results');
var thankYou = document.getElementById('thankyou');

function Items(name) {

  // we use this to change the 'alt' attribute of the image
  this.name = name;

  // we use this to actually change the 'src' attribute of the image we retrieve VIA DOM so it displays on the html page
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

  // generates a random number
  var itemOne = randomItem();
  var itemTwo = randomItem();
  var itemThree = randomItem();

  // numbers are compared so there are no duplicates
  itemOne = checkDuplicates(itemOne, itemTwo, itemThree);
  itemTwo = checkDuplicates(itemTwo, itemOne, itemThree);
  itemThree = checkDuplicates(itemThree, itemTwo, itemOne);

  // numbers are then used as index # on the 'items' array
  // since the items are chosen, the view count for each item is increased
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

function capitalize(word){
  var wordCapitalized = word.charAt(0).toUpperCase() + word.slice(1);
  return wordCapitalized;
}

// function of the event listener
function handleClick(e){
  // targets the element which is an image tag; .alt retrieves what is in the alt attribute of the element
  // typically, 'e.target.name.value' would be used in a form to retrieve the data
  var clickedItem = e.target.alt;
  totalClicks++;

  // the chosen item is then compared to the items array
  for(var i = 0; i < items.length; i++){
    // once matched, increments the votes property of that object
    if (clickedItem === items[i].name){
      items[i].votes++;
    }
  }

  // re-renders to allow another set of selections
  renderItems();

  // will only trigger when totalClicks = 25
  if (totalClicks === 25){
    parentElement.removeEventListener('click', handleClick);
    thankYou.textContent = `Thank you ${user}! We appreciate your help and we hope you have a wonderful day!`;

    // appends content to the list to display the data
    for(var i = 0; i < items.length; i++){
      var li = document.createElement('li');
      li.textContent = `${capitalize(items[i].name)} had ${items[i].votes} votes, and was seen ${items[i].views} times.`;
      ul.appendChild(li);
    }
  }
}

// event listener on container element
var parentElement = document.getElementById('container');
parentElement.addEventListener('click', handleClick);

// ability to hide/show data
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
