// ---- HAMBURGER MENU ----
function toggleMenu() {
  var menu = document.querySelector('.nav-links');
  menu.classList.toggle('active');
}

// ---- ACCORDION ----
var buttons = document.querySelectorAll('.accordion-btn');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', function() {
    var content = this.nextElementSibling;
    content.classList.toggle('active');
  });
}

// ---- IMAGE SLIDER ----
var currentSlide = 0;
var slides = document.querySelectorAll('.slide');
var dots = document.querySelectorAll('.dot');

function showSlide(index) {
  for (var i = 0; i < slides.length; i++) {
    slides[i].classList.remove('active');
  }
  for (var i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  if (slides.length > 0) {
    slides[index].classList.add('active');
  }
  if (dots.length > 0) {
    dots[index].classList.add('active');
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

// ---- FORM VALIDATION ----
function validateForm(event) {
  event.preventDefault();
  var isValid = true;

  // Clear old errors
  var errors = document.querySelectorAll('.error');
  for (var i = 0; i < errors.length; i++) {
    errors[i].textContent = '';
  }

  // Check name
  var name = document.getElementById('name');
  if (name && name.value.trim() === '') {
    document.getElementById('nameError').textContent = 'Name is required';
    isValid = false;
  }

  // Check email
  var email = document.getElementById('email');
  if (email) {
    var pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(email.value)) {
      document.getElementById('emailError').textContent = 'Enter a valid email';
      isValid = false;
    }
  }

  // Check subject
  var subject = document.getElementById('subject');
  if (subject && subject.value === '') {
    document.getElementById('subjectError').textContent = 'Pick a subject';
    isValid = false;
  }

  // Check message
  var message = document.getElementById('message');
  if (message && message.value.trim().length < 20) {
    document.getElementById('messageError').textContent = 'Message must be at least 20 characters';
    isValid = false;
  }

  // Show success
  if (isValid) {
    document.getElementById('successMessage').style.display = 'block';
    document.getElementById('contactForm').reset();
  }
}

// ---- WEATHER API ----
var apiKey = '94eeaed729c50a7434b38fde21f2dcce';
var airports = [
  { name: 'London Heathrow', lat: 51.47, lon: -0.46 },
  { name: 'JFK New York', lat: 40.64, lon: -73.78 },
  { name: 'Dubai International', lat: 25.25, lon: 55.36 }
];

var apiDiv = document.getElementById('api-data');
if (apiDiv) {
  apiDiv.innerHTML = '';
  for (var i = 0; i < airports.length; i++) {
    fetchWeather(airports[i]);
  }
}

function fetchWeather(airport) {
  var url = 'https://api.openweathermap.org/data/2.5/weather'
    + '?lat=' + airport.lat
    + '&lon=' + airport.lon
    + '&appid=' + apiKey
    + '&units=metric';

  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var card = document.createElement('div');
      card.className = 'weather-card';
      card.innerHTML = '<h3>' + airport.name + '</h3>'
        + '<p>Temperature: ' + data.main.temp + ' C</p>'
        + '<p>Weather: ' + data.weather[0].main + '</p>'
        + '<p>Wind: ' + data.wind.speed + ' m/s</p>';
      document.getElementById('api-data').appendChild(card);
    })
    .catch(function(error) {
      console.log('API error: ' + error);
    });
}
