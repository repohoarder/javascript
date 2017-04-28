$(document).ready(function(){

	// detect device (to know which banner to display)
	var device 		= window.matchMedia("only screen and (max-width: 768px)");
	var device 		= (device.matches)? 'phone': 'desktop';

	// initialize DFP
	googletag.cmd.push(function() {
		// define ad positions
		for (var position in DFP.banners){
			// make sure we're loading the proper device's banners
			if (DFP.banners[position]['device'] == DFP.device()){
				console.log('>> dfp initialized:',position);
				// /6075/gpttraining
				DFP.banners[position]['slot']	= googletag.defineSlot('/19565616/core', [DFP.banners[position]['width'], DFP.banners[position]['height']], position).setTargeting('adposition',position).addService(googletag.pubads());
			}
		}

		// disable initial loading of ads
		//googletag.pubads().disableInitialLoad();

		// add targeting
		googletag.pubads().setTargeting('id', 			[pageinfo.id]);
		googletag.pubads().setTargeting('site', 		[pageinfo.dfp]);
		googletag.pubads().setTargeting('device', 		[dataLayer[0]['device']]);
		googletag.pubads().setTargeting('vertical', 	[dataLayer[0]['vertical']]);
		googletag.pubads().setTargeting('page_type', 	[dataLayer[0]['type']]);
		googletag.pubads().setTargeting('subcategory', 	[dataLayer[0]['subcategory']]);
		googletag.pubads().setTargeting('sport', 		[dataLayer[0]['sport']]);
		googletag.pubads().setTargeting('utm', 			pageinfo.utm);

		// only add these targeting variables if they are define
		if (typeof pageinfo.taxonomy.category !== 'undefined'){
			googletag.pubads().setTargeting('category', 	pageinfo.taxonomy.category);
		}
		if (typeof pageinfo.taxonomy.post_tag !== 'undefined'){
			googletag.pubads().setTargeting('tag', 			pageinfo.taxonomy.post_tag);
		}

		// add ability to track is iOS or Android device is being used (specifically, for AOL mobile campaigns)
		var ua = navigator.userAgent.toLowerCase();
		if (/ipad|iphone|ipod/i.test(ua)){
			googletag.pubads().setTargeting('device_type', 		['ios']);
		} else if(/android/i.test(ua)) {
			googletag.pubads().setTargeting('device_type', 		['android']);
		}

		// enable DFP banner
		googletag.enableServices();
		
	});

	// initialize banner display positions
	for (var position in DFP.banners){
		if (DFP.banners[position]['device'] == DFP.device()){
			googletag.cmd.push(function() {
				googletag.display(position);
			});
		}
	}

	// load ads in viewport, on page load
	//DFP.viewport();

	// load ads in viewport, on scroll
	//$(window).scroll(function(event){
	//	DFP.viewport();
	//});

});



function refreshAds() 
{
	if (typeof googletag !== 'undefined' && typeof pageinfo.type !== 'undefined' && pageinfo.type == 'marketing'){

		// refresh all ads
		googletag.pubads().refresh();

	}
}
