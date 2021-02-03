document.addEventListener('DOMContentLoaded', () => {
  // Time that the user will put in input fields
  const inputHours = document.getElementById('start-hours');
  const inputMinutes = document.getElementById('start-minutes');
  const inputSeconds = document.getElementById('start-seconds');

  inputHours.addEventListener('input', keydownHandler);
  inputMinutes.addEventListener('input', keydownHandler);
  inputSeconds.addEventListener('input', keydownHandler);
  // Time displayed on screen
  const outputHours = document.getElementById('hours');
  const outputMinutes = document.getElementById('minutes');
  const outputSeconds = document.getElementById('seconds');

  outputHours.innerHTML = '00';
  outputMinutes.innerHTML = '00';
  outputSeconds.innerHTML = '00';


  // Time will change as user types it into input fields
  function keydownHandler() {
    outputHours.innerHTML = formatTime(inputHours.value);
    outputMinutes.innerHTML = formatTime(inputMinutes.value);
    outputSeconds.innerHTML = formatTime(inputSeconds.value);
  }
  // Formats to keep a 0 in front of single digit
  function formatTime(num) {
    if (num <= 0) {
      return `00`;
    } else if (num < 10) {
      return `0${num}`;
    } else {
      return `${num}`;
    }
  }
  // Keeps user from typing into inputs after start btn is clicked
  function disableInputs() {
    inputHours.disabled = true;
    inputMinutes.disabled = true;
    inputSeconds.disabled = true;
  }
  // Hides start btn after start btn is clicked
  hideStartBtn = () => document.getElementById('start-btn').style.display = 'none';
  // Displays reset btn after start btn is clicked
  displayResetBtn = () => document.getElementById('reset-btn').style.display = 'block';
  // Background will change once time is up
  backgroundChange = () => document.body.style.background = 'linear-gradient(45deg, #ff4b2b, #ff416c)';
  // Start Button
  const startBtn = document.getElementById('start-btn').addEventListener('click', () => {
    setCountDownDate();
    timer();
    progressBar();
    hideStartBtn();
    displayResetBtn();
    disableInputs();
  });
  // Reset Button
  const resetBtn = document.getElementById('reset-btn').addEventListener('click', () => {
    history.go(0);
  });

  let countDownDate;
  // Takes inputs and adds them to current time to set the countdown time/date
  function setCountDownDate() {
    countDownDate = new Date(new Date().getTime() +
      (inputHours.value * 3600000) +
      (inputMinutes.value * 60000) +
      (inputSeconds.value * 1000));
  }
  // Displays time left every second until end
  function timer() {
    const countDown = setInterval(function () {

      const now = new Date().getTime();
      const timeLeft = countDownDate - now;

      const hoursLeft = formatTime(Math.floor((timeLeft / (1000 * 60 * 60)) % 60));
      const minutesLeft = formatTime(Math.floor((timeLeft / 1000 / 60) % 60));
      const secondsLeft = formatTime(Math.floor((timeLeft / 1000) % 60));

      outputHours.innerHTML = hoursLeft;
      outputMinutes.innerHTML = minutesLeft;
      outputSeconds.innerHTML = secondsLeft;

      const outputEnd = document.getElementById('end');
      const colonOne = document.getElementById('colon-one');
      const colonTwo = document.getElementById('colon-two');

      if (timeLeft <= 0) {
        clearInterval(countDown);
        outputHours.innerHTML = '';
        outputMinutes.innerHTML = '';
        outputSeconds.innerHTML = '';
        outputEnd.innerHTML = 'Time up, Lets begin!';
        colonOne.style.display = 'none';
        colonTwo.style.display = 'none';
        backgroundChange();

      }
    }, 10);
  }

  // Displays percentage of time elasped
  function progressBar() {
    let progressTime = (inputHours.value * 3600000) +
      (inputMinutes.value * 60000) +
      (inputSeconds.value * 1000);
    let i = 0;
    if (i === 0) {
      i = 1;
      const bar = document.getElementById('bar');
      let width = 1;
      let id = setInterval(frame, progressTime / 100); //this sort-of works
      function frame() {
        if (width >= 100) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          bar.style.width = width + '%';
          bar.innerHTML = width + '%';
        }
      }
    }
  }
});