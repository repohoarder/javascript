

var 
	banners  = [],
	is_phone = window.matchMedia("only screen and (max-width: 768px)"),
	abbrev   = (is_phone.matches && ! $('body').hasClass('disable-mobile') && pageinfo.type != 'marketing' ? 'M' : 'D'),
	adcats   = (typeof pageinfo.taxonomy.category 	!== 'undefined') ? pageinfo.taxonomy.category : [],
	adtags   = (typeof pageinfo.taxonomy.post_tag 	!== 'undefined') ? pageinfo.taxonomy.post_tag : [],
	adslug   = (typeof pageinfo.slug 				!== 'undefined') ? pageinfo.slug.replace('subsite','') : '',
	advert   = (typeof pageinfo.subtheme			!== 'undefined') ? pageinfo.subtheme + 'vertical' : '',
	adqry    = '',
	oas_tag  = oas_tag || {};

if (typeof adcats === 'string'){
	adcats = [adcats];
}

if (typeof adtags === 'string'){
	adtags = [adtags];
}

if (typeof pageinfo.type !== 'undefined' && pageinfo.type != ''){
	adcats.push(pageinfo.type);
}

adqry 	= adtags.concat(adcats).join('section&').replace(/-/g, '');
adqry 	= (adqry !== '') ? adqry+'section' : '';

if (adslug){
	adqry 	= (adqry !== '') ? adqry + '&' + adslug : adslug;
}

if (advert){
	adqry 	= (adqry !== '') ? adqry + '&' + advert : advert;
}

// custom keyword for marketing pages
if (typeof pageinfo.type !== 'undefined' && pageinfo.type == 'marketing'){

	//adqry 	= (adqry !== '') ? adqry + '&' + 'videonetwork' : 'videonetwork';
}

// custom keyword for mobile device (iOS and Android specifically)
var ua = navigator.userAgent.toLowerCase();
if (/ipad|iphone|ipod/i.test(ua)){
	adqry 	= (adqry !== '') ? adqry + '&' + 'iosdevice' : 'iosdevice';
}
if (/android/i.test(ua)){
	adqry 	= (adqry !== '') ? adqry + '&' + 'androiddevice' : 'androiddevice';
}

// custom keyword for UTM
if (typeof pageinfo.utm !== 'undefined')
{
	utm   	= pageinfo.utm.join(',');
	adqry 	= (adqry !== '') ? adqry + '&' + utm : utm;
}

// custom keyword for OAS
if (typeof pageinfo.oascustomkwd !== 'undefined')
{
	customkwds 	= pageinfo.oascustomkwd.replace(/,/g,'&');
	adqry 		= (adqry !== '') ? adqry + '&' + customkwds : customkwds;
}

$('[data-oas-'+abbrev.toLowerCase()+']').each(function(){

	banners[$(this).data('oas'+abbrev)] = {width: $(this).data('oasW'), height: $(this).data('oasH')};

});


/////////////////////////////////////////
// interstitial hack
// see if we need to fire an interstitial
if (typeof pageinfo.interstitial != 'undefined' && pageinfo.interstitial){

	// fire interstitial if exists
	if ($("#interstitial").length){

		// add new banner ad unit
		banners['x75'] 	= {width:300,height:250};

		// fire interstitial
		$("#interstitial").modal('show');

	}
}
/////////////////////////////////////////


oas_tag.url 		= 'oascentral.stackmag.com';//'oasc17.247realmedia.com';//'delivery.uat.247realmedia.com';
oas_tag.sizes 		= function() {
	
	for (banner in banners){

		oas_tag.definePos(banner, [banners[banner].width, banners[banner].height]);

	}

};

oas_tag.query 		= adqry;	// set keywords to target, comma-delimited (category or tag)
oas_tag.analytics 	= true;					// collect taxonomy and referral data
oas_tag.taxonomy 	= ''; 			// taxonomy, comma-delimited -- currently not being used
oas_tag.site_page	= pageinfo.oasurl;
//oas_tag.site_page	= pageinfo.dfp || 'www.stack.com';
oas_tag.version 	= '1';
oas_tag.loadAd 		= oas_tag.loadAd || function() {};

show_banners();

for (banner in banners){

	oas_tag.loadAd(banner);

}



function show_banners()
{
	var oas 		= document.createElement('script');
	protocol 		= 'https:' == document.location.protocol ? 'https://': 'http://',
	node 			= document.getElementsByTagName('script')[0];

	oas.type 		= 'text/javascript';
	oas.async 		= true;
	oas.src 		= protocol + oas_tag.url + '/om/' + oas_tag.version + '.js';

	node.parentNode.insertBefore(oas,node);
}

function refreshAds() 
{
	if (typeof oas_tag.reloadAds != 'undefined' && typeof pageinfo.type !== 'undefined' && pageinfo.type == 'marketing'){

		// refresh all ads
		oas_tag.reloadAds();

		/*
		// iterate all banners on page
		var refresher 	= [];
		for (banner in banners){
			// see if this banner is in the viewport
			$('#oas_' + banner + ":in-viewport(0)").each(function(){
				refresher.push(banner);
			});
		}
		// refresh banner ads
		oas_tag.reloadAds(refresher);
		console.log('>> refreshed ads',refresher);
		*/
	}
}


