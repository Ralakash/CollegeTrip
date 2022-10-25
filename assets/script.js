var collegeName = "Kalamazoo";
var saveBtn = $("#saveBtn");
var openweathermapKey = "99f3a7e5c08aca58214a5ff5a0495fd1";
const scorecardAPI = "DoaHn0fsthkrMipg5cL4hkdLpAWcI407Je2idkJN";
var schoolinfo;
var weather1;
var city = "kalamazoo";

saveBtn.on('click', function (event) {
    // debugger;
    event.preventDefault();

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

    const collegescorecardReturn = (data) => {
        var dataResults = data.results;
        console.log(dataResults);
        for (let i = 0; i < dataResults.length; i++) {
            console.log(data.results[i].school.city);
            city = dataResults[i].school.city;
            weather();
            
        }
    }

}

const createSchoolCard = (i) => {
    $("#container").append('<div class="card" style="width: 18rem;" id="card'+i+'"></div>');
    $("#container").append('')
    $("#container").append('')
    $("#container").append('')
    $("#container").append('')

}


const weather = () => {
fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + openweathermapKey)
.then(res => res.json())
.then(data => {
    const {list} = data;
    weather1 = list[4];
    
    return console.log(weather1);
});
}