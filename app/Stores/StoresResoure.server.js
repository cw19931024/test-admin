/**
 * 分类功能API封装
 */
angular.module('index_area').factory('StoresResource', StoresResource);
StoresResource.$inject = ['$http','device','version'];
function StoresResource($http,device,version) {
    return {
        list:list,
        add:add,
        remove:remove,
        get:get,
        update:update
    };


    /**
     * list
     * 获取门店列表
     */
    function list(seid,skip,limit){
        return $http.get("/api-admin/store/list",{params:{"device":device,"version":version,"sessionId":seid,"skip":skip,"limit":limit}}).then(function(data){
            return data
        })
    }

    /**
     * 添加门店
     */
    function add(seid,obj){
        console.log(obj)
        return $.ajax({
            type:"post",
            url:"/api-admin/store/add",
            async:false,
            dataType:"json",
            data:{"name":obj.name,
                "brandId":obj.brand.id,
                "longitude":obj.longitude,
                "latitude":obj.latitude,
                "location":obj.location,
                "areaId":obj.areas[3].id,
                "type":"DIRECT_STORE",
                "legalPerson":obj.legalPerson,
                "sort":obj.sort,
                "device":device,
                "version":version,
                "sessionId":seid,
                "type":obj.StoreType,
                "legalPersonTelephone":obj.legalPersonTelephone},
            success:function(response){
                return response.data;
            }
        });
    }

    /**
     * 修改门店
     * @param {Object} id
     * @param {Object} seid
     * @param {Object} name
     */
    function update(seid,obj){
        console.log(obj)
        return $http({
            url:"/api-admin/store/"+obj.id+"/update",
            method: 'post',
            params:{
                "name":obj.name,
                "terse":obj.terse,
                "brandId":obj.brandId,
                "longitude":obj.longitude,
                "latitude":obj.latitude,
                "location":obj.location,
                "areaId":obj.areas[3].id,
                "brandId":obj.brandId,
                "legalPerson":obj.legalPerson,
                "sort":obj.sort,
                "device":device,
                "version":version,
                "sessionId":seid,
                "type":obj.type,
                "legalPersonTelephone":obj.legalPersonTelephone
            }
        })
            .then(function (data) {
                return data
            })
    }

    /**
     * 删除分类
     */
    function remove(seid,id){
        return $.ajax({
            type:"post",
            url:"/api-admin/store/"+id+"/remove",
            dataType:"json",
            data:{"device":device,"version":version,"sessionId":seid,"id":id},
            async:false,
            success:function(response){
                return response.data;
            }
        });
    }

    /**
     * 获取某个分类
     */
    function get(seid,id){
        return $.ajax({
            type:"get",
            url:"/api-admin/store/"+id+"/get",
            dataType:"json",
            data:{"device":device,"version":version,"sessionId":seid,"id":id},
            async:false,
            success:function(response){
                return response.data;
            }
        });
    }
}