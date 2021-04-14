$(document).ready(function(){

  $(window).onload =setTimeout(function(){
          $('.preloader').fadeOut('slow').end().delay(19500)},19500)
  
  
  var skip=document.getElementById('skip');
  // console.log(skip);
  var skipWindow=document.querySelector('.preloader');
  skip.onclick=function (){
  skipWindow.classList.add("skip");
  }
  
  $(function(){
          $('.minimized').click(function(event) {
            var i_path = $(this).attr('src');
            $('body').append('<div id="overlay"></div><div id="magnify"><img src="'+i_path+'"><div id="close-popup"><i></i></div></div>');
            $('#magnify').css({
             left: ($(document).width() - $('#magnify').outerWidth())/2,
             // top: ($(document).height() - $('#magnify').outerHeight())/2 upd: 24.10.2016
                    top: ($(window).height() - $('#magnify').outerHeight())/2
           });
            $('#overlay, #magnify').fadeIn('fast');
          });
          
          $('body').on('click', '#close-popup, #overlay', function(event) {
            event.preventDefault();
            $('#overlay, #magnify').fadeOut('fast', function() {
              $('#close-popup, #magnify, #overlay').remove();
            });
          });
        });
  //плагин на просмотр увеличинных изображений
jQuery('.lightzoom').lightzoom();        
        ( function( $ ) {
          $( '.lightzoom' ).lightzoom( {
            speed:                 400,   // скорость появления
            imgPadding:            10,    // значение отступа у изображения
            overlayOpacity:        '0.6', // прозрачность фона (от 0 до 1)
            viewTitle:             false, // true, если надо показывать подпись к изобажению
            isOverlayClickClosing: true, // true, если надо закрывать окно при клике по затемненной области
            isWindowClickClosing:  false, // true, если надо закрывать окно при клике по любой области
            isEscClosing:          true, // true, если надо закрывать окно при нажатии на кнопку Esc
            boxClass:              '',    // позволяет задавать класс окну обертке (с версии 1.1.0)
            overlayColor:          '',    // позволяет задавать цвет фону (с версии 1.1.0)
            titleColor:            '',    // позволяет задавать цвет подписи (с версии 1.1.0)
          } );
         
         } );
// прокрутка на верх
// $("#top").click(function() {
//   $("body").animate({ scrollTop : 0}, 200);
//   return true;
// });

$('.slicker').slick({
  infinite: true,
  dots: true,
  // slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed:3000,
  fade: true,
  focusOnSelect: false,
  centerMode: true,
});

// валидации формы



})