function contents(type) {
  const start1 = document.querySelector('#start-timer');
  const start2 = document.querySelector('#start-stopwatch');
  if (type == 'timer') {
    start1.className = '';
    start2.classList = 'hidden';
    return `<div class="timer">
              <div class="outter-circle">
                <div class="inner-circle">
                  <span class="countdown" id="hour">00 :</span>
                  <span class="countdown" id="minute">&nbsp;00 :</span>
                  <span class="countdown" id="seconds">&nbsp;00</span>
                </div>
              </div>
            </div>`;
  } else if (type == 'stopwatch') {
    start1.className = 'hidden';
    start2.className = '';
    return `<div class="stopwatch">
              <img src="../assets/stopwatch.png" />
              <div class="inner">
              <span class="countdown" id="hour">00 :</span>
              <span class="countdown" id="minute">&nbsp;00 :</span>
              <span class="countdown" id="seconds">&nbsp;00</span>
              </div>
            </div>`;
  } else return `<span></span>`;
}
function extras(type) {
  if (type == 'timer') {
    document.querySelector('#input-time').classList.remove('hidden');
    return `<span id="extra-btn" class="button" value="3600">+1 hour</span>
            <span id="extra-btn" class="button" value="1800">+30 min</span>
            <span id="extra-btn" class="button" value="30">+30 sec</span>`;
  } else if (type == 'stopwatch') {
    document.querySelector('#input-time').classList.add('hidden');
    return `<span id="extra-btn" class="button">Lap</span>
            <span id="extra-btn" class="button green">Save</span>`;
  } else return `<span></span>`;
}
function results(type) {
  if (type == 'timer')
    return `<span>When the timer ends</span>
            <span class="extra_size">></span>`;
  else if (type == 'stopwatch')
    return `<ul class="laps">
                <li class="lap-item">
                    <span class="">Lap 01</span>
                    <span class="">00:00:00</span>
                </li>
            </ul>`;
  else return `<span></span>`;
}
function start_counting(time, countDown) {
  const hourElement = document.querySelector('#hour');
  const hourMinute = document.querySelector('#minute');
  const hourSecond = document.querySelector('#seconds');
  clearInterval(countDown);
  countDown = setInterval(() => {
    console.log(time % 60);
    // console.log((int) (time/60))
    // console.log(time / 3600);
    hourElement.innerHTML = time;
    time--;
    if (time <= -1) {
      clearInterval(countDown);
      hourElement.innerHTML = '00 :';
      hourMinute.innerHTML = '&nbsp;00 :';
      hourSecond.innerHTML = '&nbsp;00';
    }
  }, 1000);
}
