$(document).ready(function(){

	// look for local storage browser support
	if (typeof Storage !== 'undefined')
	{
		// iterate all elements we want to save
		$('.autosave').each(function(){

			// initialize variables
			var name 	= $(this).attr('name');

			// see if we have a saved value for this input
			if (typeof localStorage.getItem(name) !== 'undefined')
			{
				// set saved value
				$(this).val(localStorage.getItem(name));
			}

		});
	
		// save data every 30 seconds
		setInterval(function(){save()},5000);
	}

});

function save()
{
	// iterate elements we want to save
	$('.autosave').each(function(){

		// initialize variables
		var name 	= $(this).attr('name');
		var value 	= $(this).val();

		// save to browser
		localStorage.setItem(name,value);

	});
}

function clear()
{
	// iterate saved elements
	$('.autosave').each(function(){

		// initialize variables
		var name 	= $(this).attr('name');

		// save to browser
		localStorage.removeItem(name);

	});
}