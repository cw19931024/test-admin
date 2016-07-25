angular.module('index_area').controller('OrderlistCtrl',OrderlistCtrl);
OrderlistCtrl.$inject = ['$state','$scope','PublicResource','$stateParams','$rootScope','StoresResource','OrderResource','NgTableParams'];
/***调用接口***/
function OrderlistCtrl($state,$scope,PublicResource,$stateParams,$rootScope,StoresResource,OrderResource,NgTableParams) {
    document.title ="提现管理";
    $rootScope.name="提现管理";
	$rootScope.childrenName="提现管理列表";
    var vm = this;
    vm.skip=0;              //起始数据下标
    vm.limit=12;            //最大数据下标
    vm.pagecount=0;
    vm.pageint=5;
    vm.stores;              //门店集合
    vm.list;
    vm.get = new Object();
    vm.get.status="";
    vm.get.stores="";
    //获取页面坐标
    vm.index=$stateParams.index;        
    PublicResource.navclass(vm.index)

    //分页点击事件
    vm.pageChanged = function(){
    vm.skip = (vm.pageint-1)*12;
        vm.limit = vm.skip+12;
        list()
    }
    //获取sessionId
     login();
    function login(){
		vm.user=PublicResource.seid("admin");			
		if(typeof(vm.user)=="undefined"){
			layer.alert("尚未登录！",{icon:2},function(index){
				layer.close(index);
				PublicResource.Urllogin();
			})
		}else{
			vm.seid = PublicResource.seid(vm.user);
		}
	}


    /**
     * 初始化
     */
    initialize();
    function initialize(){
        store();
        list();
    }

    function store(){
        StoresResource.list(vm.seid,0,0).then(function (data) {
            vm.stores = data.data.result.data
            console.log(vm.stores);            
        })
    }

    function list(){
        OrderResource.list(vm.seid,vm.get,vm.skip,vm.limit).then(function(data){
            vm.list = data.data.result.data;
            vm.tableParams = new NgTableParams({},{dataset:vm.list});   
            vm.pagecount =data.data.result.total;            
            console.log(data);
            for(var i in vm.list){
                vm.list[i].createDate=change_time(vm.list[i].createDate);
               if(vm.list[i].endDate!=null){
                    vm.list[i].endDate = change_time(vm.list[i].endDate)
               }
            }
            console.log(vm.list);
        })
    }

    function change_time(nS){
        return  new Date(parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, "");
    }

    function update(status,id){
        OrderResource.update(vm.seid,status,id).then(function(data){
            console.log(data);
            if(data.data.status=="OK"){
                layer.alert('修改成功',{icon:1})
            }else{
                layer.alert(data.data.message,{icon:2})
            }
            list();
        })
    }

}
