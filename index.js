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
			$('.logo-header').fadeIn();
		} else {
			$('.logo-header').fadeOut();
		}
	});
	
	$("#headerMenu").load("component/nav.html");
	// BEGIN NAV MENU
	$('.nav-body__item a').css({'display': 'none'})
	$('.nav-body__item .product-list').css({'display': 'none'})
	$('.logo-header').css({'display': 'none'})
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
		const tl = gsap.timeline({ 
			// defaults: { ease: "power1.in" }, 
		})

		$('input.More-checkbox').text($('#burger').val());

		$("#burger").on('change', function() {
			if ($(this).is(':checked')) {
				$(this).attr('value', 'true');
				gsap.to('.nav-circle-body', 1, { scale: 200, opacity: 1, delay: 0.3})
				gsap.fromTo('.nav-body__item a', 0.5, { display: 'none', opacity: 0, y:50 }, { display: 'block', opacity: 1, y: 0, delay: '0.5' })
				gsap.fromTo('.nav-body__item .product-list', 0.5, { display: 'none', opacity: 0, y:50 }, { display: 'block', opacity: 1, y: 0, delay: '0.5' })
				gsap.fromTo('.menu-title', {opacity: 1, y: 0}, {opacity: 0, y: -10})
				console.log('check')
			} else {
				$(this).attr('value', 'false');
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

  // $('.modal').modal();
	// $('.spinner-layer').addClass('d-none');
	// $('.datepicker').datepicker( {
	// 	container: 'body',
	// 	format: 'mm/dd/yyyy'
	// });

	// $('input[name=duration]').click(function() {
	// 	if(!$("input#other_option").is(':checked')) { 
	// 			$('.other input').css({'display': 'none'});
	// 			console.log('checked')
	// 		} else {
	// 			$('.other input').css({'display': 'block'})
	// 			console.log('uncheceked')
	// 		}
	// })

	// $(".hero .list").eq(0).nextAll().hide();
	// $(".work_step").click(function(e){
	// 	$(".work_step").removeClass('active');
	// 	$(this).addClass('active');
	// 	let index = $(this).index();
	// 	$(".hero .list").eq(index).fadeIn(500).show().siblings().hide();
	// 	console.log('image', index);
	// });
});
