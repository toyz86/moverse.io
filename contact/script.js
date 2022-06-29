$(document).ready(function(){
	$('.datepicker').datepicker( {
		container: 'body',
		format: 'mm/dd/yyyy'
	});
	$('.timepicker').timepicker();

  // if ( $('[type="date"]').prop('type') != 'date' ) {
  //   $('[type="date"]').datepicker();
  // }

  // if ( $('[type="time"]').prop('type') != 'time' ) {
  //   $('[type="time"]').timepicker();
  // }

  $('input#__other_option__').css({'visibility': 'hidden'})

  $('input[name=duration]').each(function(index) {
    $(this).on('click', function() {
      console.log('click', index)
      if($('input#__other_option__').is(':checked')) {
        $('input#__other_option__').addClass('other-active').css({'visibility': 'visible'});
      } else {
        $('input#__other_option__').removeClass('other-active').css({'visibility': 'hidden'});
      }
    })
  })

  // check item of Full Set S
  $('.minus-s, .plus-s').on('click', function () {
    let suitS = $('input#suit_S');
    let fullS = $('#fullSet_S');

    let personIndex = $(this).index(),
    personThis = $(this).parent().find('input'),
    personCount = personThis.val(),
    personMax = personThis.attr('data-max'),
    personMin = personThis.attr('data-min');
    // personMin = 0;
    if (!personIndex == 0) {
      personCount = Number(1) + Number(personCount);
      if (personCount <= personMax) {
        $(this).parent().find('input').val(personCount);
        $('input[name=suit-option]#qty1').val('qty'+' '+personCount);
      }
    } else {
      personCount = Number(personCount) - Number(1);
      if (personCount >= personMin) {
        $(this).parent().find('input').val(personCount);
        $('input[name=suit-option]#qty1').val('qty'+' '+personCount);
      }
    }
    if(personCount > 0) {
      $(fullS).prop('checked', true);
      $('#full-s').attr('style', 'border: 1px solid #26a69a !important');
      console.log(personCount, 'right');
    } else {
      $(fullS).prop('checked', false);
      $('#full-s').attr('style', 'border: 1px solid #ddd !important');
      console.log(personCount, 'left');
    }

    if(personCount === 1) {
      $('#suit-s').attr({'data-max': 1})
    } else {
      $('#suit-s').attr({'data-max': 2})
    }

    if (personCount >= 2) {
      $('input#suit_S').prop('disabled', true);
      $('input#suit-s').parent('.number').addClass('disabled')
    } else {
      $('input#suit_S').prop('disabled', false)
      $('input#suit-s').parent('.number').removeClass('disabled');
    }
      // $('#input[type=text]#fullSet_S').val(personCount);
  })  

  // check item of Full Set M
  $('.minus-m, .plus-m').on('click', function () {
    let suitM = $('input#suit_M');
    let fullM = $('input#fullSet_M');
			
    let personIndex = $(this).index(),
    personThis = $(this).parent().find('input'),
    personCount = personThis.val(),
    personMax = personThis.attr('data-max'),
    // personMin = personThis.attr('data-min');
    personMin = 0;
    if (!personIndex == 0) {
      personCount = Number(1) + Number(personCount);
      if (personCount <= personMax) {
        $(this).parent().find('input').val(personCount);
        $('input[name=suit-option]#qty2').val('qty'+' '+personCount);
      }
    } else {
      personCount = Number(personCount) - Number(1);
      if (personCount >= personMin) {
        $(this).parent().find('input').val(personCount);
        $('input[name=suit-option]#qty2').val('qty'+' '+personCount);
      }
    }
    if(personCount > 0) {
      $(fullM).prop('checked', true);
      $('#full-m').attr('style', 'border: 1px solid #26a69a !important');
      console.log('check S');
    } else {
      $(fullM).prop('checked', false);
      $('#full-m').attr('style', 'border: 1px solid #ddd !important');
    }

    if(personCount === 1) {
      $('#suit-m').attr({'data-max': 1})
      console.log('satu');
    } else {
      $('#suit-m').attr({'data-max': 2})
    }

    if (personCount >= 2) {
      $(suitM).prop('disabled', true);
      $('input#suit-m').parent('.number').addClass('disabled')
    } else {
      $(suitM).prop('disabled', false)
      $('input#suit-m').parent('.number').removeClass('disabled');
    }
  })    

  // check item of Suit S
  $('.minus_suitS, .plus_suitS').on('click', function () {
    let suitS = $('input#suit_S');
    let fullS = $('input#fullSet_S');
			
    let personIndex = $(this).index(),
    personThis = $(this).parent().find('input'),
    personCount = personThis.val(),
    personMax = personThis.attr('data-max'),
    // personMin = personThis.attr('data-min');
    personMin = 0;
    if (!personIndex == 0) {
      personCount = Number(1) + Number(personCount);
      if (personCount <= personMax) {
        $(this).parent().find('input').val(personCount);
        $('input[name=suit-option]#qty3').val('qty'+' '+personCount);
      }
    } else {
      personCount = Number(personCount) - Number(1);
      if (personCount >= personMin) {
        $(this).parent().find('input').val(personCount);
        $('input[name=suit-option]#qty3').val('qty'+' '+personCount);
      }
    }
    if(personCount > 0) {
      $(suitS).prop('checked', true);
      $('#suit-s').attr('style', 'border: 1px solid #26a69a !important');
      console.log('check S');
    } else {
      $(suitS).prop('checked', false);
      $('#suit-s').attr('style', 'border: 1px solid #ddd !important');
    }

    if(personCount === 1) {
      $('#full-s').attr({'data-max': 1});
      console.log('satu');
    } else {
      $('#full-s').attr({'data-max': 2})
    }

    if (personCount >= 2) {
      $(fullS).prop('disabled', true);
      $('input#full-s').parent('.number').addClass('disabled')
    } else {
      $(fullS).prop('disabled', false)
      $('input#full-s').parent('.number').removeClass('disabled');
    }
  })

   // check item of Suit M
  $('.minus_suitM, .plus_suitM').on('click', function () {
    let suitM = $('input#suit_M');
    let fullM = $('input#fullSet_M');
			
    let personIndex = $(this).index(),
    personThis = $(this).parent().find('input'),
    personCount = personThis.val(),
    personMax = personThis.attr('data-max'),
    // personMin = personThis.attr('data-min');
    personMin = 0;
    if (!personIndex == 0) {
      personCount = Number(1) + Number(personCount);
      if (personCount <= personMax) {
        $(this).parent().find('input').val(personCount);
        $('input[name=suit-option]#qty4').val('qty'+' '+personCount);
      }
    } else {
      personCount = Number(personCount) - Number(1);
      if (personCount >= personMin) {
        $(this).parent().find('input').val(personCount);
        $('input[name=suit-option]#qty4').val('qty'+' '+personCount);
      }
    }
    if(personCount > 0) {
      $(suitM).prop('checked', true);
      $('#suit-m').attr('style', 'border: 1px solid #26a69a !important');
    } else {
      $(suitM).prop('checked', false);
      $('#suit-m').attr('style', 'border: 1px solid #ddd !important');
    }

    if(personCount === 1) {
      $('#full-m').attr({'data-max': 1})
      console.log('satu');
    } else {
      $('#full-m').attr({'data-max': 2})
    }

    if (personCount >= 2) {
      $(fullM).prop('disabled', true);
      $('input#full-m').parent('.number').addClass('disabled');
    } else {
      $(fullM).prop('disabled', false)
      $('input#full-m').parent('.number').removeClass('disabled');
    }
  }) 

   // check item of Suit L
   $('.minus_suitL, .plus_suitL').on('click', function () {
    let suitL = $('input#suit_L');
    let fullL = $('input#fullSet_L');
			
    let personIndex = $(this).index(),
    personThis = $(this).parent().find('input'),
    personCount = personThis.val(),
    personMax = personThis.attr('data-max'),
    // personMin = personThis.attr('data-min');
    personMin = 0;
    console.log(personCount)
    if (!personIndex == 0) {
      personCount = Number(1) + Number(personCount);
      if (personCount <= personMax) {
        $(this).parent().find('input').val(personCount);
        $('input[name=suit-option]#qty5').val('qty'+' '+personCount);
      }
    } else {
      personCount = Number(personCount) - Number(1);
      if (personCount >= personMin) {
        $(this).parent().find('input').val(personCount);
        $('input[name=suit-option]#qty5').val('qty'+' '+personCount);
      }
    }
    if(personCount >= 1) {
      $(suitL).prop('checked', true);
      $('#suit-l').attr('style', 'border: 1px solid #26a69a !important');
    } else {
      $(suitL).prop('checked', false);
      $('#suit-l').attr('style', 'border: 1px solid #ddd !important');
    }
  })   

   // check item of Face Capture
   $('.minus_face, .plus_face').on('click', function () {
    let faceCap = $('input#faceCap');
			
    let personIndex = $(this).index(),
    personThis = $(this).parent().find('input'),
    personCount = personThis.val(),
    personMax = personThis.attr('data-max'),
    personMin = personThis.attr('data-min');
    console.log(personCount)
    if (!personIndex == 0) {
      personCount = Number(1) + Number(personCount);
      if (personCount <= personMax) {
        $(this).parent().find('input').val(personCount);
        $('input[name=suit-option]#qty6').val('qty'+' '+personCount);
      }
    } else {
      personCount = Number(personCount) - Number(1);
      if (personCount >= personMin) {
        $(this).parent().find('input').val(personCount);
        $('input[name=suit-option]#qty6').val('qty'+' '+personCount);
      }
    }
    if(personCount >= 1) {
      $(faceCap).prop('checked', true);
      $('#face_capture').attr('style', 'border: 1px solid #26a69a !important');
    } else {
      $(faceCap).prop('checked', false);
      $('#face_capture').attr('style', 'border: 1px solid #ddd !important');
    }
  })     
});
