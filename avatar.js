(function ($) {
  
  // to get scrollbar width of body
  function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
  }
  $barWidth = getScrollbarWidth();

  // avatar for popup for localized page except homepage
  if (!($('body').hasClass('homepage')) && !(sessionStorage.getItem('selectedAvatar')) && !(sessionStorage.getItem('avatarIndex'))){
    $('.avatars-window').fadeIn('fast');
    $('body').addClass('modal-open');
    $('body').css('padding-right', $barWidth +'px');
  }

  // avatar cursor
  var mouseCursor = document.querySelector('.cursor');
  var mouseCursorImg = document.querySelector('.cursor img');
  var avatarsWindow = document.querySelector('.avatars-window');
  let selectedAvatarSrc;
  var avtarIndex;

  if (sessionStorage.getItem('selectedAvatar')) {
    selectedAvatarSrc = sessionStorage.getItem('selectedAvatar');
    avtarIndex = sessionStorage.getItem('avatarIndex');
    mouseCursorImg.setAttribute('data-avatar-index', avtarIndex);
    setAvatarUrl(avtarIndex);
    avatarsWindow.classList.add("display-none");
    document.querySelector("html").classList.add("cursor-none");
  }

  window.addEventListener('mousemove', cursor);

  $('.avatars-menu li').on('click', function (e) {
    $('.avatars-menu li').removeClass('active-avatar');
    $(this).addClass('active-avatar');
    selectAvatar($(this));
  });

  function selectAvatar($clickedElement) {
    $this = $clickedElement;
    selectedAvatarSrc = $this.find('img').attr('data-avatar');
    avtarIndex = $this.find('img').attr('data-avatar-index');
    sessionStorage.setItem('selectedAvatar', selectedAvatarSrc);
    sessionStorage.setItem('avatarIndex', avtarIndex);
    setAvatarUrl(avtarIndex);
    mouseCursorImg.setAttribute('data-avatar-index', avtarIndex);
    mouseCursor.classList.remove("display-none");
    avatarsWindow.classList.add("display-none");
    document.querySelector("html").classList.add("cursor-none");
  }

  function setAvatarUrl(avtarIndex){
    var url = "",
    index = avtarIndex;
    $body = $("body");
    if ($body.hasClass('fantastic-page')) {
      url = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-Outfits/Avatar-'+index+'-fantasy.png';
    } else if($body.hasClass('the-macabre-page')) {
      url = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-Outfits/Avatar-'+index+'-macabre.png';    
    } else if($body.hasClass('way-out-west-page')) {
      url = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-Outfits/Avatar-'+index+'-Western.png';    
    } else if($body.hasClass('on-the-road')) {
      url = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-Outfits/Avatar-'+index+'-ride.png';    
    } else if($body.hasClass('cyberpunk')) {
      url = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-Outfits/Avatar-'+index+'-cyberpunk.png';    
    } else if($body.hasClass('cooking')) {
      url = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-Outfits/Avatar-'+index+'-cooking.png';    
    } else {
      url = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-'+index+'-base.png';
    }
    mouseCursorImg.src = url;
  }

  $(".homepage .fantastic").hover(
    function() {
      mouseCursorImg.src = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-Outfits/Avatar-'+avtarIndex+'-fantasy.png';
    }, function() {
      mouseCursorImg.src = selectedAvatarSrc;
    }
  );

  $(".homepage .macabre").hover(
    function() {
      mouseCursorImg.src = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-Outfits/Avatar-'+avtarIndex+'-macabre.png';
    }, function() {
      mouseCursorImg.src = selectedAvatarSrc;
    }
  );

  $(".homepage .way-out-west").hover(
    function() {
      mouseCursorImg.src = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-Outfits/Avatar-'+avtarIndex+'-Western.png';
    }, function() {
      mouseCursorImg.src = selectedAvatarSrc;
    }
  );

  $(".homepage .on-the-road").hover(
    function() {
      mouseCursorImg.src = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-Outfits/Avatar-'+avtarIndex+'-ride.png';
    }, function() {
      mouseCursorImg.src = selectedAvatarSrc;
    }
  );

  $(".homepage .cyberpunk").hover(
    function() {
      mouseCursorImg.src = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-Outfits/Avatar-'+avtarIndex+'-cyberpunk.png';
    }, function() {
      mouseCursorImg.src = selectedAvatarSrc;
    }
  );

  $(".homepage .whats-cookin").hover(
    function() {
      mouseCursorImg.src = 'https://d3kqgz5iyf5gxy.cloudfront.net/Creative+trends+2022/Avatars/Avatar-Outfits/Avatar-'+avtarIndex+'-cooking.png';
    }, function() {
      mouseCursorImg.src = selectedAvatarSrc;
    }
  );

  function cursor(e) {
    mouseCursor.style.top = e.y + 'px';
    mouseCursor.style.left = e.x + 'px';
    if (sessionStorage.getItem('selectedAvatar')) {
      mouseCursor.classList.remove("display-none");
    }
  }

  //close popup of avatar
  $('.close-avatar').click(function(e) {
    e.preventDefault();
    $('.avatars-window').hide();
    selectAvatar($('.avatars-menu li.active-avatar'));
    $('body').removeClass('modal-open');
    $("body").removeAttr("style");
  });
})(jQuery);