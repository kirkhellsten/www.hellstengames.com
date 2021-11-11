
function isMobileNavClosed() {
  return !$("nav#mobile-nav").hasClass("active");
}

function closeMobileNav() {
  $("nav#mobile-nav").toggleClass("active");
  $("nav#mobile-nav").removeClass("flyin");
  $("nav#mobile-nav").removeClass("flyout");
  $("nav#mobile-nav").addClass("flyout");
  toggleOverlay();
  var htmlOverflowCSS = $("html").css("overflow");
  $("html").css("overflow", htmlOverflowCSS == "visible" ? "hidden" : "visible");

  closeAllSubMenus();
}

function openMobileNav() {
  $("nav#mobile-nav").toggleClass("active");
  $("nav#mobile-nav").removeClass("flyin");
  $("nav#mobile-nav").removeClass("flyout");
  $("nav#mobile-nav").addClass("flyin");
  toggleOverlay();
  var htmlOverflowCSS = $("html").css("overflow");
  $("html").css("overflow", htmlOverflowCSS == "visible" ? "hidden" : "visible");

  $("nav#mobile-nav").css("height", $(window).height() + "px");
}

function toggleMobileNavSubMenu(subMenuUL) {
  subMenuUL.parent().toggleClass("active");
  subMenuUL.parent().find(".arrow").toggleClass("down");
  subMenuUL.parent().find(".arrow").toggleClass("up");
  animateMobileNavSubMenuHeight(subMenuUL);
}

function registerClickOffEvent(element, callback) {

  var clicked = false;

  $(window).click(callback);

  element.on("click", function(event) {
    event.stopPropagation();
    clicked = true;
  });

}

function setOverlay() {
  $("body").append('<div class="overlay-background"></div>');
}

function toggleOverlay() {
  $('div.overlay-background').toggleClass('active');
  $('div.overlay-background').height($('html').height());
}

function closeAllSubMenus() {
  $("li.mobile-nav-primary-btn.active i").removeClass("up");
  $("li.mobile-nav-primary-btn.active i").addClass("down");
  $("li.mobile-nav-primary-btn.active").removeClass("active");
  $("li.mobile-nav-primary-btn > ul").css("height", "0px");
  $("li.mobile-nav-primary-btn > ul").css("visibility", "hidden");
}


function animateMobileNavSubMenuHeight(element) {

  if (element.height() == 0) {

    element.css("visibility", "visible");

    element.css("height", "auto");
    var autoHeight = element.height();
    element.css("height", "0px");

    element.animate({
      height: autoHeight,
    }, 75, function() {

    });

  } else {
    element.animate({
      height: 0
    }, 75, function() {
      element.css("visibility", "hidden");
    });
  }


}

function animateGamesHeadMenu() {

  var gamesListItems = $("li.header-menu-in-development");
  var gamesFlyInTimer = undefined;
  gamesListItems.removeClass("navmenuflyin");

  if (typeof gamesFlyInTimer === "undefined") {
    gamesFlyInTimer = BasicJSTimer.CreateTimer(50, undefined, function(elapseTime, intervalCount) {
      gamesListItems.eq(intervalCount - 1).toggleClass("navmenuflyin");
    }, gamesListItems.length);
  } else {
    gamesFlyInTimer.Stop();
  }

  gamesFlyInTimer.Start();

}


function setHeaderSubMenuJS() {

  $(document).on('click', function (e) {

    $target = $(e.target);

    if ($($target).hasClass("header-menu-list-item-img") || $target.is("ul")) {
        return;
    }

    if ($('li.header-menu-parent-li').hasClass('active')) {
      $('li.header-menu-parent-li').removeClass('active');
      $('li.header-menu-parent-li').find("i").toggleClass('down');
      $('li.header-menu-parent-li').find("i").toggleClass('up');
      toggleOverlay();

    }
  });

  $('li.header-menu-parent-li > a').click(function(e){
    e.stopPropagation();
    e.preventDefault(); // prevent hashtag in url, this occurs because this is anchor tag
    $(this).parent().toggleClass('active');
    $(this).find("i").toggleClass('down');
    $(this).find("i").toggleClass('up');
    toggleOverlay();

    if ($(this).parent().hasClass('active')) {
      animateGamesHeadMenu();
    }

  });

  registerClickOffEvent($("nav#mobile-nav"), function(e) {

    if (isMobileNavClosed())
      return;

    closeMobileNav();
  });

}

function setNewsHeaderSubMenuJS() {

  $(document).on('click', function (e) {

    $target = $(e.target);

    if ($($target).hasClass("news-nav-anchor") || $target.is("ol")) {
        return;
    }

    if ($('nav.news-nav li').hasClass('active')) {
      $('nav.news-nav li').removeClass('active');
      $('nav.news-nav li').find("i").toggleClass('down');
      $('nav.news-nav li').find("i").toggleClass('up');
    }

  });

  $('nav.news-nav a.dropdown-link').click(function(e){
    e.stopPropagation();
    e.preventDefault(); // prevent hashtag in url, this occurs because this is anchor tag
    $(this).parent().toggleClass('active');
    $(this).find("i").toggleClass('down');
    $(this).find("i").toggleClass('up');
  });
}

function setContactFormDialogJS() {

  $('#ok').click(function(){
    go(50);
  });

  function go(nr) {
    $('.message').toggleClass('comein');
    $('.check').toggleClass('scaledown');
  }

}

function setHamburgerMenuJS() {

  $(window).on("resize", function() {
      $("nav#mobile-nav").css("height", $(window).height() + "px");
  });

  var toggleMobileNavOpenCallback = function(e) {
      e.stopPropagation();
      e.preventDefault();
      openMobileNav();
  };

  var toggleMobileNavCloseCallback = function(e) {
      e.stopPropagation();
      e.preventDefault();
      closeMobileNav();
  };

  $("a#header-hamburger-menu").on("click", toggleMobileNavOpenCallback);
  $("a#mobile-nav-close").on("click", toggleMobileNavCloseCallback);

  // Make sure primary menu items with sub menus do not redirect
  $("li.mobile-nav-primary-btn > ul").each(function(index, subMenuULDOM) {
      $(this).parent().find("a:first-child").on("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        toggleMobileNavSubMenu($(subMenuULDOM));
      });
  });

}

$(document).ready(function() {
  setOverlay();
  setHeaderSubMenuJS();
  setNewsHeaderSubMenuJS();
  setContactFormDialogJS();
  setHamburgerMenuJS();
});
