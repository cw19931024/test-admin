angular.module('index_area').config(config).controller('MarketListCtrl', MarketListCtrl);
config.$inject = ['$stateProvider'];
function config($stateProvider) {
    $stateProvider
        .state("task", {
            url: "/market/task",
            templateUrl: "Market/task.html",
            controller: 'taskCtrl as taskCtrl'
        })
}
MarketListCtrl.$inject = ['$scope', '$rootScope', '$state', 'PublicResource', "$stateParams", 'NgTableParams', 'MarketResource'];
function MarketListCtrl($scope, $rootScope, $state, PublicResource, $stateParams, NgTableParams, MarketResource) {
    document.title = "运营活动列表";
    $rootScope.name = "运营管理"
    $rootScope.childrenName = "运营活动列表"
    var vm = this;
    vm.idClass = false;
    vm.seid;
    login();
    list();
    function login() {
        vm.user = PublicResource.seid("admin");
        if (typeof (vm.user) == "undefined") {
            layer.alert("尚未登录！", {
                icon: 2
            }, function (index) {
                layer.close(index);
                PublicResource.Urllogin();
            });
        } else {
            vm.seid = PublicResource.seid(vm.user);
        }
    }
    function list() {
        MarketResource.list(vm.seid, 0, 0).then(function (data) {
            console.log(data.data.result)
            vm.list = data.data.result;
            for (var i in vm.list) {
                vm.list[i].startTime = chang_time(new Date(vm.list[i].startTime));
                if (vm.list[i].endTime != null) {
                    vm.list[i].endTime = chang_time(new Date(vm.list[i].endTime));
                }
            }
            vm.markList = new NgTableParams({}, { dataset: vm.list });
        })
    }

    vm.TypeBtn = function (data) {
        vm.task.productType = data;

    }

    function chang_time(date) {
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' '; //天
        var h = date.getHours() + ':'; //时
        var m = date.getMinutes() + ':'; //分
        var s = date.getSeconds();
        console.log(h.length);
        if (D.length < 3) {
            D = "0" + D;
        }
        console.log(D.length + ',' + D);
        if (m.length < 3) {
            m = "0" + m;
        }

        if (s < 9) {
            s = "0" + s;
        }
        return Y + M + D;
    }

}