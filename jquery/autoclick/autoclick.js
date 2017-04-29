$(document).ready(function(){

	// autoclick functionality
	var autoclick 	= {
		id: 	false,
		init: 	function(){
			
			var queryString 	= window.location.search;

		    // split into key/value pairs
		    queries 			= queryString.split("&");

		    // Convert the array of strings into an object
		    for ( i = 0, l = queries.length; i < l; i++ ) {
		        temp 		= queries[i].split('=');
				var param 	= temp[0].replace('?','');
		    	if (param == 'aclick'){
		    		autoclick.id 	= temp[1];
		    	}
		    }

		    // see if we have an element to click
		    if (autoclick.id && $("#" + autoclick.id).length){
		    	$("#" + autoclick.id).click();
		    }

		}
	};

	// init autoclick
	autoclick.init();

});