var savedColleges = [];
// Grabs the information from the form collegeName and uses it to run the function CollegeScoreCard. Awaits that data then runs schoolCard using a subset of that information
$('#saveBtn').on('click', async function (event) {
  event.preventDefault();
  $('#containerEL').empty;
  let collegeName = $('#collegeName').val();
  const dataInfo = await collegeScoreCard(collegeName);
  schoolCard(dataInfo.results);
});

// Fetches the college information based on the collegeName given above. returns the fetch.
const collegeScoreCard = (collegeName) => {
  return fetch(
    'https://api.data.gov/ed/collegescorecard/v1/schools?school.name=' +
      collegeName +
      '&api_key=DoaHn0fsthkrMipg5cL4hkdLpAWcI407Je2idkJN'
  ).then((res) => res.json());
};

// Fetches the weather based on the city name generated in schoolCard.
const weather = (city) => {
  const openweathermapKey = '99f3a7e5c08aca58214a5ff5a0495fd1';
  return fetch(
    'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + openweathermapKey + '&units=imperial'
  ).then((res) => res.json());
};

// Creates a card element with school and weather data after retrieving information from weather.
const schoolCard = async (resultsInfo) => {
  for (let i = 0; i < resultsInfo.length; i++) {
    let schoolInfo = resultsInfo[i].school;
    let city = schoolInfo.city;
    let cardID = [];
    let cardBodyID = [];
    cardID[i] = '#card' + i;
    cardBodyID[i] = '#card-body' + i;
    weather(city).then((weatherData) => {
      let weather1;
      weather1 = weatherData.list[4].main.temp;
      // SAM 2: you can also edit these classes on line 41 and 42 to edit to get the buttons in line.
      $('#containerEL').append('<div class="card col-9" id="card' + i + '"></div>');
      $(cardID[i]).append('<div class="card-body" id="card-body' + i + '"></div>');
      $(cardBodyID[i]).text(
        'College name: ' +
          schoolInfo.name +
          ', City: ' +
          schoolInfo.city +
          ', School URL: ' +
          schoolInfo.school_url +
          ', Temperature(F): ' +
          weather1
      );
      // creates a button element that is used to save data to local storage.
      // SAM 1: please figure out how to get this element in line with the card element you can edit the classes inside of line 54 using bootstrap and CSS to do so.
      let button = $('<button type="button" class="btn btn-info col-2" id=saveButton' + i + '>Save</button>');
      $('#containerEL').append(button);

      // creates a sidebar that lists saved colleges.
      // SHAWN: Will turn this into a seperate function.
      $(button).click(function (event) {
        let info = $(cardBodyID[i]).text();
        savedColleges.push(info);
        if (JSON.parse(localStorage.getItem('colleges')) != null) {
          savedColleges = savedColleges.concat(JSON.parse(localStorage.getItem('colleges')));
        }
        localStorage.setItem('colleges', JSON.stringify(savedColleges));
        console.log(savedColleges);
        $('#sideBar').empty();
        for (let i = 0; i < savedColleges.length; i++) {
          let savedBodyID = [];
          let savedID = [];
          savedID[i] = '#saved' + i;
          savedBodyID[i] = '#saved-body' + i;
          // SAM or ERIC: Please work on using the classes and bootstrap 5 to get the cards here to look better. I will rearrange what data is being fed into them later
          //              so just focus on ensuring whatever data inside of them is able to be seen appropriately.
          $('#sideBar').append('<div class="card col-9" id="saved' + i + '"></div>');
          $(savedID[i]).append('<div class="card-body" id="saved-body' + i + '"></div>');
          $(savedBodyID[i]).text(savedColleges[i]);
        }
        savedColleges = [];
      });
    });
  }
};
