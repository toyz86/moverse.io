// CURSOR FOLLOWER
gsap.config({
  autoSleep: 60,
  force3D: false,
  nullTargetWarn: false,
  trialWarn: false,
  units: {left: "%", top: "%", rotation: "rad"}
});

window.addEventListener("load", () => {
  document.onmousemove = handleMouseMove;
  const navLink = $(".nav-body__item a");
  const btn = $("#gloves-guide a.btn span");
  
  document.querySelectorAll('[data-magic-cursor="visible"]').forEach((e, i) => {
    e.addEventListener("mousemove", (fn) => {
      // let tl = gsap.timeline({});
      console.log("focus");
      fn.preventDefault();
      document.querySelector(".cursor-outer").classList.add("cursor-hover");
      document.querySelector(".cursor-inner").classList.add("cursor-hover");
      $(".cursor-inner").css({ background: e.getAttribute("data-theme") });
      $(".cursor-inner").css({ "mixBlendMode": "difference" })
      $(".mouse-cursor span").css({ opacity: 1 });

      // gsap.to(navLink[i], { y: '-100%' });
      gsap.to(btn, { y: '-50px' });
      
    });

    e.addEventListener("mouseleave", (fn) => {
      console.log("leave");
      fn.preventDefault();
      document.querySelector(".cursor-outer").classList.remove("cursor-hover");
      document.querySelector(".cursor-inner").classList.remove("cursor-hover");

      $(".cursor-inner").css({ background: "#F7941C" });
      $(".cursor-inner").css({ "mixBlendMode": "unset" })
      $(".mouse-cursor span").css({ opacity: 0 });
      // gsap.to(navLink[i], { y: 0 });
      gsap.to(btn, { y: 0 });

    });
  });

  function handleMouseMove(event) {
    $(".cursor-outer").css({
      visibility: "visible",
      transform: "translate(" + event.clientX + "px, " + event.clientY + "px)"
    });
    $(".cursor-inner").css({
      visibility: "visible",
      transform: "translate(" + event.clientX + "px, " + event.clientY + "px)"
    });
  }
});

// BEGIN Magnetic Hover Burger
var hoverMouse = function($el) {
  $el.each(function() {
    var $self = $(this);
    var hover = false;
    var offsetHoverMax = $self.attr("offset-hover-max") || 0.7;
    var offsetHoverMin = $self.attr("offset-hover-min") || 0.5;

    var attachEventsListener = function() {
      $(window).on("mousemove", function(e) {
        //
        var hoverArea = hover ? offsetHoverMax : offsetHoverMin;

        // cursor
        var cursor = {
          x: e.clientX,
          y: e.clientY + $(window).scrollTop()
        };

        // size
        var width = $self.outerWidth();
        var height = $self.outerHeight();

        // position
        var offset = $self.offset();
        var elPos = {
          x: offset.left + width / 2,
          y: offset.top + height / 2
        };

        // comparaison
        var x = cursor.x - elPos.x;
        var y = cursor.y - elPos.y;

        // dist
        var dist = Math.sqrt(x * x + y * y);

        // mutex hover
        var mutHover = false;

        // anim
        if (dist < width * hoverArea) {
          mutHover = true;
          if (!hover) {
            hover = true;
          }
          onHover(x, y);
        }

        // reset
        if (!mutHover && hover) {
          onLeave();
          hover = false;
        }
      });
    };

    var onHover = function(x, y) {
      TweenMax.to($self, 0.4, {
        x: x * 0.3,
        y: y * 0.3,
        //scale: .9,
        rotation: x * 0.05,
        ease: Power2.easeOut
      });
    };
    var onLeave = function() {
      TweenMax.to($self, 0.7, {
        x: 0,
        y: 0,
        scale: 1,
        rotation: 0,
        // ease: Elastic.easeOut.config(1.2, 0.4)
      });
    };

    attachEventsListener();
  });
};

hoverMouse($('label'));

////////////////////////////////////
//// BEGIN SLIDING PAGE ONSCROLL ///
////////////////////////////////////
gsap.utils.toArray(".comparisonSection").forEach((section) => {			
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: section,
			start: "center center",
			// makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
			// end: () => "+=" + section.offsetWidth, 
			end: "bottom -300%",
			scrub: 1,
			pin: true,
			anticipatePin: 1,
			// markers: true,
			// onLeave: onleavePage,
			onEnter: onEnterPage,
			onEnterBack: onEnterBack,
			onSnapComplete: onSnapComplete,
			invalidateOnRefresh: true,
			overwrite:"all"
		},
		defaults: {ease: "none"}
	});
	
	function onSnapComplete() {
		console.log('onSnapComplete');
	}

	function onEnterBack() {
		console.log('onEnterBack')
	}						

	function onEnterPage() {
		console.log('enter');
	}
	// animate the container one way...
	tl.fromTo(section.querySelector(".afterImage"), { xPercent: 100, x: 0}, {xPercent: -3, x:-3})
	// ...and the image the opposite way (at the same time)
	.fromTo(section.querySelector(".afterImage img"), {xPercent: -100, x: 0}, {xPercent: 3}, 0)
	.fromTo(section.querySelector(".beforeImage"), {xPercent: 0, x: 0}, {xPercent: -100}, 0);
	// tl.to(document.querySelector(".character-wrapper"), {xPercent: 10, x: 0}, 0);
	tl.fromTo(section.querySelector(".profile"), {xPercent: -100, x: 0, y: 50, autoAlpha: 0}, {xPercent:0, y: 50, autoAlpha: 0}, 0)
	tl.to(section.querySelector(".profile"), {autoAlpha: 1, y: 0})
	.set({}, {}, "-=0.5")
});		


////////////////////////////////////
////// BEGIN PARALLAX SCROLL ///////
////////////////////////////////////
function animateFrom(elem, direction) {
  direction = direction || 1;
  var x = 0,
      y = direction * 100;
  if(elem.classList.contains("gs_reveal_fromLeft")) {
    x = -100;
    y = 0;
  } else if (elem.classList.contains("gs_reveal_fromRight")) {
    x = 100;
    y = 0;
  }
  elem.style.transform = "translate(" + x + "px, " + y + "px)";
  elem.style.opacity = "0";
  gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
    duration: 1.25, 
    x: 0,
    y: 0, 
    autoAlpha: 1, 
    ease: "expo", 
    overwrite: "auto"
  });
}

function hide(elem) {
  gsap.set(elem, {autoAlpha: 0});
}

document.addEventListener("DOMContentLoaded", function() {
  gsap.registerPlugin(ScrollTrigger);
  
  gsap.utils.toArray(".gs_reveal").forEach(function(elem) {
    hide(elem); // assure that the element is hidden when scrolled into view
    
    ScrollTrigger.create({
      trigger: elem,
      onEnter: function() { animateFrom(elem) }, 
      onEnterBack: function() { animateFrom(elem, -1) },
      onLeave: function() { hide(elem) } // assure that the element is hidden when scrolled into view
    });
  });
});

////////////////////////////////////
/////////// BEGIN JQUERY ///////////
////////////////////////////////////
$(document).ready(function(){
	// load guide in modal overlay
	$('.modal').modal();
	
	// SLIDER
	$('.slider').slider({
		indicators: false,
		duration: 1000,
		height: 500
	});

  // PARALLAX
  $('.parallax').parallax();

	// SHOW AND HIDE LOGO HEADER
	$(window).on('load', function() {
		$("#logo-header").fadeOut();
	})

	$(document).scroll(function() {
    let tl = gsap.timeline({nullTargetWarn: false});
		const y = $(this).scrollTop();
		const logoHeader = $("#logo-header");
		const logoInner = $("#innerLogo");

		if (y > 600 && y < 1500) {
			$(logoHeader).fadeIn();
		} else {
			$(logoHeader).fadeOut();
		}

		if (y > 1500) {
			tl.to(".socmed-home", { opacity: 0 });
		} else {
			tl.to(".socmed-home", { opacity: 1 });
		}

		if(y >= 10) {
			$("#innerLogo, .socmed").fadeOut()
		} else {
			$("#innerLogo, .socmed").fadeIn()
		}
	});


	// BUTTON ROUTE TO CONTACT
	$('.quote-btn').click(function(){
		document.location.href='contact.html';
	})

	$("#logo-header img, #innerLogo img").click(function() {
		document.location.href='/';
	})		
	

////////////////////////////////////
////////// BEGIN NAVBAR ////////////
////////////////////////////////////
	$('.backDrop').css({'display': 'none'})
	$('input.More-checkbox').attr('value', 'false');
	$('.More').click(function() {

		$('input.More-checkbox').text($('#burger').val());

		$("#burger").on('change', function() {
			let tl = gsap.timeline({nullTargetWarn: false});

			if ($(this).is(':checked')) {
				$(this).attr('value', 'true');
				gsap.to('.nav-body', { display: 'block' });
				gsap.to('.nav-circle-body', 1, { scale: 200, opacity: 1, delay: 0.3})
				gsap.fromTo('.nav-body__item a', 0.7, { display: 'none', opacity: 0, y:50 }, { display: 'block', opacity: 1, y: 0, delay: '0.7' })
				gsap.fromTo('.nav-body__item .product-list', 0.7, { display: 'none', opacity: 0, y:50 }, { display: 'block', opacity: 1, y: 0, delay: '0.7' })
				gsap.fromTo('.menu-title', {opacity: 1, y: 0}, {opacity: 0, y: -10});
				gsap.fromTo('.socmed-home', {opacity: 1}, {opacity: 0})
				// console.log('check')
			} else {
				$(this).attr('value', 'false');
				tl.to('.nav-body', { display: 'none' });
				gsap.to('.nav-circle-body', 1, { scale: 1, opacity: 0, delay: 0.5 })
				gsap.fromTo('.nav-body__item a', 0.5, { display: 'block', opacity: 1, y: 0 }, { display: 'none', opacity: 0, y: 50 })
				gsap.fromTo('.nav-body__item .product-list', 0.5, { display: 'block', opacity: 1, y: 0 }, { display: 'none', opacity: 0, y: 50 })
				gsap.fromTo('.menu-title', {opacity: 0, y: -10}, {opacity: 1, y: 0})
				gsap.fromTo('.socmed-home', {opacity: 0}, {opacity: 1, delay: 0.7})
				// console.log('uncheck')
			}
			$('input.More-checkbox').text($('#burger').val());
		});
	})

  $('.nav-body__item a').mouseenter(function() {
    console.log('i am onhover');
    gsap.to(this, { y: -80 });
  })

  $('.nav-body__item a').mouseleave(function() {
    gsap.to(this, { y: 0 });
    console.log('i am onleave');
  })

	$('.product-list').click(function() {
		$('.fa-caret-down').toggleClass('product-active');
		if($('.fa-caret-down').hasClass('product-active')) {
			$('.nav-item-down').slideDown();
		} else {
			$('.nav-item-down').slideUp();
		}
	})
	// END NAV MENU

	// BUTTON HOVER
  $(".quote-btn").mouseenter(function(){
    gsap.to(".btn-order img", 0.1, { rotation: 40, scale: 0.9, opacity:0, ease: Power2.easeInOut });
		gsap.to(".btn-bg", 0.1, { scale: 0.8, opacity: 1, ease: Power2.easeInOut })
  });
  $(".quote-btn").mouseleave(function(){
    gsap.to(".btn-order img", 0.1, { rotation: 0, scale: 1, y: 0, opacity: 1, ease: Power2.easeInOut });
		gsap.to(".btn-bg", 0.1, { scale: 1, opacity: 0, ease: Power2.easeInOut })
  });	
	
////////////////////////////////////
///////////// ISOTOPE //////////////
////////////////////////////////////

	// $('.projects-list').isotope({
	// 	itemSelector: '.project-item',
	// 	// percentPosition: true,
	// 	resizable: false,
	// 	masonry: {
	// 		// use outer width of grid-sizer for columnWidth
	// 		columnWidth: 50,
	// 		gutter: 20
	// 	}
	// })
  // Initiating Isotope
  var $container = $('.projects-list');
  var colWidth = function () {
    var w = $container.width(),
      columnNum = 1,
      columnWidth = 0;
    if (w > 1200) {
      columnNum  = 2;
    } else if (w > 900) {
      columnNum  = 2;
    } else if (w > 600) {
      columnNum  = 2;
    } else if (w > 300) {
      columnNum  = 1;
    }
    columnWidth = Math.floor(w/columnNum);
    columnWidth = columnWidth - 10;
    // Item width
    $container.find('.project-item').each(function() {
      var $item = $(this);
      var multiplier_w = $item.attr('class').match(/item-w(\d)/);
      var width = multiplier_w ? columnWidth*multiplier_w[1]-4 : columnWidth-4;
      // Update item width
      $item.css({
        width: width
      });
    });
    return columnWidth;
  };
  var isotope = function () {
    $container.isotope({
      resizable: false,
      itemSelector: '.project-item',
      masonry: {
        columnWidth: colWidth(),
        gutter: 10
      }
    });
  };

  // Calling Isotope
  isotope();
	
});

////////////////////////////////////
///////////// PRELOAD //////////////
////////////////////////////////////
$(window).on('load',function(){
	// if($('#preloader').length){
	// 	var preLoder = $("#preloader");
	// 	preLoder.fadeOut(1000);
	// };
	// $('#preloader').css({'opacity': '0','visibility': 'hidden'});
	// $('#preloader').fadeOut(1000);
	gsap.fromTo('#preloader', 0.5, { autoAlpha: 1, display: 'block' }, { autoAlpha: 0, display: 'none' })
});	
