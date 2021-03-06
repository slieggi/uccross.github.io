angular.module('app', [])
    .controller('gitHubDataController', ['$scope', '$http', function($scope, $http) {
        $scope.reposLoaded = false;
        $scope.userLoaded = false;
        $scope.username = "llnl";

        var getRepoInfo = function() {
            return $http.get("./explore/github-data/labReposInfo.json", {
                    cache: true
                })
                .then(function (res) {
                    return res.data;
                });
        }

        var getRepoLangs = function() {
            return $http.get("./explore/github-data/labRepos_Languages.json", {
                    cache: true
                })
                .then(function (res) {
                    return res.data;
                });
        }

        function sortByKey(array, key) {
            return array.sort(function(a, b) {
                var x = a[key].toLowerCase(); var y = b[key].toLowerCase();
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
        }

        var myDataPromise = getRepoInfo();
        myDataPromise.then( function(reposObj) {
            $scope.repos = Object.keys(reposObj.data);
            $scope.repoData = [];
            angular.forEach($scope.repos, function(value, key) {
                var data = reposObj["data"][value];
                if (data.primaryLanguage == null) {
                    data.primaryLanguage = {"name":"-"}; // Substitute text in case of no language
                }
                $scope.repoData.push(data);
                console.log(data);
            });
            $scope.repoData = sortByKey($scope.repoData,"name")
        });

        $scope.predicate = '-stargazers.totalCount';

    }]);
