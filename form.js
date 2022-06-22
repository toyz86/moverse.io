$(document).ready(function() {
	$("#nav-placeholder").load("component/nav.html");
  $('.modal').modal();
	$('.spinner-layer').addClass('d-none');
	$('.datepicker').datepicker( {
		container: 'body',
		format: 'mm/dd/yyyy'
	});
	$('.timepicker').timepicker();

	M.AutoInit();
	var DateField = MaterialDateTimePicker.create($('#datetime'))	


	$('input[name=duration]').click(function() {
		if(!$("input#other_option").is(':checked')) { 
				$('.other input').css({'display': 'none'});
				console.log('checked')
			} else {
				$('.other input').css({'display': 'block'})
				console.log('uncheceked')
			}
	})
	$('.datetime').hide();
	$('input[name=duration]').click(function() {
		if(!$("input#oneday").is(':checked')) { 
				$('.datetime').hide();
				console.log('checked')
			} else {
				$('.datetime').show();
				console.log('uncheceked')
			}
	})

	$(".hero .list").eq(0).nextAll().hide();
	$(".work_step").click(function(e){
		$(".work_step").removeClass('stepActive');
		$(this).addClass('stepActive');
		let index = $(this).index();
		$(".hero .list").eq(index).fadeIn(500).show().siblings().hide();
		console.log('image', index);
	});  
})
