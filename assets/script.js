var collegeName;
var saveBtn = $("#saveBtn");
const openweathermapKey = "99f3a7e5c08aca58214a5ff5a0495fd1";
const scorecardAPI = "DoaHn0fsthkrMipg5cL4hkdLpAWcI407Je2idkJN";
var schoolInfo;
var resultsInfo
var weather1;
var weather2;
var city;
var cardID = [];
var cardBodyID =[];


saveBtn.on('click', function (event) {
    // debugger;
    event.preventDefault();
    for (let i = 0; i < cardID.length; i++) {
        $(cardID[i]).remove();        
    }
 collegeName = $("#collegeName").val();
 collegescorecard();
})

// fetch("http://universities.hipolabs.com/search?country=United%20States&name=" + collegeName)
// .then(res => res.json())
// .then(data => console.log(data));\

const collegescorecard = () =>{
    fetch("https://api.data.gov/ed/collegescorecard/v1/schools?school.name=" + collegeName + "&api_key=DoaHn0fsthkrMipg5cL4hkdLpAWcI407Je2idkJN")
    .then(res => res.json())
    .then(data => collegescorecardReturn(data))

    // creates a function that loops for each result obtained from the search. 
    const collegescorecardReturn = (data) => {
        resultsInfo = data.results;
        for (let i = 0; i < resultsInfo.length; i++) {
            schoolInfo = resultsInfo[i].school;
            city = schoolInfo.city;
            cardID[i] = "#card"+i; 
            cardBodyID[i] ="#card-body"+i;          
            createSchoolCard(i);
        }
    }
}
const createSchoolCard = (i) => {
    console.log(schoolInfo);
    // use js to create a card element with bootstrap 5.2 classes that will display the school name, the price calculator URL, the city it is in, and the state
    weather(); 
    $("#containerEL").append('<div class="card" id="card' + i + '"></div>');
    // console.log(cardID[i]);
    // console.log(schoolInfo.name);
    $(cardID[i]).append('<div class="card-body" id="card-body' + i + '"></div>');
    console.log(cardBodyID[i]);
    $(cardBodyID[i]).text("College name: " + schoolInfo.name + ", City: " + schoolInfo.city + ", School URL: " + schoolInfo.school_url + ", Temperature(F): " +weather2);
}


const weather = () => {
fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + openweathermapKey)
.then(res => res.json())
.then(data => weatherReturn(data));
}
const weatherReturn = (data) => {  
    console.log(data.list[4]);  
    weather1 = data.list[4].main.temp;
    console.log(weather1);
    weather2 = (weather1 -273.15) * 9/5 + 32;
    weather2 = Math.round(weather2);
    console.log(weather2);
}