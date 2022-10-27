

const schoolsWithWeather = [];
var schoolInfo;
var resultsInfo;

// obtain schools
const collegescorecard = (collegeName) =>{
    console.log(collegeName);
    // debugger;
    const scorecardAPI = "DoaHn0fsthkrMipg5cL4hkdLpAWcI407Je2idkJN";
    fetch("https://api.data.gov/ed/collegescorecard/v1/schools?school.name=" + collegeName + "&api_key=DoaHn0fsthkrMipg5cL4hkdLpAWcI407Je2idkJN")
    .then(res => res.json())
    .then(data => collegescorecardReturn(data))
}

const collegescorecardReturn = (data) => {
    console.log(data);
    // debugger;
    resultsInfo = data.results;
}
const collegeLoop = () => {
    for (let i = 0; i < resultsInfo.length; i++) {
        schoolInfo = resultsInfo[i].school;
        schoolsWithWeather[i] = schoolInfo;        
    }
}

// obtain weather
const callWeather = () => {
    for (let i = 0; i < schoolsWithWeather.length; i++) {
        console.log("callWeather" + i);
        // debugger;
        weather(schoolsWithWeather[i].city, i);        
    }
}

const weather = (city,i) => {
    console.log(city + "weather" + i);
    // debugger;
    const openweathermapKey = "99f3a7e5c08aca58214a5ff5a0495fd1";
     fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + openweathermapKey)
    .then(res => res.json())
    .then(data => weatherReturn(data,i));
}

const weatherReturn = (data,i) => {
    console.log(data + "weatherReturn" +i);  
    // debugger;
    var weather1 = data.list[4].main.temp;
    var weather2 = (weather1 -273.15) * 9/5 + 32;
    weather2 = Math.round(weather2);
    // pass weather into array
    const newSchool = {...schoolInfo , currentWeather : weather2};
    schoolsWithWeather[i] = newSchool;    
}

// print to screen
const creatCards = () => {
    for (let i = 0; i < schoolsWithWeather.length; i++) {
        console.log("createCards" + i);
        // debugger;
        var cardID = [];
        var cardBodyID = [];
        cardID[i] = "#card"+i; 
        cardBodyID[i] ="#card-body"+i;    
        cardID = "#card"+i; 
        cardBodyID[i] ="#card-body"+i;        
        $("#containerEL").append('<div class="card" id="card' + i + '"></div>');
        $(cardID[i]).append('<div class="card-body" id="card-body' + i + '"></div>');
        console.log(cardBodyID[i]);
        $(cardBodyID[i]).text("College name: " + schoolsWithWeather[i].name + ", City: " + schoolsWithWeather[i].city + ", School URL: " + schoolsWithWeather[i].school_url + ", Temperature(F): " +schoolsWithWeather[i].currentWeather);
        console.log(i);
    };
}

// button click
$("#saveBtn").on('click', function (event) {
    // debugger;
    event.preventDefault();
    $("#containerEL").empty();
    var collegeName = $("#collegeName").val();
    console.log(collegeName);
    collegescorecard(collegeName);
    collegeLoop();
    callWeather();
    creatCards();
})