import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startButton = document.querySelector('[data-start]');
const dateTimePicker = document.getElementById('datetime-picker');
const daysDisplay = document.querySelector('[data-days]');
const hoursDisplay = document.querySelector('[data-hours]');
const minutesDisplay = document.querySelector('[data-minutes]');
const secondsDisplay = document.querySelector('[data-seconds]');

let countdownInterval;
let selectedDate;

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const now = new Date();
    selectedDate = selectedDates[0];
    
    if (selectedDate <= now) {
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

function startCountdown() {
  startButton.disabled = true;

  countdownInterval = setInterval(() => {
    const currentTime = new Date();
    const timeDifference = selectedDate - currentTime;

    if (timeDifference <= 0) {
      clearInterval(countdownInterval);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    const timeRemaining = convertMs(timeDifference);
    updateTimerDisplay(timeRemaining);
  }, 1000);
}

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysDisplay.textContent = addLeadingZero(days);
  hoursDisplay.textContent = addLeadingZero(hours);
  minutesDisplay.textContent = addLeadingZero(minutes);
  secondsDisplay.textContent = addLeadingZero(seconds);
}

startButton.addEventListener('click', startCountdown);

startButton.disabled = true;
