// import { results_1 } from "./utils";
class StopWatch {
  constructor() {
    this.isRunning = false;
    this.countUp = null;
    this.timer = 0;
  }
  intialize_events() {
    //listen for changes in start/stop
    document.querySelector('#start-stopwatch').addEventListener('click', () => {
      if (this.isRunning === false) {
        this.begin_counting();
      } else {
        this.isRunning = false;
        clearInterval(this.countUp);
      }
    });
    //listen for changes in lap/save
  }
  begin_counting() {
    // resume localstorage timer
    // this.restore_previous_save();
    this.isRunning = true;

    const hourElement = document.querySelector('#hour');
    const minuteElement = document.querySelector('#minute');
    const secondElement = document.querySelector('#seconds');
    this.countUp = setInterval(() => {
      this.timer++;
      localStorage.setItem('stopwatch', this.timer);
      let h = Math.floor(this.timer / 3600);
      if (h <= 9) hourElement.innerHTML = `0${h} :`;
      else hourElement.innerHTML = `${h} :`;
      let m = Math.floor((this.timer / 60) % 60);
      if (m <= 9) minuteElement.innerHTML = `&nbsp;0${m} :`;
      else minuteElement.innerHTML = `&nbsp;${m} :`;
      let s = Math.floor(this.timer % 60);
      if (s <= 9) secondElement.innerHTML = `&nbsp;0${s}`;
      else secondElement.innerHTML = `&nbsp;${s}`;

      console.log(this.timer);
    }, 1000);
  }
  restore_previous_save() {}
  clear_previous_save() {}
}

class TimerWatch {
  constructor() {
    this.countDown = null;
    this.timer = 0;
    this.isRunning = false;
    this.type = '';
    this.selected = 'selected';
    this.unselected = 'regular';
  }
  reset_buttons() {
    document.querySelectorAll('#section').forEach((item) => {
      item.classList.replace(this.selected, this.unselected);
    });
  }
  intialize_events() {
    // Listen for changes in the tabs
    document.querySelectorAll('#section').forEach((item) => {
      item.addEventListener('click', () => {
        this.reset_buttons();
        item.classList.replace(this.unselected, this.selected);
        this.type = item.innerHTML.toLowerCase();
        this.update_screen();
      });
    });

    // Listen for start/stop button clicks
    document.querySelector('#start-timer').addEventListener('click', () => {
      if (this.isRunning === false) {
        this.begin_counting();
      } else {
        this.isRunning = false;
        clearInterval(this.countDown);
      }
    });

    // Listen for extra buttons clicks
    document.querySelectorAll('#extra-btn').forEach((item) => {
      item.addEventListener('click', () => {
        // console.log(item.getAttribute('value'));
        if (this.isRunning === true) this.timer = parseInt(item.getAttribute('value')) + this.timer;
      });
    });
  }
  update_screen() {
    //Content
    const content = document.querySelector('#watch');
    content.innerHTML = contents(this.type);
    //Extra
    const extra = document.querySelector('#extra');
    extra.innerHTML = extras(this.type);
    extra.className = `extra_${this.type}`;
    // Results
    const result = document.querySelector('#results');
    result.innerHTML = results(this.type);
    result.className = `results_${this.type}`;
  }
  begin_counting() {
    try {
      this.isRunning = true;

      if (this.timer > 0) {
        const hourElement = document.querySelector('#hour');
        const minuteElement = document.querySelector('#minute');
        const secondElement = document.querySelector('#seconds');
        this.countDown = setInterval(() => {
          let h = Math.floor(this.timer / 3600);
          if (h <= 9) hourElement.innerHTML = `0${h} :`;
          else hourElement.innerHTML = `${h} :`;
          let m = Math.floor((this.timer / 60) % 60);
          if (m <= 9) minuteElement.innerHTML = `&nbsp;0${m} :`;
          else minuteElement.innerHTML = `&nbsp;${m} :`;
          let s = Math.floor(this.timer % 60);
          if (s <= 9) secondElement.innerHTML = `&nbsp;0${s}`;
          else secondElement.innerHTML = `&nbsp;${s}`;
          this.timer--;
          if (this.timer <= -1) {
            this.isRunning = false;
            clearInterval(this.countDown);
            this.timer = 0;
            hourElement.innerHTML = '00 :';
            minuteElement.innerHTML = '&nbsp;00 :';
            secondElement.innerHTML = '&nbsp;00';
          }
        }, 1000);
      } else {
        // We are not double checking for bad user input, parseInt just takes care of grabbing the first integer if finds....
        let time = parseInt(document.getElementById('input-time-time').value);
        if (!time) throw 'Input is not a valid number';
        const type = document.getElementById('input-time-type').value;
        if (type === 's') {
          this.timer = time;
        } else if (type === 'm') {
          this.timer = time * 60;
        } else if (type === 'h') {
          this.timer = time * 3600;
        } else throw 'Something went wrong with the application';

        //   this.timer = time;
        const hourElement = document.querySelector('#hour');
        const minuteElement = document.querySelector('#minute');
        const secondElement = document.querySelector('#seconds');
        this.countDown = setInterval(() => {
          let h = Math.floor(this.timer / 3600);
          if (h <= 9) hourElement.innerHTML = `0${h} :`;
          else hourElement.innerHTML = `${h} :`;
          let m = Math.floor((this.timer / 60) % 60);
          if (m <= 9) minuteElement.innerHTML = `&nbsp;0${m} :`;
          else minuteElement.innerHTML = `&nbsp;${m} :`;
          let s = Math.floor(this.timer % 60);
          if (s <= 9) secondElement.innerHTML = `&nbsp;0${s}`;
          else secondElement.innerHTML = `&nbsp;${s}`;
          this.timer--;
          if (this.timer <= -1) {
            this.isRunning = false;
            clearInterval(this.countDown);
            this.timer = 0;
            hourElement.innerHTML = '00 :';
            minuteElement.innerHTML = '&nbsp;00 :';
            secondElement.innerHTML = '&nbsp;00';
          }
        }, 1000);
      }
    } catch (error) {
      this.isRunning = false;
      this.throw_error_message(error);
    }
  }
  destroy_timer() {}
  throw_error_message(data) {
    alert(`Error: something is not rights.\nHint: ${data}`);
  }
}

function main() {
  // const sections = document.querySelectorAll("#section");
  // console.log(sections);
  const timer_watch = new TimerWatch();
  timer_watch.intialize_events();
  const stop_watch = new StopWatch();
  stop_watch.intialize_events();
}

main();
