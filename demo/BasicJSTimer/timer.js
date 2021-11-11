

// JavaScript header inclusion guard
if (typeof __TIMER__INCLUDE__ === "undefined") {
  __TIMER__INCLUDE__ = "__TIMER__INCLUDE__";

  var BasicJSTimer = {
    CreateTimer: undefined
  };

  var timerList = [];
  const INACTIVE_RESUME_TIMEOUT = 1000;
  const BASE_TIMEOUT_MS = 10;
  const INFINITE_NUMBER_ID = -99;
  var __BASE_TIMEOUT_REFERENCE__;
  var elapseTime = 0;
  var baseExpected = 0;

  var __BASE_TIMEOUT_CALLBACK__ = function() {

    var nowInMillisecondsSinceEpoch = Date.now();
    var dt = nowInMillisecondsSinceEpoch - baseExpected;
    baseExpected = nowInMillisecondsSinceEpoch + BASE_TIMEOUT_MS;

    elapseTime += BASE_TIMEOUT_MS;

    setTimeout(__BASE_TIMEOUT_CALLBACK__, BASE_TIMEOUT_MS - dt);
  };

  function pauseTimers() {
    for (let i = 0; i < timerList.size; ++i) {
      timeList[i].Pause();
    }
  }

  function resumeTimers() {
    for (let i = 0; i < timerList.size; ++i) {
      timeList[i].Resume();
    }
  }

  function startBaseTimer() {
    baseExpected = Date.now() + BASE_TIMEOUT_MS;
    __BASE_TIMEOUT_REFERENCE__ = setTimeout(__BASE_TIMEOUT_CALLBACK__, BASE_TIMEOUT_MS);
  }

  startBaseTimer();



  function __KEEP_TIMER_SYNCED_WHEN_WINDOW_TAB_BECOMES_INACTIVE__() {

    // Set the name of the hidden property and the change event for visibility
    var hidden, visibilityChange;
    if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
      hidden = "hidden";
      visibilityChange = "visibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      hidden = "msHidden";
      visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      hidden = "webkitHidden";
      visibilityChange = "webkitvisibilitychange";
    }

    // If the page is hidden, pause the Timer;
    // if the page is shown, resume the Timer
    function handleVisibilityChange() {
      if (document[hidden]) {
        pauseTimers();
      } else {
        resumeTimers();
      }
    }

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    if (typeof document.addEventListener === "undefined" || hidden === undefined) {

    } else {
      // Handle page visibility change
      document.addEventListener(visibilityChange, handleVisibilityChange, false);
    }

  }
  __KEEP_TIMER_SYNCED_WHEN_WINDOW_TAB_BECOMES_INACTIVE__();

  BasicJSTimer.CreateTimer = function(interval, startCallback, intervalCallback, numberOfIntervals) {

    // Precondition:
    // 1. Make sure callbacks are functions if not a function
    // 2. Make interval callback same as start callback if only one callback passed - intervalCallback is not a function.
    //    This makes it simple for caller, only one callback needed to be passed as argument
    if (typeof intervalCallback !== 'function' && typeof startCallback === 'function') {
      intervalCallback = startCallback;
    }

    if (!Number.isInteger(numberOfIntervals)) {
        numberOfIntervals = INFINITE_NUMBER_ID; // infinite
    }

    var TimerObject = {};

    const MS_PER_SEC = 1000;

    var __TIMER_INTERVAL_REFERENCE__ = undefined;
    var pause = false;
    var started = false;

    var startCallbackArr = [];
    var intervalCallbackArr = [];
    var stopCallbackArr = [];

    var expected = 0;
    var timerElapseTime = 0;
    var dtInterval = 0;
    var intervalCount = 0;

    var __TIMER_INTERVAL_CALLBACK_FUNC__ = function() {

      // Precondition
      // do not continue if paused
      if (pause) return;

      if (elapseTime >= expected) {

        ++intervalCount;

        var elapseTimeToSendToCallback = timerElapseTime / MS_PER_SEC;

        intervalCallbackArr.forEach((callbackItem) => {
          setTimeout(function() {
            callbackItem(elapseTimeToSendToCallback, intervalCount);
          }, 0);
        });

        timerElapseTime += interval;
        expected += interval;

        if (numberOfIntervals != INFINITE_NUMBER_ID && intervalCount == numberOfIntervals) {
          TimerObject.Stop();
        }

      }

    };

    TimerObject.Start = function() {

      // Precondition
      // Do not start again if already started
      if (started) return;

      started = true;

      startCallbackArr.forEach((callbackItem) => {
        setTimeout(function() {
          callbackItem(0, 0);
        }, 0);
      });

      expected = elapseTime + interval;
      timerElapseTime = interval;
      __TIMER_INTERVAL_REFERENCE__ = setInterval(__TIMER_INTERVAL_CALLBACK_FUNC__, BASE_TIMEOUT_MS);

    };

    TimerObject.Stop = function() {

      started = false;
      expected = 0;
      pause = false;
      timerElapseTime = 0;
      intervalCount = 0;
      clearInterval(__TIMER_INTERVAL_REFERENCE__);

      stopCallbackArr.forEach((callbackItem) => {
        setTimeout(function() {
          callbackItem(elapseTime);
        }, 0);
      });

    };

    TimerObject.Restart = function() {

      // Precondition
      // Must be started to restart
      if (!started) return;

      TimerObject.Stop();
      TimerObject.Start();

    };

    TimerObject.Pause = function() {

        // Precondition
        // Must be started to pause
        // Must be not pause to pause
        if (!started || pause) return;

        dtInterval = expected - elapseTime;

        pause = true;

    };

    TimerObject.Resume = function() {

      // Precondition
      // Must be started to resume
      // Must must be paused
      if (!started || !pause) return;

      expected = elapseTime + dtInterval;
      pause = false;

    };

    TimerObject.isPaused = function() {
      return pause;
    };

    TimerObject.registerStartCallback = function(func) {

      // Precondition:
      // make sure func is actually a function
      if (typeof func !== "function") return;

      startCallbackArr.push(func);

    };

    TimerObject.registerStopCallback = function(func) {

      // Precondition:
      // make sure func is actually a function
      if (typeof func !== "function") return;

      stopCallbackArr.push(func);

    };

    TimerObject.registerIntervalCallback = function(func) {

      // Precondition:
      // make sure func is actually a function
      if (typeof func !== "function") return;

      intervalCallbackArr.push(func);
    };

    TimerObject.unregisterStartCallback = function(func) {
      startCallbackArr = startCallbackArr.filter(item => item !== func);
    };

    TimerObject.unregisterIntervalCallback = function(func) {
      intervalCallbackArr = intervalCallbackArr.filter(item => item !== func);
    };

    TimerObject.registerStartCallback(startCallback);
    TimerObject.registerIntervalCallback(intervalCallback);

    timerList.push(TimerObject);

    return TimerObject;

  }

}
