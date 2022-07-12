// window.onscroll=function(){
// 	if (window.pageYOffset >= 800) {
// 		gsap.to(document.querySelector(".profile"), 1.5, { opacity: 1, y: 0,  ease: "Power1.easeOut" });
// 	} else {
// 		gsap.to(document.querySelector(".profile"), 1.5, { opacity: 0, y: 100 });
// 	}
// 	// console.log( 
// 	// 	'top: '  + (window.pageYOffset || document.documentElement.scrollTop) + ' ' +
// 	// 	'left: ' + (window.pageXOffset || document.documentElement.scrollLeft)
// 	// );
// }

// BEGIN LOADER
// document.onreadystatechange = function() {
// 	if (document.readyState !== "complete") {
// 		document.querySelector("body").style.visibility = "hidden";
// 		document.querySelector("#loader").style.visibility = "visible";
// 	} else {
// 		document.querySelector("#loader").style.display = "none";
// 		document.querySelector("body").style.visibility = "visible";
// 	}
// };

// BEGIN ANIMATION ONSCROLL
gsap.utils.toArray(".comparisonSection").forEach((section) => {

	const canvas = document.getElementById("hero-lightpass");
	const context = canvas.getContext("2d");

	canvas.width = 563;
	canvas.height = 1000;

	const frameCount = 295;
	const currentFrame = index => ( `img/caracter/${index.toString().padStart(4, '0')}.png`
	);

	const images = []
	const airpods = {
		frame: 0
	};

	for (let i = 0; i < frameCount; i++) {
		const img = new Image();
		img.src = currentFrame(i);
		images.push(img);
	}						
	let tl = gsap.timeline({
		scrollTrigger: {
			trigger: section,
			start: "center center",
			// makes the height of the scrolling (while pinning) match the width, thus the speed remains constant (vertical/horizontal)
			end: () => "+=" + section.offsetWidth, 
			scrub: 1,
			pin: true,
			anticipatePin: 1,
			// markers: true,
			onLeave: onleavePage,
			onEnter: onEnterPage,
			onEnterBack: onEnterBack,
			onSnapComplete: onSnapComplete,
		},
		defaults: {ease: "none"}
	});

	let tlAnim = gsap.timeline({});

	tlAnim.to(airpods, {
		frame: frameCount - 1,
		snap: "frame",
		scrollTrigger: {
			scrub: 1,
			trigger: section,
			start: "center center",
			// end: () => "+=" + section.offsetWidth,
			end: () => section.offsetWidth + "+=2050",
			// pin: true,
			// markers: true,
			// onLeave: onComplete,
		},
		onUpdate: render // use animation onUpdate instead of scrollTrigger's onUpdate
	});		
	
	images[0].onload = render;
	
	function render() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.drawImage(images[airpods.frame], 0, 0); 
	}			
	
	function onSnapComplete() {
		console.log('onSnapComplete');
	}

	function onleavePage() {
		console.log('onLeave')
		render(function() {
			console.log('render')
		})
	};

	function onEnterBack() {
		console.log('onEnterBack')
	}						

	function onEnterPage() {
		console.log('enter');
	}
	// animate the container one way...
	tl.fromTo(section.querySelector(".afterImage"), { xPercent: 100, x: 0}, {xPercent: 0})
	// ...and the image the opposite way (at the same time)
	.fromTo(section.querySelector(".afterImage img"), {xPercent: -100, x: 0}, {xPercent: 0}, 0);
	// tl.to(document.querySelector(".character-wrapper"), {xPercent: 10});
	tl.fromTo(section.querySelector(".profile"), {xPercent: -100, x: 0, y: 0, autoAlpha: 0}, {xPercent:0, y: 0, autoAlpha: 1}, 0)
	.set({}, {}, "+=0.2")
});		
// END ANIMATION ONSCROLL

// BEGIN PARALLAX ITEM
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
// END PARALLAX ITEM

$(document).ready(function(){
	// load guide in modal overlay
	$('.modal').modal();
	
	// SLIDER
	$('.slider').slider({
		indicators: false,
		duration: 1000,
		height: 500
	});

	// SHOW AND HIDE LOGO HEADER
	$(window).on('load', function() {
		$("#logo-header").fadeOut();
	})
	$(document).scroll(function() {
		const y = $(this).scrollTop();
		const logoHeader = $("#logo-header");
		const logoInner = $("#innerLogo");

		if (y > 600 && y < 1500) {
			$(logoHeader).fadeIn();
		} else {
			$(logoHeader).fadeOut();
		}

		if (y > 1500) {
			$(".socmed-home").fadeOut()
		} else {
			$(".socmed-home").fadeIn()
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
	
	// BEGIN NAV MENU
	$('.backDrop').css({'display': 'none'})

	$('.product-list').click(function() {
		$('.fa-caret-down').toggleClass('product-active');
		if($('.fa-caret-down').hasClass('product-active')) {
			// $('.nav-item-down').css({'display': 'block' });
			$('.nav-item-down').slideDown();
			// console.log('drop active');
		} else {
			// $('.nav-item-down').css({'display': 'none' });
			$('.nav-item-down').slideUp();
			// console.log('drop not active');
		}
	})
	// $('input.More-checkbox').attr('value', 'false');
	$('.More').click(function() {

		$('input.More-checkbox').text($('#burger').val());

		$("#burger").on('change', function() {
			const tl = gsap.timeline({});
			if ($(this).is(':checked')) {
				$(this).attr('value', 'true');
				gsap.to('.nav-body', { display: 'block' });
				gsap.to('.nav-circle-body', 1, { scale: 200, opacity: 1, delay: 0.3})
				gsap.fromTo('.nav-body__item a', 0.7, { display: 'none', opacity: 0, y:50 }, { display: 'block', opacity: 1, y: 0, delay: '0.7' })
				gsap.fromTo('.nav-body__item .product-list', 0.7, { display: 'none', opacity: 0, y:50 }, { display: 'block', opacity: 1, y: 0, delay: '0.7' })
				// gsap.fromTo('.socmed-navbody a', 0.7, { display: 'none', opacity: 0 }, { display: 'block', opacity: 1, delay: '0.7' })
				gsap.fromTo('.menu-title', {opacity: 1, y: 0}, {opacity: 0, y: -10});
				gsap.fromTo('.socmed-home', {opacity: 1}, {opacity: 0})
				console.log('check')
			} else {
				$(this).attr('value', 'false');
				tl.to('.nav-body', { display: 'none' });
				gsap.to('.nav-circle-body', 1, { scale: 1, opacity: 0, delay: 0.5 })
				gsap.fromTo('.nav-body__item a', 0.5, { display: 'block', opacity: 1, y: 0 }, { display: 'none', opacity: 0, y: 50 })
				// gsap.fromTo('.socmed-navbody a', 0.5, { display: 'block', opacity: 1 }, { display: 'none', opacity: 0 })
				gsap.fromTo('.nav-body__item .product-list', 0.5, { display: 'block', opacity: 1, y: 0 }, { display: 'none', opacity: 0, y: 50 })
				gsap.fromTo('.menu-title', {opacity: 0, y: -10}, {opacity: 1, y: 0})
				gsap.fromTo('.socmed-home', {opacity: 0}, {opacity: 1, delay: 0.7})
				console.log('uncheck')
			}
			$('input.More-checkbox').text($('#burger').val());
		});
	})
	// END NAV MENU

	// BUTTON HOVER
  $(".quote-btn").mouseenter(function(){
    gsap.to(".btn-order img", 0.1, { rotation: 40, scale: 0.9, opacity:0, ease: Power2.easeInOut });
		gsap.to(".btn-bg", 0.1, { scale: 0.8, opacity: 1, ease: Power2.easeInOut })
		// gsap.to(".cls-1", 0.5, { opacity: 0, ease: Power2.easeInOut });
  });
  $(".quote-btn").mouseleave(function(){
    gsap.to(".btn-order img", 0.1, { rotation: 0, scale: 1, y: 0, opacity: 1, ease: Power2.easeInOut });
		gsap.to(".btn-bg", 0.1, { scale: 1, opacity: 0, ease: Power2.easeInOut })
		// gsap.to(".cls-1", 0.5, { opacity: 1, ease: Power2.easeInOut });
  });	
	
	/*-----------------
			ISOTOPE
	------------------*/
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

/*-----------------
		preloader
------------------*/
$(window).on('load',function(){
	if($('#preloader').length){
			var preLoder = $("#preloader");
			preLoder.fadeOut(2000);

	};
});	