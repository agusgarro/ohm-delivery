angular
	.module('ohm-delivery', [])
	.controller('tracking', function($scope, $http) {
		const NOT_FOUND = (status, id) => (status === 404) ? `Sorry, the tracking ID #${id} was not found.` : ERROR();
		const ERROR = () => 'Oops, this website is under construction, please come back later.';
		$scope.formData = {};
		$scope.get = function() {
			if (this.trackingId) {
			        $http.get(`/ohms/${this.trackingId}`)
					.then((result) => {
						$scope.result = result.data;
						$scope.formData = {};
						$scope.errorMessage = '';
					}, (error) => {
						$scope.result = null;
						$scope.errorMessage = NOT_FOUND(error.status, this.trackingId);
					});
			} else {
				
				$scope.errorMessage = 'Please choose a tracking ID.';
			}
		};
            
           
    
    $scope.updateStatus = function(statusCode) {
        if (this.trackingId) {
            $http.put(`/ohms/${this.trackingId}/status`, {
                code: statusCode,
                
            }).then((result) => {
                $scope.result = result.data;
                $scope.errorMessage = '';
            }, (error) => {
                $scope.result = null;
                $scope.errorMessage = NOT_FOUND(error.status, $scope.trackingId);
            });
        }
    };


 });



    