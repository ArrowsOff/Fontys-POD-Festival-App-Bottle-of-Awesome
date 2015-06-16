app.controller('ArtistCtrl', function($scope, $rootScope, $stateParams, $log, $sce, ArtistService, SpotifyService) {
	$scope.spotify = false;

	// Configure Spotify url
	this.config = {
		sources: [{src: $sce.trustAsResourceUrl($scope.url), type: "audio/mpeg"}]
	};

	angular.forEach($rootScope.artists.artist, function(data) {	
		if($stateParams.id == data._id) {
			$scope.artist = data;

			// Get Spotify information
			SpotifyService.get(data.name.__cdata).then(function(res) {
				$scope.spotify = true;
				$scope.url = res.preview_url;
				$scope.track = res.name;
				$scope.artistUrl = res.artists[0].external_urls.spotify;
			});
		}
	});

	// Makes it possible to load links in browser outside of the app
	$scope.InAppBrowser = function(e) {
		e = e ||  window.event;
        var element = e.target || e.srcElement;

        if (element.tagName == 'A') {
            window.open(element.href, "_system", "location=yes");
            return false; // prevent default action and stop event propagation
        }
    };

});