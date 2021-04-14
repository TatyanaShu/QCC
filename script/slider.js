$(document).ready(function () {
  var navigation = false,
    curPage = 1,
    pages = $(".section").length,
    $paginationTotal = $(".total-pages"),
    $textStuff = $(".nameOfPart, .visible, .textPart, .nameOfHead, .headName"),
    sidebarScroll = 0,
    $navEl = $(".nav-elem"),
    $sidebar = $(".sidebar-real");
    $form=$('.questionList');
  //надпись номера страницы
  function pageNumb(pages) {
    if (pages >= 10) {
      $paginationTotal.text(pages);
    } else {
      $paginationTotal.text("0" + pages);
    }
  }
  pageNumb(pages);
  /*
 задержка перед анимацией перехода блоков  */
  function randomDelay() {
    $(".left-part").css("transition-delay",(Math.floor(Math.random() * 9) + 4) / 10 + "s");
    for (var i = 1; i <= pages; i++) {
      $(".bg-part:nth-child(" + i + ")").css("transition-delay",(Math.floor(Math.random() * 9) + 4) / 10 + "s");
    }
  }

  /* задержка анимации названия разделов и текста внутри  */
  function timeoutNav(t) {
    var time = t || 2000;
    $textStuff.addClass("not-visible");
    setTimeout(function () {
      navigation = false;
      randomDelay();
    }, time);

    // setTimeout(function () {
    //   $('.nameOfPart, .textPart, .nameOfHead').css({"margin-top": 0 -(parseInt($(".nav-elem.active").attr("data-page")) - 1) * 100 +"vh",}).hide();
    // }, 410);
    setTimeout(function () {
      $textStuff.show();
      $textStuff.css("top");
      $textStuff.removeClass("not-visible");
    }, time + 10);
  }
  // скрытие надписи прокрути вниз
  function magicStuff(paramPage) {
    if (paramPage) curPage = paramPage;
    navigation = true;
    var calculatedMargin = 0 - (curPage - 1) * 100;
    $(".bg-part, .left-part, .wraper").css("margin-top",calculatedMargin + "vh");
    $(".scroll-down").addClass("removed");
    if (parseInt($(".nav-elem.active").attr("data-page")) === 1) {
      $(".scroll-down").removeClass("removed");
    }
  }
  //анимация частей
  function trickyStuff(page) {
    $(".left-part, .bg-part").css({
      "transition-duration": "0s",
      "transition-delay": "0s",
    });
    $(".main").css("top");
    magicStuff(page);
    $(".main").css("top");
    $(".left-part, .bg-part").css("transition-duration", "0.8s");
    randomDelay();
  }

  function pagination(pg) {
    $(".nav-elem").removeClass("active");
    $(".nav-" + pg).addClass("active");
    curPage = pg;
    pageNumb(pg);
  }
  //стопор прокрутки
  function navigateUp() {
    if (curPage > 1) {
      curPage--;
      pagination(curPage);
      magicStuff();
      timeoutNav();
      outNum(1000, "num1");
      outNum(1600, "num2");
      $form.submit(validate);
    }
  }

  function navigateDown() {
    if (curPage < pages) {
      curPage++;
      pagination(curPage);
      magicStuff();
      timeoutNav();
      outNum(1000, "num1");
      outNum(1600, "num2");
      $form.submit(validate);
      
    }
  }
  //прокрутка блоков страницы
  $(document).on("mousewheel DOMMouseScroll", function (e) {
    if (!navigation) {
      if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
        navigateUp();
      } else {
        navigateDown();
      }
    }
  });

  $(document).on(
    "mousewheel DOMMouseScroll",
    ".sidebar-hover, .sidebar-real",
    function (e) {
      e.stopPropagation();
      // e.addEventListener(handleEvent, { passive: false });
    }
  );

  var maxScroll = $navEl.length * $navEl.height() - $(window).height();

  $(document).on("mousewheel DOMMouseScroll", ".sidebar-real", function (e) {
    if (navigation) return false;
    if (e.originalEvent.wheelDelta > 0 || e.originalEvent.detail < 0) {
      if (!sidebarScroll) return false;
      sidebarScroll += 100;
      if (sidebarScroll > 0) sidebarScroll = 0;
    } else {
      if (Math.abs(sidebarScroll) === maxScroll) return false;
      sidebarScroll -= 100;
      if (Math.abs(sidebarScroll) > maxScroll) sidebarScroll = 0 - maxScroll;
    }
    $sidebar.css("transform", "translateY(" + sidebarScroll + "px)");
  });
  // навигация
  $(document).on("click", ".nav-elem:not(.active)", function () {
    if (navigation) return false;
    var activePage = parseInt($(".nav-elem.active").attr("data-page"), 10),
      futurePage = $(this).attr("data-page");

    pagination(futurePage);

    if (Math.abs(activePage - futurePage) > 2) {
      var $fakePage = $(".section-" + futurePage).clone(),
        $currentPage = $(".section-" + activePage),
        fakeNumber = 0;

      if (activePage < futurePage) {
        // анимация вниз
        $currentPage.after($fakePage);
        fakeNumber = activePage + 1;
        $(".main").css("top");
        randomDelay();
        magicStuff(fakeNumber);
      } else {
        // анимация вверх
        $currentPage.before($fakePage);
        fakeNumber = activePage - 1;
        trickyStuff(activePage + 1);
        $(".main").css("top");
        randomDelay();
        $(".main").css("top");
        magicStuff(activePage);
      }
      timeoutNav(2000);
      setTimeout(function () {
        $fakePage.remove();
        trickyStuff(futurePage);
      }, 2000);
    } else {
      magicStuff(futurePage);
      timeoutNav();
    }
  });
  // изменение размеров
  $(window).resize(function () {
    maxScroll = $navEl.length * $navEl.height() - $(window).height();
    $sidebar.css("transform", "translateY(0)");
  });
});
//счетчик  цифр на 2 странице
const timeCount = 10000,
  step = 20;
function outNum(num, elem) {
  let numb = document.querySelector("#" + elem);
  n = 0;
  let timeView = Math.round(timeCount / (num / step));
  let interval = setInterval(() => {
    n<num? (n += step): clearInterval(interval);
    numb.innerHTML = n;
  }, timeView);
}

function validate() {
  let errList=document.querySelectorAll ("span");
  let userName=document.getElementById('userName');
  console.log(userName);
  let userPhone=document.getElementById('userTelephone');
let item=document.createElement("span"); 
item.innerHTML ="Поле обязательно для заполнения";
  for (let i= errList.length-1; i>=0; i--) {
        errList[i].remove();
    }
    if (!userName.value){
    userName.classList.add("errorList");
    userName.parentNode.insertBefore(item,userName.nextSibling);
    return false;
    } else{
    userName.classList.remove("errorList");
    item.remove();
  }
  if (!userPhone.value){
    userPhone.classList.add("errorList");
    userPhone.parentNode.insertBefore(item,userPhone.nextSibling);
    return false;
  }
  else{
    userPhone.classList.remove("errorList");
    item.remove();
  }
    
    form=document.entered;
    let login=isFullText(userName);
    let phone=isPhone(userPhone);
    return login&& phone;
}
function isFullText(fieldInp) {
  var letters = /^[A-Za-z]+$|^[А-Яа-я]+$/;

  if (fieldInp.value.match(letters)) {
    fieldInp.className = fieldInp.className.replace("alert", "");
    return true;
  } else {
    fieldInp.className = "alert";
    var item = document.createElement("span");
    item.innerHTML = "Имя должно состоять из букв латиницы или кириллицы";
    fieldInp.parentNode.insertBefore(item, fieldInp.nextSibling);
    return false;
  }
}

function isPhone(userPhone) {
  var pattern = /^(\+375|80)(17|29|25|44|33)(\d{3})(\d{2})(\d{2})$/;
  if (userPhone.value.match(pattern)) {
    userPhone.className = userPhone.className.replace("alert", "");
    return true;
  } else {
    userPhone.className = "alert";
    var item = document.createElement("span");
    item.innerHTML = "Телефон должен быть формата +375...";
    userPhone.parentNode.insertBefore(item, userPhone.nextSibling);
    return false;
  }
}
