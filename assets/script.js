var savedColleges = [];
// Grabs the information from the form collegeName and uses it to run the function CollegeScoreCard. Awaits that data then runs schoolCard using a subset of that information
$('#saveBtn').on('click', async function (event) {
  event.preventDefault();
  for (let i = 0; i < cardID.length; i++) {
    $(cardID[i]).remove();
    $(buttonID[i]).remove();
  }
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
let cardID = [];
let cardBodyID = [];
let buttonID = [];
const schoolCard = async (resultsInfo) => {
  for (let i = 0; i < resultsInfo.length; i++) {
    let schoolInfo = resultsInfo[i].school;
    let city = schoolInfo.city;
    if (!schoolInfo.school_url.startsWith('https://') && schoolInfo.school_url != '') {
      schoolInfo.school_url = 'https://' + schoolInfo.school_url;
    }
    cardID[i] = '#card' + i;
    cardBodyID[i] = '#card-body' + i;
    buttonID[i] = '#saveButton' + i;
    weather(city).then((weatherData) => {
      let weather1;
      weather1 = weatherData.list[4].main.temp;
      // SAM 2: you can also edit these classes on line 41 and 42 to edit to get the buttons in line.
      // changed style="margin : 0.5rem 0rem;" to mt-2 to follow bootstrap formatting - Sam
      $('#containerEL').append(
        '<div class="card col-8 row container-fluid d-flex flex-row mt-2" id="card' + i + '"></div>'
      );
      $(cardID[i]).append('<div class="card-body col-8 container-fluid" id="card-body' + i + '"></div>');
      $(cardBodyID[i]).html(
        'College name: ' +
          schoolInfo.name +
          '&emsp;  &emsp;  City: ' +
          schoolInfo.city +
          '<br/> School URL: <a href="' +
          schoolInfo.school_url +
          '"target="_blank">' +
          schoolInfo.school_url +
          '</a> &emsp;  &emsp;  Temperature(F): ' +
          weather1 +
          '°'
      );
      console.log(schoolInfo.school_url);
      // creates a button element that is used to save data to local storage.
      let button = $('<button type="button" class="btn btn-secondary col-2 my-2" id=saveButton' + i + '>Save</button>');
      $(cardID[i]).append(button);
      let schoolObject = {
        name: schoolInfo.name,
        city: schoolInfo.city,
        url: schoolInfo.school_url,
        temp: weather1,
      };
      // creates a sidebar that lists saved colleges, on a click function.
      $(button).click(function (event) {
        savedColleges.push(schoolObject);
        writeToSave();
        savedColleges = [];
      });
    });
  }
};

const writeToSave = () => {
  if (JSON.parse(localStorage.getItem('colleges')) != null) {
    savedColleges = savedColleges.concat(JSON.parse(localStorage.getItem('colleges')));
  }
  // searches the local storage for repeat elements and removes them to avoid duplicates.
  savedColleges = savedColleges.reduce((finalArray, current) => {
    let obj = finalArray.find((item) => item.name === current.name);
    if (obj) {
      return finalArray;
    } else {
      return finalArray.concat([current]);
    }
  }, []);
  localStorage.setItem('colleges', JSON.stringify(savedColleges));
  $('#sideBar').empty();
  for (let i = 0; i < savedColleges.length; i++) {
    let savedBodyID = [];
    let savedID = [];
    savedID[i] = '#saved' + i;
    savedBodyID[i] = '#saved-body' + i;
    // SAM or ERIC: Please work on using the classes and bootstrap 5 to get the cards here to look better. I will rearrange what data is being fed into them later
    //              so just focus on ensuring whatever data inside of them is able to be seen appropriately.
    $('#sideBar').append('<div class="card col-9 row mb-2"  id="saved' + i + '"></div>');
    let closeBtn = $(
      '<button type="button" class="btn btn-outline-danger btn-sm col-2 align-self-end" id="close' + i + '">X</button>'
    );
    $(closeBtn).click(function (event) {
      savedColleges = savedColleges.concat(JSON.parse(localStorage.getItem('colleges')));
      savedColleges.splice(i, 1);
      localStorage.setItem('colleges', JSON.stringify(savedColleges));
      writeToSave();
    });
    $(savedID[i]).append(closeBtn);
    $(savedID[i]).append('<div class="card-body col-10" id="saved-body' + i + '"></div>');
    $(savedBodyID[i]).html(
      '<a href="' +
        savedColleges[i].url +
        '" target="_blank">' +
        savedColleges[i].name +
        '</a><br/> ' +
        savedColleges[i].temp +
        '°'
    );
    console.log(savedColleges[i]);
  }
  savedColleges = [];
};
writeToSave();
