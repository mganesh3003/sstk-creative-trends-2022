(function ($) {
  // parallax animation
  var mainHeading = new TimelineLite({ delay: .2 });
  var headlineFirst = $('.localized-banner h2');
  
  mainHeading.staggerFrom([headlineFirst], .5, {
    y: 100,
    x: 0,
    opacity: 0,
    ease: 'ease-out',
  }, 'Start');
  
  var textLeft = gsap.utils.toArray('.text-from-left');
  textLeft.forEach((heading) => {
    gsap.fromTo(
      heading,
      1.5,
      {
        x: -150,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: heading,
          start: 'top bottom',
          end: 'top 50%',
          ease: 'expo',
          scrub: false,
        },
      }
    );
  });

  ScrollTrigger.matchMedia({
    "(min-width:768px)": function() {
      var localTextLeft = gsap.utils.toArray('.localize-text-from-left');
      localTextLeft.forEach((heading) => {
        gsap.fromTo(
          heading,
          1.5,
          {
            x: -150,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: heading,
              start: 'top 30%',
              end: 'top bottom',
              ease: 'expo',
              scrub: false,
            },
          }
        );
      });

      var localTextRight = gsap.utils.toArray('.localize-text-from-right');
      localTextRight.forEach((heading) => {
        gsap.fromTo(
          heading,
          1.5,
          {
            x: 150,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: heading,
              start: 'top 30%',
              end: 'top bottom',
              ease: 'expo',
              scrub: false,
            },
          }
        );
      });
    },
    "(max-width:767px)": function() {
      var localTextLeft = gsap.utils.toArray('.localize-text-from-left');
      localTextLeft.forEach((heading) => {
        gsap.fromTo(
          heading,
          1.5,
          {
            x: -150,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: heading,
              start: 'top bottom',
              end: 'top 50%',
              ease: 'expo',
              scrub: false,
            },
          }
        );
      });

      var localTextRight = gsap.utils.toArray('.localize-text-from-right');
      localTextRight.forEach((heading) => {
        gsap.fromTo(
          heading,
          1.5,
          {
            x: 150,
            opacity: 0,
          },
          {
            x: 0,
            opacity: 1,
            scrollTrigger: {
              trigger: heading,
              start: 'top bottom',
              end: 'top 50%',
              ease: 'expo',
              scrub: false,
            },
          }
        );
      });
    }
  });
  
  var textRight = gsap.utils.toArray('.text-from-right');
  textRight.forEach((heading) => {
    gsap.fromTo(
      heading,
      1.5,
      {
        x: 150,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: heading,
          start: 'top bottom',
          end: 'top 50%',
          ease: 'expo',
          scrub: false,
        },
      }
    );
  });
  
  var bottomUp = gsap.utils.toArray('.bottomUp');
  bottomUp.forEach((index) => {
    gsap.fromTo(
      index,
      1,
      {
        y: 150,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: index,
          start: 'top bottom',
          end: 'top 50%',
          ease: 'ease-in-out',
          scrub: false,
        },
      }
    );
  });

  var ctaBottomUp = gsap.utils.toArray('.cta-bottomUp');
  ctaBottomUp.forEach((index) => {
    gsap.fromTo(
      index,
      1,
      {
        y: 120,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: index,
          start: 'top bottom',
          end: 'top 50%',
          ease: 'ease-in-out',
          scrub: false,
        },
      }
    );
  });

  ScrollTrigger.getById('ms-1') && ScrollTrigger.getById('ms-1').kill();
  const gridImage = gsap.utils.toArray('.section-videos li');
  gridImage.forEach((index) => {
    gsap.fromTo(
      index,
      {
        transform: 'scale(0)',
      },
      {
        transform: 'scale(1)',
        scrollTrigger: {
          trigger: index,
          start: 'top bottom',
          end: 'top center',
          scrub: false,
          id: 'ms-1',
          onSnapComplete: () => ScrollTrigger.refresh(true),
        },
      }
    );
  });


  ScrollTrigger.getById('ms-2') && ScrollTrigger.getById('ms-2').kill();
  const gallarySlide = gsap.utils.toArray('.callout-images-grid-ul li');
  gallarySlide.forEach((index) => {
    gsap.fromTo(
      index,
      {
        transform: 'scale(0)',
      },
      {
        transform: 'scale(1)',
        scrollTrigger: {
          trigger: index,
          start: 'top bottom',
          end: 'top center',
          scrub: false,
          id: 'ms-2',
          onSnapComplete: () => ScrollTrigger.refresh(true),
        },
      }
    );
  });


  // Function for comma between numbers.
  $.fn.digits = function () {
    return this.each(function () {
      $(this).text(
        $(this)
          .text()
          .replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
      );
    });
  };

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

  // Audio button play/pause.
  $flag = true;

  $(".toggle-button input, .unmute-audio img").click(function () {
    $videoAudio = $(".video-autoplay-elem");
    $audioButtons = $(".toggle-button input");
    if (!$flag) {
      $audioButtons.prop("checked", false);
      $videoAudio.prop('muted', true);
      $flag = true;
      $(".unmute-audio img").attr('src', "https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Unmute.svg");
    } else {
      $audioButtons.prop("checked", true);
      $videoAudio.prop('muted', false);
      $flag = false;
      $(".unmute-audio img").attr('src', "https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/mute.svg");
    }
  });

  // fucntion to Animate Number
  function AnimateNumber() {
    $(this)
      .prop("Counter", 0)
      .animate(
        {
          Counter: $(this).data("number"),
        },
        {
          duration: 3000,
          easing: "swing",
          step: function (now) {
            $(this).text(Math.ceil(now)).digits();
          },
        }
      );
  }

  var Counterflag = true,
  CounterflagSectionOne = true,
  CounterflagSectionTwo = true,
  CounterflagSectionThree = true,
  autoPlayVideoFlag = true,
  autoPlayGalleryFlag= true;
  $(window).on("load scroll", function () {
    // Fixed header call
    makeFixedHeader();

    // counter-section call
    if ($(".counter-animation .callouts-percentages").isInViewport() && Counterflag) {
      $(".counter-animation .callout-number").each(AnimateNumber);
      Counterflag = false;
    } 
    
    // video autoplay when in viewport
    if ($(".video-autoplay-elem").isInViewport(value = 150) && autoPlayVideoFlag){
      $(".video-autoplay-elem")[0].play();
      autoPlayVideoFlag = false;
    }

    // video gallery autoplay when in viewport
    if ($(".video-autoplay-gallery").isInViewport(value = 150) && autoPlayGalleryFlag) {
      $(".video-autoplay-gallery video").each(function() {
        this.play();
      });
      autoPlayGalleryFlag = false;
    }

    // localize report counter animation
    if ($(".callouts-one .callouts-percentages").isInViewport() && CounterflagSectionOne) {
      $(".callouts-one .callout-number").each(AnimateNumber);
      CounterflagSectionOne = false;
    } else if ($(".callouts-two .callouts-percentages").isInViewport() && CounterflagSectionTwo) {
      $(".callouts-two .callout-number").each(AnimateNumber);
      CounterflagSectionTwo = false;
    } else if ($(".callouts-three .callouts-percentages").isInViewport() && CounterflagSectionThree) {
      $(".callouts-three .callout-number").each(AnimateNumber);
      CounterflagSectionThree = false;
    }

    // Localized reports fixed class.
    var autoplayOffset = $(".autoplay").offset().top + 40;
    if (window.pageYOffset > autoplayOffset) {
      $(".localized-window-fixed").addClass("js-fixed-left");
    } else {
      $(".localized-window-fixed").removeClass("js-fixed-left");
    }
  });

  // Mobile menu js.
  $(".lang-nav-mob, .localized-header .lang-nav li a, .close").on(
    "click",
    function () {
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
    }
  );

  var mobNavText = $(".lang-nav-mob span");
  $(".localized-header .lang-nav li a").on("click", function () {
    mobNavText.text($(this).text());
  });

  // map
  // popup map functionality
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

  // footer form on submit show success message
  $('form').submit(function(){
    $('form').hide();
    $('.trends-signup__success').show();   
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
