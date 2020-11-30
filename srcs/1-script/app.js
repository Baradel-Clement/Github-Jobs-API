 // Dark mode start

let switcher = document.getElementById('switcher')
let darkMode = localStorage.getItem("darkMode");
localStorage.setItem('darkMode', 'dark-mode');

let trans = () => {
    document.documentElement.classList.add('transition')
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}

function disableDarkMode() {
    trans();
    document.documentElement.setAttribute('data-theme', 'light');
    switcher.classList.remove('active');
    localStorage.setItem('darkMode', null);
}

function enableDarkMode() {
    trans();
    document.documentElement.setAttribute('data-theme', 'dark');
    switcher.classList.add('active');
    localStorage.setItem('darkMode', 'enabled');
}

if (darkMode == "enabled") {
    enableDarkMode()
}

function togglingDarkMode() {
    darkMode = localStorage.getItem('darkMode');
    if (darkMode != "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
} 

// Dark mode end

// Adjust filter component with screen size

const searchBar = document.getElementById('search-bar');
const para = document.querySelector('.filter-fulltime > p');
const searchButton = document.querySelector('.search-button');
const filterLocation = document.querySelector('.filter-location')
const mobileSearchBtn = document.querySelector('.search-button-wrapper-mobile')
const filterFulltime = document.querySelector('.filter-fulltime')
const darkOverlay = document.querySelector('.dark-overlay');
const filterElement = document.querySelector('.filter');
const jobsContainer = document.getElementById('jobs');

if ((window.matchMedia("(max-width: 1100px)").matches)) {
        searchBar.placeholder = "Filter by title…";
}
if ((window.matchMedia("(max-width: 1100px)").matches) &&
(window.matchMedia("(min-width: 768px)").matches)) {
    para.innerHTML = 'Full Time';
}
if ((window.matchMedia("(max-width: 768px)").matches) &&
(window.matchMedia("(min-width: 1px)").matches)) {
    searchButton.innerHTML = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.112 15.059h-1.088l-.377-.377a8.814 8.814 0 002.15-5.784A8.898 8.898 0 008.898 0 8.898 8.898 0 000 8.898a8.898 8.898 0 008.898 8.899c2.211 0 4.23-.808 5.784-2.143l.377.377v1.081l6.845 6.832 2.04-2.04-6.832-6.845zm-8.214 0A6.16 6.16 0 118.9 2.737a6.16 6.16 0 010 12.322z" fill="#FFFFFF" fill-rule="nonzero"/></svg>'
}

// Adjust height of jobs container (card-display) 
console.log(jobsContainer.style.height)

function togglingFilterSearch() {
    filterLocation.classList.toggle('active');
    filterFulltime.classList.toggle('active');
    mobileSearchBtn.classList.toggle('active');
    darkOverlay.classList.toggle('active');
}

function displayJobs(jobs) {
    console.log(jobs)
}

function getInputValues() {
    const search = document.querySelector('#search-bar').value
    const location = document.querySelector('#search-location').value
    const fulltime = document.querySelector('#check').checked
    let inputObject = {
        search: search,
        location: location,
        fulltime: fulltime
    }
    getJobs(inputObject)
}

function getJobs(inputObject) {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = `https://jobs.github.com/positions.json?description=${inputObject.search}&location=${inputObject.location}&full_time=${inputObject.fulltime}`; // site that doesn’t send Access-Control-*
    fetch(proxyurl + url) 
    .then(response => response.text())
    .then(contents => displayJobs(JSON.parse(contents)))
    .catch(() => console.log("Can’t access " + url + " response. Blocked by browser?"))
}

function onClickJob(job) {
    const allJob = document.querySelectorAll('.job')
    if (!(job.classList.contains('job-detail-on'))) {
        allJob.forEach(element => element.classList.toggle('job-detail-out'))
        job.classList.toggle('job-detail-on');
        job.classList.remove('job-detail-out');
        filterElement.classList.toggle('job-detail-out');
        jobsContainer.classList.toggle('detail-display');
    }
}

function removeDetailDisplay() {
    const currentDetailJob = document.querySelector('.job.job-detail-on');
    const allJob = document.querySelectorAll('.job')
    allJob.forEach(element => element.classList.remove('job-detail-out'))
    currentDetailJob.classList.toggle('job-detail-on');
    filterElement.classList.remove('job-detail-out');
    jobsContainer.classList.remove('detail-display');
}