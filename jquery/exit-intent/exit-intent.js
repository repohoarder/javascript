$(document).ready(function(){
	var previous_position 	= 1;


	if ($("#exit-pop").length){

		// code to fire exit pop
		$(document).mousemove(function(e) {
			if (e.clientY < 10 && previous_position > e.clientY){

				$('.modal:not(#exit-pop)').modal('hide');

				if ( ! $("#exit-pop").hasClass('in')){
					$("#exit-pop").modal('show');
				}
				

			}
			previous_position 	= e.clientY;
		});

	}
});