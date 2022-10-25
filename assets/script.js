var collegeName = "Kalamazoo";
var saveBtn = $("#saveBtn");
var openweathermapKey = "99f3a7e5c08aca58214a5ff5a0495fd1";
const scorecardAPI = "DoaHn0fsthkrMipg5cL4hkdLpAWcI407Je2idkJN";

saveBtn.on('click', function () {
 collegeName = $(" collegeName").val();
})

// fetch("http://universities.hipolabs.com/search?country=United%20States&name=" + collegeName)
// .then(res => res.json())
// .then(data => console.log(data));

fetch("https://api.data.gov/ed/collegescorecard/v1/schools?school.name=" + collegeName + "&api_key=DoaHn0fsthkrMipg5cL4hkdLpAWcI407Je2idkJN")
.then(res => res.json())
.then(data => console.log(data));

fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + collegeName + "&appid=" + openweathermapKey)
.then(res => res.json())
.then(data => console.log(data));