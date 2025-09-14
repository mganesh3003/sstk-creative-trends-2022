(function ($) {
  // GSAP Animation logic

  const text = gsap.utils.toArray('.scrollup-text');
  text.forEach((heading) => {
    gsap.fromTo(
      heading,
      1,
      {
        y: 100,
        opacity: 0,
      },
      {
        y: 0,
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
  
  function timelineAnimation() {
    ScrollTrigger.getById('ms-1') && ScrollTrigger.getById('ms-1').kill();
    const timelineSlides = gsap.utils.toArray('.timeline');
    timelineSlides.forEach((index) => {
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
  }

  var mainHeading = new TimelineLite({ delay: .8 });
  var headlineFirst = $('.home-intro h2 span');

  mainHeading.staggerFrom([headlineFirst], .5, {
    y: 0,
    x: -600,
    ease: 'ease-out',
  }, 'Start');

  // Space and timeline toggle button. 
  $(".space-time-route li").click(function(){
    $(".space-time-route li").removeClass('active-traval');
    $(this).addClass('active-traval');
    $section = $(this).attr('data-section');
    $('.toggle-section').fadeOut('fast');
    $('#'+$section).fadeIn();
    ScrollTrigger.refresh(true);
    timelineAnimation();
  });


  // avatar cursor
  var mouseCursor = document.querySelector('.cursor');
  var mouseCursorImg = document.querySelector('.cursor img');
  var avatarsLi = document.querySelectorAll('.avatars-menu li');
  var avatarsWindow = document.querySelector('.avatars-window');

  let selectedAvatarSrc;

  if (sessionStorage.getItem('selectedAvatar')) {
    selectedAvatarSrc = sessionStorage.getItem('selectedAvatar');
    mouseCursorImg.src = selectedAvatarSrc;
    avatarsWindow.classList.add("display-none");
    document.querySelector("html").classList.add("cursor-none");
  }

  window.addEventListener('mousemove', cursor);

  if (document.body.classList.contains("home")) {
    document.querySelector(".custom-space").addEventListener("mouseenter", updateAvatar);
    document.querySelector(".custom-space").addEventListener("mouseleave", defaultAvatar);
  }    

  function updateAvatar(e) {
    if (!selectedAvatarSrc) { return false; }
    mouseCursorImg.src = "avatar2.png";
  }

  function defaultAvatar(e) {
    if (!selectedAvatarSrc) { return false; }
    mouseCursorImg.src = selectedAvatarSrc;
  }

  $('.avatars-menu li').on('click', function (e) {
    $('.avatars-menu li').removeClass('active-avatar');
    $(this).addClass('active-avatar');
    selectAvatar($(this));
  });

  function selectAvatar($clickedElement) {
    $this = $clickedElement;
    
    selectedAvatarSrc = $this.find('img').attr('src');
    console.log(selectedAvatarSrc);
    sessionStorage.setItem('selectedAvatar', selectedAvatarSrc);
    mouseCursorImg.src = selectedAvatarSrc;
    mouseCursor.classList.remove("display-none");
    avatarsWindow.classList.add("display-none");
    document.querySelector("html").classList.add("cursor-none");
  }

  function cursor(e) {
    mouseCursor.style.top = e.pageY + 'px';
    mouseCursor.style.left = e.pageX + 'px';
    if (sessionStorage.getItem('selectedAvatar')) {
      mouseCursor.classList.remove("display-none");
    }
  }

  $('.close-avatar').click(function(e) {
    e.preventDefault();
    $('.avatars-window').hide();
    selectAvatar($('.avatars-menu li.active-avatar'));
    $('body').removeClass('modal-open');
    $("body").removeAttr("style");
  });


  // map
  // popup map functionality
  $mapListPointContainer = $(
    ".globe-banner__map-container ul.map-list-container"
  );
  $mapListPointContainer.children("li").on("mouseover", function (e) {
    e.preventDefault();

    var $this = $(this),
      countryCode = $this.attr("data-country-code"),
      $popupParent = $(".globe-banner__map-container .list-popups"),
      $selectedPopup = $(
        ".popup-container[data-country-code=" + countryCode + "]"
      );

    $(".popup-container").not($selectedPopup).fadeOut();
    // $popupParent.add($selectedPopup).fadeOut();
    $popupParent.add($selectedPopup).fadeIn();
    if (window.innerWidth > 768) {
      $("aside").fadeOut();
    }

    $("body>div.animation-container").addClass("hideScroll");
    $("body").addClass("hideScroll");
  });

  $(".list-popups .popup-container .close-arrow").on("click", function () {
    $(".globe-banner__map-container .list-popups").fadeOut();
    $(".globe-banner__map-container .list-popups .popup-container").fadeOut();

    if (window.innerWidth > 768) {
      $("aside").fadeIn();
    }

    $("body>div.animation-container").removeClass("hideScroll");
    $("body").removeClass("hideScroll");
  });

  $(".list-popups").on("click", function () {
    $(".globe-banner__map-container .list-popups").fadeOut();
    $(".globe-banner__map-container .list-popups .popup-container").fadeOut();

    if (window.innerWidth > 768) {
      $("aside").fadeIn();
    }

    $("body>div.animation-container").removeClass("hideScroll");
    $("body").removeClass("hideScroll");
  });

  $(".list-popups .popup-container").on("click", function (e) {
    e.stopPropagation();
  });

  // move map right left on arrow click start here
  var $mapFigure = $(".globe-banner__map-container .globe-banner__map"),
    $mapListPointContainer = $(
      ".globe-banner__map-container ul.map-list-container"
    ),
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

  // Close global trends popup when mouseout start
  $(".list-popups .popup-container").mouseout(function (event) {
    e = event.toElement || event.relatedTarget;
    if ($(e).parents(".popup-container").length || e == this) {
      return;
    }

    $(".globe-banner__map-container .list-popups").fadeOut();
    $(".globe-banner__map-container .list-popups .popup-container").fadeOut();

    if (window.innerWidth > 768) {
      $("aside").fadeIn();
    }

    $("body>div.animation-container").removeClass("hideScroll");
    $("body").removeClass("hideScroll");
  });
  // Close global trends popup when mouseout end
  // Audio button play/pause.

  var audioButtons = document.querySelectorAll(".toggle-button .switch input")
  var audio = document.querySelector(".audio__container audio")

  audioButtons.forEach(button => {
    button.addEventListener("click", function(e) {
      if (button.checked) {
        audioButtons[1].checked = true
        audioButtons[0].checked = true
        audio.muted = false
        audio.play()
      } else {
        audioButtons[0].checked = false
        audioButtons[1].checked = false
        audio.muted = true
        audio.pause()
      }
    })
  })


  

  // spaceTimeBtn.forEach(button => {
  //   button.addEventListener('click', function(e) {
  //     button
  //     // spaceTimeBtn[0].classList.remove("active-traval")
  //     // spaceTimeBtn[1].classList.remove("active-traval")
  //     this.classList.add("active-traval")
  //   })
  // })

  // Localized report display title.
  var localizedWindow = document.querySelector(".localized-window-fixed");

  var inBanner = true;
  var activeHover = false;

  $(".localized-window-fixed").hover(
    function(e){
      e.stopPropagation();
      // activeHover = true;
      $(".localized-hide-window h3").slideDown(500)
      $(".localized-sub-hide-window").slideDown(500)
    },

    function(e){
      e.stopPropagation();
      if (!inBanner) {
        $(".localized-hide-window h3").slideUp(500)
      }
      $(".localized-sub-hide-window").slideUp(500)
      // activeHover = false;
    }
  );


  $('.lang-nav-mob, .localized-header .lang-nav li, .close').on('click', function() {
    var isMobNav = $('nav').hasClass('mob-nav');
    var langNav = $('.lang-nav');
  
    $('body').toggleClass('body-overflow');
    $('nav').toggleClass('mob-nav');
  
    if(isMobNav) {
      langNav.animate({height: '0%'},1000);
    } else {
      langNav.animate({height: '100%'},1000);
    }
  });
  
  var mobNavText = $('.lang-nav-mob a');
  
  $('.localized-header .lang-nav li').on('click', function() {
    mobNavText.text($(this).text());
  }); 


  // Fixed header js.
  var fixedHeader = document.querySelector(".logos");
  var fixedHeaderOffset = fixedHeader.offsetTop;
  
  function makeFixedHeader() {
    if (window.pageYOffset >= fixedHeaderOffset) {
      fixedHeader.classList.add("fixed-header");
    } else {
      fixedHeader.classList.remove("fixed-header");
    }
  }
  
  window.addEventListener("scroll", makeFixedHeader);

//   $(".localized-window-fixed").hover(
//     function (e) {
//       e.stopPropagation();
//         $(".localized-sub-hide-window").stop(true,true).fadeIn( 500 );
//         $('.localized-window-fixed .localized-hide-window ').stop(true,true).css('width', "auto");
//     },
//     function (e) {
//       e.stopPropagation();
//         $(".localized-sub-hide-window").stop(true,true).fadeOut();
//         $('.localized-window-fixed .localized-hide-window ').stop(true,true).css('width', "100px");
//     }
// );

  $(document).scroll(function() {
    // var myScrollFunc = function (e) {
    //   e.stopPropagation();
    //   var y = window.scrollY;
    //   if (y <= 1750) {
    //     $(".localized-hide-window h3").show().addClass("localized-width-js")        
    //     inBanner = true;
    //   } else {
    //     if (!activeHover) {
    //       $(".localized-hide-window h3").hide().removeClass("localized-width-js")
    //     }
    //     inBanner = false;
    //   }
    // };

    // window.addEventListener("scroll", myScrollFunc);
  });

  // to get scrollbar width of body
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }

  function myScrollFunc(e) {
    // e.stopPropagation();
    var y = window.scrollY;
    if (y <= 1750) {
      $(".localized-hide-window h3").show().addClass("localized-width-js")        
      inBanner = true;
    } else {
      if (!activeHover) {
        $(".localized-hide-window h3").hide().removeClass("localized-width-js")
      }
      inBanner = false;
    }
  }

  $(window).on('load scroll', function() {
    $barWidth = getScrollbarWidth();

    myScrollFunc();


    // if($(window).scrollTop() >= 140) {
    //   $('.logos').addClass('fixed-header');
    // } else {
    //   $('.logos').removeClass('fixed-header');
    // }

    var homeTop = $('.home-intro').offset().top,
      homeHeight = $('.home-intro').outerHeight(),
      windowWidth = $(window).height(),
      windowScroll = $(this).scrollTop();
      
    if (windowScroll > (homeTop+homeHeight-windowWidth-150) && !(sessionStorage.getItem('selectedAvatar'))){
      $('.avatars-window').fadeIn(300);
      $('body').addClass('modal-open');
      $('body').css('padding-right', $barWidth +'px');
    }
  });

  // Fixed header js.
  // var fixedHeader = document.querySelector(".logos");
  // var fixedHeaderOffset = fixedHeader.offsetTop;
  // function makeFixedHeader() {
  //   if (window.pageYOffset >= fixedHeaderOffset) {
  //     fixedHeader.classList.add("fixed-header");
  //   } else {
  //     fixedHeader.classList.remove("fixed-header");
  //   }
  // }

  window.addEventListener("scroll", makeFixedHeader);


  $(window).on('load resize', function() {
    ScrollTrigger.refresh(true);
    timelineAnimation();
  });

})(jQuery);