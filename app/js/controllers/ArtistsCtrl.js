app.controller('ArtistsCtrl', function($scope, $rootScope, $log, ArtistService, DatabaseService, AreaService) {

	// Preselect radio button - Area menu
	$scope.stage = '';

	$scope.clear = function() {
		DatabaseService.remove();
	};

	AreaService.getAreas().then(function(data) {
        $scope.stages = data.stage;
    }).catch(function(err) {
        $log.error("Error getting areas:", err);
    });

	// Swiping through stages
	$scope.swipeLeft = function() {
		switch ($scope.stage) {
	    case "":
					$scope.stage = "aab3238922bcc25a6f606eb525ffdc56";
	        break;
	    case "aab3238922bcc25a6f606eb525ffdc56":
					$scope.stage = "9bf31c7ff062936a96d3c8bd1f8f2ff3";
	        break;
	    case "9bf31c7ff062936a96d3c8bd1f8f2ff3":
					$scope.stage = "8e296a067a37563370ded05f5a3bf3ec";
	        break;
	    case "8e296a067a37563370ded05f5a3bf3ec":
					$scope.stage = "70efdf2ec9b086079795c442636b55fb";
	        break;
	    case "70efdf2ec9b086079795c442636b55fb":
					$scope.stage = "c74d97b01eae257e44aa9d5bade97baf";
	        break;
	    case "c74d97b01eae257e44aa9d5bade97baf":
					$scope.stage = "1f0e3dad99908345f7439f8ffabdffc4";
	        break;
	    case "1f0e3dad99908345f7439f8ffabdffc4":
					$scope.stage = "33e75ff09dd601bbe69f351039152189";
	        break;
			}
	};

	$scope.swipeRight = function() {
		switch ($scope.stage) {
			case "33e75ff09dd601bbe69f351039152189":
					$scope.stage = "1f0e3dad99908345f7439f8ffabdffc4";
					break;
			case "1f0e3dad99908345f7439f8ffabdffc4":
					$scope.stage = "c74d97b01eae257e44aa9d5bade97baf";
					break;
			case "c74d97b01eae257e44aa9d5bade97baf":
					$scope.stage = "70efdf2ec9b086079795c442636b55fb";
					break;
			case "70efdf2ec9b086079795c442636b55fb":
					$scope.stage = "8e296a067a37563370ded05f5a3bf3ec";
					break;
			case "8e296a067a37563370ded05f5a3bf3ec":
					$scope.stage = "9bf31c7ff062936a96d3c8bd1f8f2ff3";
					break;
			case "9bf31c7ff062936a96d3c8bd1f8f2ff3":
					$scope.stage = "aab3238922bcc25a6f606eb525ffdc56";
					break;
			case "aab3238922bcc25a6f606eb525ffdc56":
					$scope.stage = "";
					break;
			}
	};


});
