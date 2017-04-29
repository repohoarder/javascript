app.controller('MessengerController', ['$scope', '$http', function($scope,$http) {
	
	$scope.messages 	= [];

	// get messages
	$http.get('assets/json/messages.json').success(function(messages){
		$scope.messages 	= messages;
	});


	$scope.addMessage 	= function()
	{
		// if we have a valid message, lets add it
		if (typeof $scope.form != 'undefined'){

			// add new message
			$http.get('add.php?msg=' + $scope.form.text).success(function(data){
				
				console.log(data);

				if (data.msg) {

					// generate new message
					msg 	= {
						avatar: 	data.avatar,
						msg: 		data.msg,
						from: 		data.from,
						to: 		data.to
					};

					// add msg to js array
					$scope.messages.push(msg);

					// clear input for next message
					$scope.form.text 	= "";
			
				} else {

					// TODO: update error
					alert('message insert failed.  please try again.');
				}
			});

		} else {

			// TODO: update error
			alert('you must first type a message.');

		}

	}
	$scope.totalMessages 	= function()
	{
		return $scope.messages.length;
	}
	$scope.clearMessages 	= function()
	{
		// remove messages from file
		$http.get('clear.php');

		// clear our js array
		$scope.messages 	= [];
	}

}]);