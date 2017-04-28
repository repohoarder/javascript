var jwplayers = [];

$('.jw-vidya').each(function(){

	var 
		count = jwplayers.length,
		id    = 'jw-player-'+(count + 1),
		video = $(this).data('jw-media-id');

	$(this).attr('id', id);

	jwplayers[count] = jwplayer(id);

	jwplayers[count].setup({
		repeat: true,
		advertising: 	{
			client: 	'googima',
			tag: 		"https://pubads.g.doubleclick.net/gampad/ads?sz=400x300&iu=/19565616/STACK.DFP.Preroll&impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&url=[referrer_url]&description_url=[description_url]&correlator=[timestamp]",
			autoplayadsmuted: true,
			autostart: true
		},
		playlist: 		[{
			mediaid: $(this).data('jw-media-id'),
			image:   '//content.jwplatform.com/thumbs/'+video+'.jpg',
			sources: [
				{
					"file": '//content.jwplatform.com/manifests/'+video+'.m3u8' // HLS streaming
				},
				{
					"file": '//content.jwplatform.com/videos/'+video+'-8yASE82j.mp4' // 640px mp4
				},
				{
					"file": '//content.jwplatform.com/videos/'+video+'-4JQCG1aU.mp4', //320px mp4
					'image': '//content.jwplatform.com/thumbs/'+video+'-320.jpg'
				}
			]
		}]
	});

	// media playback events
	jwplayers[count].on('play',function(e){
		console.log('>> play',id,e);
	});
	jwplayers[count].on('pause',function(e){
		console.log('>> pause',id,e);
	});
	jwplayers[count].on('buffer',function(e){
		console.log('>> buffer',id,e);
	});
	jwplayers[count].on('idle',function(e){
		console.log('>> idle',id,e);
	});
	jwplayers[count].on('complete',function(e){
		console.log('>> complete',id,e);
	});
	jwplayers[count].on('error',function(e){
		console.log('>> error',id,e);
	});

	// advertising events
	jwplayers[count].on('adError',function(e){
		alert(id+' ad error: ' + e.message);
	});
	jwplayers[count].on('adClick',function(e){
		alert('player: ' + id + ' - ' + e.creativetype);
	});
	jwplayers[count].on('adComplete',function(e){
		console.log('>> ad complete',id,e.creativetype)
	});
	jwplayers[count].on('adRequest',function(e){
		console.log('>> ad request',id,e.tag);
	});
	jwplayers[count].on('adPlay',function(e){
		console.log('>> ad play',id,e.tag);
	});
	jwplayers[count].on('adImpression',function(e){
		console.log('>> ad impression',id,e.adtitle);
	});

	// metadata
	jwplayers[count].on('meta',function(e){
		console.log('>> metadata',id,e);
	});


});



$('.jw-thumb').each(function(){

	var 
		target = '1',
		video  = $(this).data('jw-media-id');

	if ($(this).attr('data-jw-player-target') !== 'undefined'){

		target = $(this).data('jw-player-target');

	}

	target = parseInt(target) - 1;

	$(this).click(function(){

		var playlist = [{
			mediaid: video,
			image:   '//content.jwplatform.com/thumbs/'+video+'.jpg',
			sources: [
				{
					"file": '//content.jwplatform.com/manifests/'+video+'.m3u8' // HLS streaming
				},
				{
					"file": '//content.jwplatform.com/videos/'+video+'-8yASE82j.mp4' // 640px mp4
				},
				{
					"file": '//content.jwplatform.com/videos/'+video+'-4JQCG1aU.mp4', //320px mp4
					'image': '//content.jwplatform.com/thumbs/'+video+'-320.jpg'
				}
			]
		}];

		jwplayers[target].load(playlist);

	});

});