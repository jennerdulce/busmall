'use strict';

var user = prompt('Please Enter Your Name.. ');
while (!user) {
  user = prompt("Please enter your name")
}
var totalClicks = 0;
var items = [];
var dataLabels = [];
var dataVotes = [];
var dataViews = [];
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

function capitalize(word) {
  var wordCapitalized = word.charAt(0).toUpperCase() + word.slice(1);
  return wordCapitalized;
}

var renderQueue = [];

function populateQueue() {
  while (renderQueue.length > 3) {
    renderQueue.shift();
  }

  while (renderQueue.length < 6) {
    var item = randomItem();
    while (renderQueue.includes(item)) {
      item = randomItem();
    }
    renderQueue.push(item);
  }
}

function renderItems() {
  populateQueue();
  var itemOne = renderQueue[0];
  var itemTwo = renderQueue[1];
  var itemThree = renderQueue[2];

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

// initial render
renderItems();

// function of the event listener
function handleClick(e) {

  // targets the element which is an image tag; .alt retrieves what is in the alt attribute of the element
  // typically, 'e.target.name.value' would be used in a form to retrieve the data
  var clickedItem = e.target.alt;
  if (clickedItem) {
    totalClicks++;
    renderItems();
    // the chosen item is then compared to the items array
    for (var i = 0; i < items.length; i++) {
      // once matched, increments the votes property of that object
      if (clickedItem === items[i].name) {
        items[i].votes++;
      }
    }

    if (totalClicks === 25) {
      parentElement.removeEventListener('click', handleClick);

      thankYou.textContent = `Thank you ${user}! We appreciate your help and we hope you have a wonderful day!`;

      // get data andrender chart
      getData();
      renderChart();

      // appends content to the list to display the data
      for (var i = 0; i < items.length; i++) {
        var li = document.createElement('li');
        li.textContent = `${capitalize(items[i].name)} had ${items[i].votes} votes, and was seen ${items[i].views} times.`;
        ul.appendChild(li);
      }
      // will only trigger when totalClicks = 2
    }
  } else {
    alert('Please click on an image.')
  }
}

// event listener on container element
var parentElement = document.getElementById('container');
parentElement.addEventListener('click', handleClick);

// ability to hide/show data
var trigger = false;
ul.style.marginLeft = '-999px';

function handleResults() {
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


function getData() {
  for (var i = 0; i < items.length; i++) {
    dataVotes.push(items[i].votes);
    dataViews.push(items[i].views);
    dataLabels.push(items[i].name)
  }
  console.log(dataLabels)
  console.log(dataViews)
  console.log(dataVotes)
}

var myChart = document.getElementById('graph')
function renderChart() {
  var barChart = new Chart(myChart, {
    type: 'bar',
    data: {
      labels: dataLabels,
      datasets: [{
        label: '# of Views',
        data: dataViews,
        backgroundColor: 'rgba(128, 179, 255, 0.886)',
        borderColor: 'rgba(71, 144, 255, 0.886)',
        borderWidth: 2,
      }, {
        label: '# of Votes',
        data: dataVotes,
        backgroundColor: 'rgba(255, 128, 128, 0.886)',
        borderColor: 'rgba(255, 81, 81, 0.886)',
        borderWidth: 2,
      }],
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    }
  });
}


var cars = {
  name: 'honda',
  year: '2012',
  color: 'blue'
}

cars.color


car Construactors(make, year, color){
  this.make = make;
  this.year = year;
  this.color = color;
  this.views =views
}

var cars = new Constructor(honda, 2012, blue)
color.views




var products = [obj1, obj2]
new Constructor('Honda', '2009', 'blue');
new Constructor('Ford', '2012', 'red');

prodcuts[0].color;