
$("#saveBtn").on('click', async function (event) {
    event.preventDefault();
    $("#containerEL").empty;
    let collegeName = $("#collegeName").val();
    const dataInfo = await collegeScoreCard(collegeName);
    schoolCard(dataInfo.results);

})

const collegeScoreCard = (collegeName) =>{
    return fetch("https://api.data.gov/ed/collegescorecard/v1/schools?school.name=" + collegeName + "&api_key=DoaHn0fsthkrMipg5cL4hkdLpAWcI407Je2idkJN")
    .then(res => res.json())    
}

const weather = (city) => {
    const openweathermapKey = "99f3a7e5c08aca58214a5ff5a0495fd1";
    return fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + openweathermapKey +"&units=imperial")
    .then(res => res.json())
}


const schoolCard = async (resultsInfo) => {
    for (let i = 0; i < resultsInfo.length; i++) {
        let schoolInfo = resultsInfo[i].school;
        let city = schoolInfo.city;
        let cardID = [];
        let cardBodyID =[];
        cardID[i] = "#card"+i; 
        cardBodyID[i] ="#card-body"+i;        
        weather(city)
            .then(weatherData => {
                let weather1;
                weather1 = weatherData.list[4].main.temp;
                $("#containerEL").append('<div class="card" id="card' + i + '"></div>');
                $(cardID[i]).append('<div class="card-body" id="card-body' + i + '"></div>');
                $(cardBodyID[i]).text("College name: " + schoolInfo.name + ", City: " + schoolInfo.city + ", School URL: " + schoolInfo.school_url + ", Temperature(F): " +weather1);
            });
    }
}