(function ($) {
  $aniamtionFlag = true;
  AOS.init();
  // Space and timeline toggle button. 
  $(".space-time-route li").click(function() {

    if($(window).width() <= 995) {
      $(".space-time-route li").removeClass('active-traval');
      $(this).addClass('active-traval');
    }
    $section = $(this).attr('data-section');
    $sectionTop = $('#'+$section).offset().top - 100;
    $('html, body').animate({ scrollTop: $sectionTop }, 500);
  });

  /* =============================
  popup map functionality
  ================================ */
  $mapListPointContainer = $(".globe-banner__map-container ul.map-list-container");
  $mapListPointContainer.children("li").on("click", function (e) {
    e.preventDefault();
    e.stopPropagation();

    var $this = $(this),
      countryCode = $this.attr("data-country-code"),
      $popupParent = $(".globe-banner__map-container .list-popups"),
      $selectedPopup = $(".popup-container[data-country-code=" + countryCode + "]");

    $(".popup-container").not($selectedPopup).fadeOut();
    $popupParent.add($selectedPopup).fadeIn();
    $("body").addClass("hideScroll");
  });

  $(".list-popups .popup-container .close-arrow").on("click", function () {
    $(".globe-banner__map-container .list-popups").fadeOut();
    $(".globe-banner__map-container .list-popups .popup-container").fadeOut();
    $("body").removeClass("hideScroll");
  });

  $(".list-popups").on("click", function () {
    $(".globe-banner__map-container .list-popups").fadeOut();
    $(".globe-banner__map-container .list-popups .popup-container").fadeOut();
    $("body").removeClass("hideScroll");
  });

  $(".list-popups .popup-container").on("click", function (e) {
    e.stopPropagation();
  });

  // move map right left on arrow click start here
  var $mapFigure = $(".globe-banner__map-container .globe-banner__map"),
    $mapListPointContainer = $(".globe-banner__map-container ul.map-list-container"),
    $leftArrow = $(".globe-banner__map-container .left-arrow"),
    $rightArrow = $(".globe-banner__map-container .right-arrow"),
    counterMap = 0,
    incrementer = 15;

  moveMap(counterMap);

  $leftArrow.on("click", function () {
    if (counterMap > 0) {
      counterMap = counterMap - incrementer;
      moveMap(counterMap);
    }

    if (counterMap === 90) {
      incrementer = 15;
    }
  });

  $rightArrow.on("click", function () {
    if (counterMap < 100) {
      counterMap = counterMap + incrementer;
      moveMap(counterMap);
    }

    if (counterMap === 90) {
      incrementer = 10;
    }
  });

  function moveMap(counterMap) {
    $mapFigure.animate({ right: counterMap + "%" });
    $mapListPointContainer.animate({ left: -counterMap + "%" });
  }
  // move map right left on arrow click end here

  /* =============================
  Close global trends popup when mouseout end
  ================================ */

  // Audio button play/pause.
  $flag = true;

  $(".toggle-button input, .unmute-audio img").click(function () {
    $audio = document.querySelector(".audio__container audio");
    $audioButtons = $(".toggle-button input");
    if (!$flag) {
      $audioButtons.prop("checked", false);
      $audio.muted = true;
      $audio.pause();
      $flag = true;
      $(".unmute-audio img").attr('src', "https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Unmute.svg");
    } else {
      $audioButtons.prop("checked", true);
      $audio.muted = false;
      $audio.play();
      $flag = false;
      $(".unmute-audio img").attr('src', "https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/mute.svg"); 
    }
  });

  // hamburger functionality
  $(".lang-nav-mob, .localized-header .lang-nav li a, .close").on("click",function () {
    if($(window).width() <= 995) {
      var isMobNav = $("nav").hasClass("mob-nav");
      var langNav = $(".lang-nav");
      $("body").toggleClass("body-overflow");
      $("nav").toggleClass("mob-nav");
      if (isMobNav) {
        langNav.animate({ height: "0%" }, 1000);
      } else {
        langNav.animate({ height: "100%" }, 1000);
      }
    }
  });
  
  var mobNavText = $('.lang-nav-mob a');
  
  $('.localized-header .lang-nav li a').on('click', function() {
    mobNavText.text($(this).text());
  }); 

  // Fixed header js.
  var fixedHeader = document.querySelector(".logos");
  var fixedAudioIcon = document.querySelector(".unmute-audio");
  var fixedHeaderOffset = fixedHeader.offsetTop;
  
  function makeFixedHeader() {
    if (window.pageYOffset >= fixedHeaderOffset) {
      fixedHeader.classList.add("fixed-header");
      fixedAudioIcon.classList.add("fixed-audio-icon");
    } else {
      fixedHeader.classList.remove("fixed-header");
      fixedAudioIcon.classList.remove("fixed-audio-icon");
    }
  }

  // to get scrollbar width of body
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  // Localized report display title.
  function localizedFunction() {
    var y = window.scrollY;
    if (y <= 1300) {
      $(".localized-window-fixed .localized-hide-window").removeClass("localized-width-js");
    } else {
      $(".localized-window-fixed .localized-hide-window").addClass("localized-width-js");
    }
  }

  // To check element is in viewport or not
  $.fn.isInViewport = function (value = 0) {
    if ($(this).offset()) {
      var elementTop = $(this).offset().top;
      var elementBottom = elementTop + $(this).outerHeight() + value;
      var viewportTop = $(window).scrollTop();
      var viewportBottom = viewportTop + $(window).height();
      return elementBottom > viewportTop && elementTop < viewportBottom;
    }
  };

  $(window).on('load scroll', function() {
    $barWidth = getScrollbarWidth();

    localizedFunction();

    // function call for fixed header
    makeFixedHeader();

    // avatar popup on scroll
    var homeTop = $('.home-intro').offset().top,
      homeHeight = $('.home-intro').outerHeight(),
      windowWidth = $(window).height(),
      windowScroll = $(this).scrollTop();

    if (windowScroll > (homeTop+homeHeight-windowWidth-150) && !(sessionStorage.getItem('selectedAvatar')) && !(sessionStorage.getItem('avatarIndex'))){
      $('.avatars-window').fadeIn(300);
      $('body').addClass('modal-open');
      $('body').css('padding-right', $barWidth +'px');
    }

    // on scroll add remove active class for toggle button
    if($('.homepage')) {
      if($("#timeline-section").isInViewport() && ($(window).width() > 995)) {
        $('.space-time-route li[data-section="timeline-section"]').addClass('active-traval');
        $('.space-time-route li[data-section="space-section"]').removeClass('active-traval');
      } else if($("#space-section").isInViewport(value = 100) && ($(window).width() > 995)) {
        $('.space-time-route li[data-section="space-section"]').addClass('active-traval');
        $('.space-time-route li[data-section="timeline-section"]').removeClass('active-traval');
      }
    }
  });

  //scroll effect when click on footer video
  if($('.homepage').length !=0 ) {
    const urlParams = new URLSearchParams(window.location.search);
    const space = urlParams.get('space');

    if(space) {
      $('html, body').animate({
        scrollTop: $("#space-section").offset().top - 110
    }, 300);
    }
  }

  $(window).on('load', function() {
    // footer form on submit show success message
    $('form').submit(function(){
      $('form').hide();
      $('.trends-signup__success').show();   
    });
  });

  
  $map_container = $(".list-popups");
  // open prev map popup
  $(".popup-container .prev-map").click(function (e) { 
    e.preventDefault();
    $(this).parent('.popup-container').hide();
    $(this).parent('.popup-container').prev('.popup-container').show();
  });

  // open next map popup
  $(".popup-container .next-map").click(function (e) { 
    e.preventDefault();
    $(this).parent('.popup-container').hide();
    $(this).parent('.popup-container').next('.popup-container').show();
  });
  
})(jQuery);
