// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    startBtn: document.querySelector('button[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.setAttribute("disabled", true);

let selectedDate = null;
const currentDate = Date.now();
const fp = flatpickr("#datetime-picker", options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(`Выбранная дата: ${selectedDates[0]}`);
        
        if (selectedDates[0] > currentDate) {
            refs.startBtn.removeAttribute("disabled");
            selectedDate = selectedDates[0];
            return selectedDate;
        } else {
            refs.startBtn.setAttribute("disabled", true);
            window.alert("Please choose a date in the future");
        }
    }
});

class Timer {
    constructor({onTick, selectedDate}) {
        this.intervalId = null;
        this.isActive = false;
        this.onTick = onTick;
        this.selectedDate = selectedDate;
    }

    start() {
        if (this.isActive) {
            return;
        }

        const deadLine = new Date(selectedDate);
        this.isActive = true;

        this.intervalId = setInterval(() => {
            const currentTime = Date.now();
            const ms = deadLine - currentTime;

            if (ms <= 1000) {
                this.stop();
            }

            const time = this.convertMs(ms);
            
            this.onTick(time);
        }, 1000);
    };

    stop() {
            clearInterval(this.intervalId);
            this.isActive = false;
            const time = this.convertMs(0);
            this.onTick(time);
    };

    //Принимает время в милисекундах,
    //высчитывает сколько в них вмещается дней/часов/минут/секунд,
    //возвращает объект со свойствами days, hours, minutes, seconds
    convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = this.addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
    };

    //Принимает число, приводит к строке и добавляет в начало 0, если число меньше 2-х знаков
    addLeadingZero(value) {
        return String(value).padStart(2, '0');
    };
};

const timer = new Timer({
    onTick: updateClockface
});

refs.startBtn.addEventListener('click', timer.start.bind(timer));
timer.stop.bind(timer);

//Принимает декструктизированное время, рисует интерфейс
function updateClockface({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
}








