var CreateTimer = function(interval, startCallback, intervalCallback) {

  // Precondition:

  // make sure callbacks are undefined if not a function
  if (typeof startCallback !== 'function') startCallback = undefined;
  if (typeof intervalCallback !== 'function') intervalCallback = undefined;

  const BASE_TIMER_INTERVAL_MS = 10;
  const MS_PER_SEC = 1000;

  var TimerObject = {};
  var timerTicker = 0;
  var __TIMER_INTERVAL_REFERENCE__ = null;
  var pause = false;
  var elapseTime = 0;

  var __TIMER_INTERVAL_CALLBACK_FUNC__ = setInterval(function() {

    if (pause) return;

    if (timerTicker == interval) {
        elapseTime += interval / MS_PER_SEC;

        if (typeof intervalCallback === 'function' ) {
            intervalCallback(elapseTime);
        }

        timerTicker = 0;
    } else {
      timerTicker += BASE_TIMER_INTERVAL_MS;
    }

  }, BASE_TIMER_INTERVAL_MS);

  TimerObject.Start = function() {

    if (typeof startCallback === 'function' ) {
        startCallback(elapseTime);
    }

    __TIMER_INTERVAL_REFERENCE__ = setInterval(__TIMER_INTERVAL_CALLBACK_FUNC__, BASE_TIMER_INTERVAL_MS);
  };

  TimerObject.Restart = function() {
    timerTicker = 0;
    clearInterval(__TIMER_INTERVAL_REFERENCE__);
    __TIMER_INTERVAL_REFERENCE__ = setInterval(__TIMER_INTERVAL_CALLBACK_FUNC__, BASE_TIMER_INTERVAL_MS);
  };

  TimerObject.Pause = function() {
      pause = true;
  };

  TimerObject.Resume = function() {
      pause = false;
  };

  TimerObject.End = function() {
    clearInterval(__TIMER_INTERVAL_REFERENCE__);
  };

  TimerObject.isPaused = function() {
    return pause;
  };

  TimerObject.registerStartCallback = function(func) {
    startCallback = func;
  };

  TimerObject.registerIntervalCallback = function(func) {
    intervalCallback = func;
  };

  return TimerObject;

}
