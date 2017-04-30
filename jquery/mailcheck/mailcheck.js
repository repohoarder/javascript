$(document).on('keyup', 'input[name*=mail]', function(e) {

	var 
		inpval = $(this).val(),
		atspot = inpval.indexOf('@'),
		pspot  = inpval.lastIndexOf('.'),
		$input = $(this),
		dom    = inpval.substring(atspot + 1),
		tld    = dom.substring(dom.indexOf('.') + 1),
		secondLevelDomains = [
			'gmail',
			'yahoo',
			'hotmail',
			'aol',
			'comcast',
			'sbcglobal',
			'msn',
			'verizon',
			'cox',
			'live',
			'icloud',
			'bellsouth',
			'att',
			'ymail',
			'optonline',
			//'me',
			'outlook',
			'earthlink',
			//'aim',
			'charter',
			'rocketmail',
			//'mac',
			'mail'
		],
		topLevelDomains = [
			'com',
			'net',
			'org',
			'rr.com',
			'edu',
			'co.uk',
			'ca',
			'us',
			'fr',
			'de'
		],
		domains = [
			'gmail.com',
			'yahoo.com',
			'hotmail.com',
			'aol.com',
			'comcast.net',
			'sbcglobal.net',
			'msn.com',
			'verizon.net',
			'cox.net',
			'live.com',
			'icloud.com',
			'bellsouth.net',
			'ymail.com',
			'att.net',
			'optonline.net',
			//'me.com',
			'outlook.com',
			'earthlink.net',
			'aim.com',
			'charter.net',
			'rocketmail.com',
			//'qq.com',
			'mac.com',
			'hotmail.co.uk',
			'yahoo.co.uk'
		];

	$('.autofixemail').remove();

	if (atspot < 1 || pspot < atspot || (tld.length < 3 && dom != 'gmail.co') || $(this).hasClass('emailconfirmed')) {

		return;

	}

	$(this).mailcheck({
		
		domains: domains,                       // optional
		secondLevelDomains: secondLevelDomains, // optional
		topLevelDomains: topLevelDomains,       // optional
		//distanceFunction: superStringDistance,  // optional
		suggested: function($element, suggestion) {

			var 
				fsize   = $element.css('font-size'),
				height  = $element.outerHeight(),
				width   = $element.outerWidth(),
				top     = $element.offset().top,
				left    = $element.offset().left,
				$fixdiv = $('<div/>', {
					'class': 'autofixemail',
					'css': {
						'font-size' : fsize*0.8+'px',
						//'height': height*0.8+'px',
						'width': width,
						'top': top + height,
						'left': left,
					}
				}),
				$confirm = $('<div/>', {
					'class': 'autofixconfirm',
					'click': function(e){
						e.preventDefault();
						$element.val(suggestion.full);
						$element.addClass('emailconfirmed');
						$fixdiv.remove();
					}
				}),
				$close = $('<span/>', {
					'class': 'autofixclose',
					'click': function(e){
						e.preventDefault();
						$element.addClass('emailconfirmed');
						$fixdiv.remove();
					}
				});

			$close.text('x').appendTo($fixdiv);

			$confirm.html('Did you mean: <span>'+suggestion.full+'</span>').appendTo($fixdiv);
			$fixdiv.appendTo('body');

		},
		empty: function(element) {

			//$(this).addClass('emailconfirmed');
		
		}

	});

});


$(document).click(function(e) { 

    if( ! $(e.target).closest('.autofixemail').length && ! $(e.target).is('.autofixemail')) {

        $('.autofixemail').remove();
    }

});