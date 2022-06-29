// const { default: gsap } = require("gsap");
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


$(document).ready(function(){
	// $("#nav-placeholder").load("component/nav.html");  
	$(".preload").fadeOut(2000, function() {
		$(".content").fadeIn(1000);        
	});
	
	$('.slider').slider({
		indicators: false,
		duration: 1000,
		height: 500
	});

	$(document).scroll(function() {
		var y = $(this).scrollTop();
		if (y > 200 && y < 1200) {
			$('#logo-header').fadeIn();
		} else {
			$('#logo-header').fadeOut();
		}
	});

	$('.quote-btn').click(function(){
		document.location.href='/contact.html';
	})
	
	// BEGIN NAV MENU
	$('.backDrop').css({'display': 'none'})

	$('.product-list').click(function() {
		$('.fa-caret-down').toggleClass('product-active');
		if($('.fa-caret-down').hasClass('product-active')) {
			$('.nav-item-down').css({'display': 'block' });
			// console.log('drop active');
		} else {
			$('.nav-item-down').css({'display': 'none' });
			// console.log('drop not active');
		}
	})

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
				gsap.fromTo('.menu-title', {opacity: 1, y: 0}, {opacity: 0, y: -10})
				console.log('check')
			} else {
				$(this).attr('value', 'false');
				tl.to('.nav-body', { display: 'none' });
				gsap.to('.nav-circle-body', 1, { scale: 1, opacity: 0, delay: 0.5 })
				gsap.fromTo('.nav-body__item a', 0.5, { display: 'block', opacity: 1, y: 0 }, { display: 'none', opacity: 0, y: 50 })
				gsap.fromTo('.nav-body__item .product-list', 0.5, { display: 'block', opacity: 1, y: 0 }, { display: 'none', opacity: 0, y: 50 })
				gsap.fromTo('.menu-title', {opacity: 0, y: -10}, {opacity: 1, y: 0})
				console.log('uncheck')
			}
			$('input.More-checkbox').text($('#burger').val());
		});
	})
	// END NAV MENU
});
