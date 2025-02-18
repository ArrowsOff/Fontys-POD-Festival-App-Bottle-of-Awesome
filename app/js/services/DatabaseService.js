app.service('DatabaseService', function($rootScope, $log, pouchDB) {
    var DatabaseService = this;

    var database = pouchDB('LocalDatabase');

    var favourites = {};

    // Post artists to database
    DatabaseService.post = function(doc) {
        $log.log("Posting Artists to database");

        doc._id = 'artists';

        database.put(doc).then(function() {
            window.localStorage.artists = doc._id;
        }).catch(function(err){
            $log.error("Error posting artists to database:", err);
        });
    };

    // Post artists to database
    DatabaseService.postAreas = function(doc) {
        $log.log("Posting areas to database");

        doc._id = 'areas';

        database.put(doc).then(function() {
            window.localStorage.areas = doc._id;
        }).catch(function(err){
            $log.error("Error posting areas to database:", err);
        });
    };

    // Use this to favorite an ID
    DatabaseService.favorite = function(id) {
        if(!window.localStorage.favourites) {
            var favouritesObject = {
                _id :'favourites',
                artists: [id]
            };

            database.put(favouritesObject).then(function() {
                $rootScope.$broadcast("favourited");
                $log.log(id, 'broadcast favourited');
                window.localStorage.favourites = favouritesObject._id;
            });
        } else {
            database.get(window.localStorage.favourites).then(function(doc) {
                if(doc.artists.indexOf(id) == -1) {
                    doc.artists.push(id);
                    $log.log(id, 'favourited');
                } else {
                    doc.artists.splice(doc.artists.indexOf(id));
                    $log.log(id, 'unfavourited');
                }

                database.put(doc).then(function(res) {
                    $log.log(id, 'broadcast favourited');
                    $rootScope.$broadcast("favourited");
                }).catch(function(err){
                    $log.error(err);
                });
            });
        }
    };

    // Get the artists database
    DatabaseService.get = function(id) {
        return database.get(id);
    };

    return DatabaseService;
});
