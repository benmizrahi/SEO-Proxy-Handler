(function(angular) {

    angular.module('TestApp',[]).
        controller('main',($scope,$rootScope,$timeout)=>{
                
                $rootScope.sitetitle = "Hello SEO";
                $scope.status = "Success!";
                $scope.click = function() {
                   alert('I"m OK!');
                }

        });
})(angular);