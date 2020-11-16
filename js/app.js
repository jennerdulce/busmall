'use strict';

var user = prompt('Please Enter Your Name.. ');
while (!user) {
  user = prompt("Please enter your name");
}
var totalClicks = 0;
var items = [];
var dataLabels = [];
var dataVotes = [];
var dataViews = [];
var renderQueue = [];
var imgOne = document.getElementById('imgOne');
var imgTwo = document.getElementById('imgTwo');
var imgThree = document.getElementById('imgThree');
var ul = document.getElementById('resultslist');
var results = document.getElementById('results');
var thankYou = document.getElementById('thankyou');
var itemList = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum','chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep','scissors','shark','sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];


function Item(name) {

  // we use this to change the 'alt' attribute of the image
  this.name = name;

  // we use this to actually change the 'src' attribute of the image we retrieve VIA DOM so it displays on the html page
  this.src = `img/${name}.jpg`;
  this.views = 0;
  this.votes = 0;
  items.push(this);
}

// you can put all strings in an array and then for loop through ti
// for (var i =0; i < Array.length; i++){
//   new Item(array[i]);
// }

// Retrieves data if data has been stored locally
var retrievedData = localStorage.getItem('storedResults');
if (retrievedData) {
  var parsedRetrievedData = JSON.parse(retrievedData);
  items = parsedRetrievedData;
} else {
  generateItems(itemList);
}

function generateItems(array){
  for (var i = 0; i < array.length; i++) {
    new Item(array[i]);
  }
}

function randomItem() {
  return Math.floor(Math.random() * items.length);
}

function capitalize(word) {
  var wordCapitalized = word.charAt(0).toUpperCase() + word.slice(1);
  return wordCapitalized;
}

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

function getData() {
  for (var i = 0; i < items.length; i++) {
    dataVotes.push(items[i].votes);
    dataViews.push(items[i].views);
    dataLabels.push(capitalize(items[i].name));
  }
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

      // once we get all the data
      // storing using localStorage.setItem() and var = JSON.stringify(listOfObjects)
      var stringifiedResults = JSON.stringify(items);
      localStorage.setItem('storedResults', stringifiedResults);

      // appends content to the list to display the data
      for (var i = 0; i < items.length; i++) {
        var li = document.createElement('li');
        li.textContent = `${capitalize(items[i].name)} had ${items[i].votes} votes, and was seen ${items[i].views} times.`;
        ul.appendChild(li);
      }
      // will only trigger when totalClicks = 2
    }
  } else {
    alert('Please click on an image.');
  }
}

// event listener on container element
var parentElement = document.getElementById('container');
parentElement.addEventListener('click', handleClick);

// ability to hide/show data
var trigger = false;
ul.style.display = 'none';

function handleResults() {
  if (trigger === false) {
    ul.style.marginLeft = '0';
    ul.style.textAlign = 'center';
    ul.style.display = 'initial';
    trigger = true;
  } else if (trigger === true) {
    // ul.style.marginLeft = '-999px';
    ul.style.display = 'none';
    trigger = false;
  }
}
results.addEventListener('click', handleResults);

// chart JS

Chart.defaults.global.defaultFontFamily = 'sans-serif';
Chart.defaults.global.defaultFontSize = 18;
Chart.defaults.global.defaultFontColor = '#777'
var myChart = document.getElementById('graph');
function renderChart() {
  var barChart = new Chart(myChart, {
    type: 'bar',
    data: {
      labels: dataLabels,
      datasets: [{
        label: '# of Votes',
        data: dataVotes,
        backgroundColor: 'rgba(255, 128, 128, 0.886)',
        borderColor: 'rgba(255, 81, 81, 0.886)',
        borderWidth: 2,
        hoverBorderWidth: 4,
        hoverBorderColor: 'black',
      }, {
        label: '# of Views',
        data: dataViews,
        backgroundColor: 'rgba(128, 179, 255, 0.886)',
        borderColor: 'rgba(71, 144, 255, 0.886)',
        borderWidth: 2,
        hoverBorderWidth: 4,
        hoverBorderColor: 'black',
      }],
      options: {
        legend: {
          boxWidth: 80,
          padding: 30
        },
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