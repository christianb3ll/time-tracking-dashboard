const rangeButtons = document.getElementsByClassName("date-range-button");
const dailyFields = document.getElementsByClassName("daily-data");
const weeklyFields = document.getElementsByClassName("weekly-data");
const monthlyFields = document.getElementsByClassName("monthly-data");

// Add event listeneres to the navigation buttons
for(let i = 0; i < rangeButtons.length; i++){
    rangeButtons[i].addEventListener("click", ButtonHandler);
}

// Handle button clicks on date range navigation and update visible data
function ButtonHandler(event) {
    // remove the active class from all buttons
    for(let i = 0; i < rangeButtons.length; i++){
        rangeButtons[i].classList.remove('active');
    }
    // add the active class to thge target button
    event.target.classList.add('active');

    let dataTarget = event.target.dataset.target;
    
    // Show and hide data
    if(dataTarget == "daily"){
        RevealData(dailyFields);
        HideData(weeklyFields);
        HideData(monthlyFields);
    }
    else if (dataTarget == "weekly"){
        RevealData(weeklyFields);
        HideData(dailyFields);
        HideData(monthlyFields);
    }
    else if (dataTarget == "monthly"){
        RevealData(monthlyFields);
        HideData(dailyFields);
        HideData(weeklyFields);
    } else  {
        console.log('Could not get data')
    }   
}

// Hide all filds for a given data target
function HideData(dataFields) {
    for(let i = 0; i < dataFields.length; i++){
        dataFields[i].classList.add("hidden");
    }
}

// Reveal all filds for a given data target
function RevealData(dataFields) {
    for(let i = 0; i < dataFields.length; i++){
        dataFields[i].classList.remove("hidden");
    }
}

// Fetch json data and populate the DOM
fetch('/data.json').then((response) => {  
    if(!response.ok) return console.log('Data not found');
    return response.json();
  }).then((data) => {
    PopulateData(data);
  }
);

// Populate the DOM with provided data
function PopulateData(data) {
    data.forEach(item => {
        // conform data title to match DOM elements
        let sectionTitle = String(item.title + "-data").toLowerCase().replace(' ', '-');

        let section = document.getElementById(sectionTitle);

        // Check the section exists in the DOM
        if(section != null) {

            let daily = item.timeframes.daily;
            let weekly = item.timeframes.weekly;
            let monthly = item.timeframes.monthly;

            let dailySection = section.querySelector('.daily-data');
            let weeklySection = section.querySelector('.weekly-data');
            let monthlySection = section.querySelector('.monthly-data');

            // Add daily data to the DOM
            dailySection.innerHTML = `
                <p class="current-time">${daily.current}hrs</p>
                <p class="previous-time">Yesterday - ${daily.previous}hrs</p>
                `
            // Add weekly data to the DOM
            weeklySection.innerHTML = `
                <p class="current-time">${weekly.current}hrs</p>
                <p class="previous-time">Last Week - ${weekly.previous}hrs</p>
                `
            // Add monthly data to the DOM
            monthlySection.innerHTML = `
                <p class="current-time">${monthly.current}hrs</p>
                <p class="previous-time">Last Month - ${monthly.previous}hrs</p>
            `
        } else {
            console.log("Could not find " + sectionTitle);
        }
        
    });
}