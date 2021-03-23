angular
    .module("ohm-delivery", [])
    .controller("tracking", function($scope, $http) {
        const NOT_FOUND = (status, id) => (status === 404) ? `Sorry, we haven't found your tracking ID {id}.`: ERROR();
        const ERROR = () =>'Oops, this website is under construction, please come back later. ';
        $scope.formData = {};
        $scope.get = function() {
            if (this.trackingId) {
            $http.get(`/ohms/${this.trackingId}`)
            .then((result) => {
                $scope.result = result.data;
                $scope.formData = {};
                $scope.errorMessage = '';
                
            }, (err) => {
                $scope.result = null;
                $scope.errorMessage = NOT_FOUND(err.status, this.trackingId);
            });
        } else {
            $scope.errorMessage = 'Select a tracking ID.';
        }
    }
        });