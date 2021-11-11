var SLIDER_TRANSITION_INTERVAL = 7000; // in milliseconds
var SLIDER_ARROW_DISTANCE_FROM_EDGE = 25;
var SLIDER_PROGRESSION_INTERVAL = 10;

var __SLIDER_FUNCTION__ = null;
var __SLIDER_PROGRESSION_FUNCTION__ = null;

var sliderTimer;
var sliderProgressionTimer;

function getDimensions(item) {
    var img = new Image();
    img.src = item.css('background-image').replace(/url\(|\)$|"/ig, '');
    return img.width + ' ' + img.height;
};

function removeSliderProgression() {
  $("div.promotion-tab-item-progression-indicator").remove();
}

function setProgressionIndicator() {

  if ( typeof progressionIndex == 'undefined' ) {
      progressionIndex = 0;
  } else {
    ++progressionIndex;
  }

  var newProgressionIndicatorWidth = (progressionIndex / (SLIDER_TRANSITION_INTERVAL / SLIDER_PROGRESSION_INTERVAL)) * 100;

  $("div.promotion-tab-item-progression-indicator").css({
    width: newProgressionIndicatorWidth + "%"
  });

  if (newProgressionIndicatorWidth >= 100) {
    progressionIndex = 0;
  }

}

function readjustSliderProgressionIndicator() {
  var progressionIndicatorDiv = $("div.promotion-tab-item-progression-indicator");
  var activeSlideTab = $("div#promotion-slider-tab-container > div.active");
  progressionIndicatorDiv.appendTo(activeSlideTab);
}

function setToSlide(type) {

  $activeTabIndex = getIndexOfActiveSlideTabItem();
  $activeSlideItemIndex = getIndexOfActiveSlideItem();

  $newActiveTabIndex = null;
  $newActiveSlideItemIndex = null;

  if (type == "previous") {
    $newActiveTabIndex = $activeTabIndex == 0 ?  getNumberOfSlideItems() - 1 : ($activeTabIndex-1);
    $newActiveSlideItemIndex = 0 ? getNumberOfSlideItems() - 1 : ($activeSlideItemIndex-1);
  } else if (type == "next") {
    $newActiveTabIndex = $activeTabIndex == getNumberOfSlideTabItems() - 1 ? 0 : ($activeTabIndex+1);
    $newActiveSlideItemIndex = $activeSlideItemIndex == getNumberOfSlideItems() - 1 ? 0 : ($activeSlideItemIndex+1);
  }

  // Set slide tab item active

  $currentActiveSlideTabItem = getSlideTabItem($activeTabIndex);
  $newActiveSlideTabItem = getSlideTabItem($newActiveTabIndex);

  $currentActiveSlideTabItem.removeClass("active");
  $newActiveSlideTabItem.addClass("active");

  // Set slide item active

  $currentActiveSlideItem = getSlideItem($activeSlideItemIndex);
  $newActiveSlideItem = getSlideItem($newActiveSlideItemIndex);

  $currentActiveSlideItem.removeClass("active");
  $newActiveSlideItem.addClass("active");

  setSliderItemSize();
  readjustSliderProgressionIndicator();

}

function setToNextSlide() {
  setToSlide("next");
}

function setToPreviousSlide() {
  setToSlide("previous");
}

function getSlideItem($index) {
    return $("div#promotion-slider > div.promotion-slider-item").eq($index);
}

function getNumberOfSlideItems() {
  return $("div#promotion-slider > div.promotion-slider-item").length;
}

function getIndexOfActiveSlideItem() {
  $activeSlideTab = $("div#promotion-slider > div.active");

  $index = $("div#promotion-slider > div.promotion-slider-item").index($activeSlideTab);

  return $index;
}

function getSlideTabItem($index) {
    return $("div#promotion-slider-tab-container > div").eq($index);
}

function getNumberOfSlideTabItems() {
  return $("div#promotion-slider-tab-container > div").length;
}

function getIndexOfActiveSlideTabItem() {
  $activeSlideTab = $("div#promotion-slider-tab-container > div.active");

  $index = $("div#promotion-slider-tab-container > div").index($activeSlideTab);

  return $index;
}

function setSliderItemSize() {

  $("div.promotion-slider-item").each(function(index) {
    // based it on ratio of image
    var imgDimensions = getDimensions($(this)).trim().split(" ");
    var bodyWidth = $('body').width();
    var newHeight = bodyWidth * imgDimensions[1] / imgDimensions[0] - 5;
    $(this).height(newHeight);
  });

}

function initSliderTabProgressionIndicator() {
  $("div#promotion-slider-tab-container div.promotion-tab-item").first().append("<div class='promotion-tab-item-progression-indicator'></div>");
}

function initSliderArrows() {

  $promotionSliderPosition = $("div#promotion-slider").position();
  $promotionSliderHeight = $("div#promotion-slider").height();
  $promotionArrowContainerHeight = $("div.promotion-slider-arrow").eq(0).height();

  $("div#promotion-slider-arrow-left").css({
    top: $promotionSliderPosition.top + $promotionSliderHeight / 2 - $promotionArrowContainerHeight / 2,
    left: SLIDER_ARROW_DISTANCE_FROM_EDGE, position: "absolute"});
  $("div#promotion-slider-arrow-right").css({
    top: $promotionSliderPosition.top + $promotionSliderHeight / 2 - $promotionArrowContainerHeight / 2,
    right: SLIDER_ARROW_DISTANCE_FROM_EDGE, position: "absolute"});

}

function initSliderTimer() {

  __SLIDER_FUNCTION__ = function(elapseTime) {
     setToNextSlide();
  };

  __SLIDER_PROGRESSION_FUNCTION__ = function(elapseTime) {
    setProgressionIndicator();
  };

  sliderTimer = BasicJSTimer.CreateTimer(SLIDER_TRANSITION_INTERVAL, undefined, __SLIDER_FUNCTION__);
  sliderTimer.Start();

  sliderProgressionTimer = BasicJSTimer.CreateTimer(SLIDER_PROGRESSION_INTERVAL, undefined, __SLIDER_PROGRESSION_FUNCTION__);
  sliderProgressionTimer.Start();

}

function setSliderJS() {

  initSliderTimer();
  initSliderArrows();
  initSliderTabProgressionIndicator();

  $("div.promotion-slider-item").each(function(index) {
    $data = $(this).data();
    $imgsrc = $data.imgsrc;
    $(this).css("background-image", "url('" + $imgsrc + "')");
  });

  $("div.promotion-tab-item").click(function(e){

    $index = $("div#promotion-slider-tab-container > div").index(this);

    $("div.promotion-slider-item").removeClass("active");
    $("div.promotion-slider-item").eq($index).addClass("active");

    $("div.promotion-tab-item").removeClass("active");
    $(this).addClass("active");

    setSliderItemSize();

    // Once slider tab is clicked slider tab progression is removed
    removeSliderProgression();

  });

  $("div#promotion-slider-arrow-left").click(function(e) {
      setToPreviousSlide();

      // Once slider arrow is clicked slider tab progression is removed
      removeSliderProgression();
      sliderTimer.Pause();
      sliderProgressionTimer.Pause();

  });

  $("div#promotion-slider-arrow-right").click(function(e) {
      setToNextSlide();

      // Once slider arrow is clicked slider tab progression is removed
      removeSliderProgression();

      sliderTimer.Pause();
      sliderProgressionTimer.Pause();

  });


  $(window).on("load", function(e) {
    setSliderItemSize();
  });

  $(window).resize(function() {
    setSliderItemSize();
  });

}

$(document).ready(function() {
  setSliderJS();
});
