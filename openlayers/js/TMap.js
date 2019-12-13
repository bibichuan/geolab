// 定义对象拼接方法
Object.defineProperty(Object, "assign", {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function (target, firstSource) {
        "use strict";
        if (target === undefined || target === null)
            throw new TypeError("Cannot convert first argument to object");
        var to = Object(target);
        for (var i = 1; i < arguments.length; i++) {
            var nextSource = arguments[i];
            if (nextSource === undefined || nextSource === null) continue;
            var keysArray = Object.keys(Object(nextSource));
            for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                var nextKey = keysArray[nextIndex];
                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
            }
        }
        return to;

    }
});

var projection = ol.proj.get('EPSG:4326');
var  maxLevel = 20
function TMap(id, center,level,maptype) {
    center=center||[120.158, 30.267];
    level=level||16;
    maptype=maptype||"img"
    ol.Map.call(this,{
        logo:false,
        target:id,
        view:new ol.View({
            center: center,
            projection: projection,
            zoom: level,
            maxZoom: maxLevel,
            minZoom: 2
        })
    });
    this.layerArray=[];//地图图层数组
    this.events={};//地图事件列表
    this.maptype = maptype;
    this.level=level;
    this.center=center;
    if(typeof this.setOnlineMapType == "function"){
        this.setOnlineMapType(maptype, center, level)
    }

}
ol.inherits(TMap, ol.Map);
//合并原型链
Object.assign(TMap.prototype, {
    maxLevel: 20,
    projection: projection,
    origin: (function () {
        let projection = ol.proj.get('EPSG:4326')
        let projectionExtent = projection.getExtent()
        return ol.extent.getTopLeft(projectionExtent)
    })(),
    resolutions: [1.40625, 0.703125, 0.3515625, 0.17578125, 0.087890625, 0.0439453125, 0.02197265625, 0.010986328125,
        0.0054931640625, 0.00274658203125, 0.001373291015625, 0.0006866455078125, 0.00034332275390625, 0.000171661376953125,
        0.0000858306884765625, 0.00004291534423828125, 0.000021457672119140625, 0.000010728836059570312, 0.000005364418029785156,
        0.000002682209014892578, 0.000001341104507446289],
    matrixIds: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    mapConfigObject:[
        {
            "id": "59d77b2cdc8640b9b7f467f7110d43b1",
            "created": 1537885383338,
            "updated": 1558515675027,
            "name": "2018年影像",
            "zindex": 0,
            "min": 7,
            "max": 18,
            "zoomoffset": 0,
            "ogctype": "wmts",
            "url": "http://ditu.zj.cn/services/wmts/imgmap_latest",
            "version": "1.0.0",
            "layer": "imgmap_latest",
            "format": "image/jpgpng",
            "style": "default",
            "wmts_tile_matrixset": "default028mm",
            "tdtcode": "zhejiang",
            "baselayer": true,
            "tags": "detail",
            "fname": "浙江省",
            "copyright": "浙江省地理信息公共服务平台",
            "lon": 120.148095,
            "lat": 30.269723
        },
        {
            "id": "750d9ba37fb3455d9e167f32448f734e",
            "created": 1463737433798,
            "updated": 1465807537223,
            "name": "2000年左右影像",
            "zindex": 0,
            "min": 7,
            "max": 18,
            "zoomoffset": 0,
            "ogctype": "wmts",
            "url": "http://srv.zjditu.cn/services/wmts/imgmap_ls1998-2003",
            "version": "1.0.0",
            "layer": "imgmap_ls1998-2003",
            "format": "image/jpgpng",
            "style": "default",
            "wmts_tile_matrixset": "default028mm",
            "tdtcode": "zhejiang",
            "baselayer": true,
            "tags": "img_2000",
            "fname": "浙江省",
            "copyright": "浙江省地理信息公共服务平台",
            "lon": 120.148095,
            "lat": 30.269723
        },
        {
            "id": "cf3cde7bb8a64b6ba44cd6c980e642fa",
            "created": 1459171567368,
            "updated": 1552494146855,
            "name": "ZJDOM2W1",
            "zindex": 2,
            "min": 7,
            "max": 20,
            "zoomoffset": 0,
            "ogctype": "wmts",
            "url": "http://srv{s}.zjditu.cn/ZJDOM_2D/wmts",
            "domain": "0,1,2,3",
            "version": "1.0.0",
            "layer": "imgmap",
            "format": "image/jpgpng",
            "style": "default",
            "wmts_tile_matrixset": "default028mm",
            "tdtcode": "zhejiang",
            "baselayer": true,
            "tags": "img",
            "fname": "浙江省",
            "copyright": "浙江省地理信息公共服务平台",
            "lon": 120.148095,
            "lat": 30.269723
        },
        {
            "id": "802a4f81b026493ba5d9a2031a0b5687",
            "created": 1465807667085,
            "updated": 1465810435553,
            "name": "60年代影像",
            "zindex": 0,
            "min": 8,
            "max": 18,
            "zoomoffset": 0,
            "ogctype": "wmts",
            "url": "http://srv.zjditu.cn/services/wmts/imgmap_60s",
            "version": "1.0.0",
            "layer": "imgmap_60s",
            "format": "image/jpgpng",
            "style": "default",
            "wmts_tile_matrixset": "default028mm",
            "tdtcode": "zhejiang",
            "baselayer": true,
            "tags": "img_60",
            "fname": "浙江省",
            "copyright": "浙江省地理信息公共服务平台",
            "lon": 120.148095,
            "lat": 30.269723
        },
        {
            "id": "d56fae04a159467db1b9ea7c5911b645",
            "created": 1459171567419,
            "updated": 1552495700458,
            "name": "zjemap_anno",
            "zindex": 3,
            "min": 7,
            "max": 20,
            "zoomoffset": 0,
            "ogctype": "wmts",
            "url": "http://srv{s}.zjditu.cn/ZJEMAPANNO_2D/wmts",
            "domain": "0,1,2,3",
            "version": "1.0.0",
            "layer": "TDT_ZJEMAPANNO",
            "format": "image/jpgpng",
            "style": "default",
            "wmts_tile_matrixset": "default028mm",
            "tdtcode": "zhejiang",
            "baselayer": true,
            "tags": "road,label",
            "fname": "浙江省",
            "copyright": "浙江省地理信息公共服务平台",
            "lon": 120.148095,
            "lat": 30.269723
        },
        {
            "id": "2df2acdcee2a4e389a30f79813ac1d26",
            "created": 1459171567570,
            "updated": 1552494034118,
            "name": "ZJDOM2W1anno",
            "zindex": 3,
            "min": 7,
            "max": 20,
            "zoomoffset": 0,
            "ogctype": "wmts",
            "url": "http://srv{s}.zjditu.cn/ZJDOMANNO_2D/wmts",
            "domain": "0,1,2,3",
            "version": "1.0.0",
            "layer": "TDT_ZJIMGANNO",
            "format": "image/jpgpng",
            "style": "default",
            "wmts_tile_matrixset": "default028mm",
            "tdtcode": "zhejiang",
            "baselayer": true,
            "tags": "img,label",
            "fname": "浙江省",
            "copyright": "浙江省地理信息公共服务平台",
            "lon": 120.148095,
            "lat": 30.269723
        },
        {
            "id": "d2d753f1dbf647489d5a514b4ef4f6dc",
            "created": 1459171567560,
            "updated": 1552495663879,
            "name": "zjemap",
            "zindex": 2,
            "min": 7,
            "max": 20,
            "zoomoffset": 0,
            "ogctype": "wmts",
            "url": "http://srv{s}.zjditu.cn/ZJEMAP_2D/wmts",
            "domain": "0,1,2,3",
            "version": "1.0.0",
            "layer": "TDT_ZJEMAP",
            "format": "image/jpgpng",
            "style": "default",
            "wmts_tile_matrixset": "default028mm",
            "tdtcode": "zhejiang",
            "baselayer": true,
            "tags": "road",
            "fname": "浙江省",
            "copyright": "浙江省地理信息公共服务平台",
            "lon": 120.148095,
            "lat": 30.269723
        }
    ],
    //获取地图类型
    getMapType:function(){
        return this.maptype;
    },
    //设置地图类型,分为emap、img、img_2000、img_70、img_60
    setOnlineMapType:function(maptype, center, zoom) {
        center=center||this.getView().getCenter();
        zoom=zoom||this.getView().getZoom();
        //请求天地图图层
        var view = this.getView();
        var bbox = view.calculateExtent().join(',');
        var callName = "parseResponse" + new Date().getTime();
        var url = "http://www.zjditu.cn/api/maplayer/current";
        var tm=this;
        $.ajax({
            url: url,
            dataType: 'jsonp',
            jsonpCallback: callName,
            jsonp: "_cb",
            data:{
                bbox:bbox,
                zoom:zoom
            },
            success:function(response){
                if (response.code === 200) {
                    tm.addOnlineMap(maptype, center, zoom, response.content);
                }
            },
            error:function (error) {
                console.log(error);
                tm.addOnlineMap(maptype,center,zoom,tm.mapConfigObject);
            }
        });
    },
    //加载在线地图
    addOnlineMap:function(maptype, center, level, mapConfigArray){
        //如果当前的地图类型不是目标类型，则切换
        var currentMapType =this.getMapType();
        var targetTypeMap=null;//目标图层
        var currentTypeMap=null;//当前图层
        var mapColle = this.getLayers().getArray();
        for (let i = 0; i < mapColle.length; i++) {
            if (mapColle[i].get('name')===currentMapType) {
                currentTypeMap=mapColle[i];
            }
            if(mapColle[i].get('name')===maptype) {
                targetTypeMap=mapColle[i];
            }
        }
        if (currentMapType !== maptype) {
            currentTypeMap.setVisible(false);
        }else {
            targetTypeMap=currentTypeMap;
        }
        if (targetTypeMap) {
            targetTypeMap.setVisible(true);
        } else {
            targetTypeMap = new ol.layer.Group({
                name: maptype,
                isBaseLayers: true,
                layers: []
            })
            this.addLayer(targetTypeMap);
        }
        //判断哪些图层是当前图层数组中没有的，没有的加上，如果配置文件中没有，在当前图层数组中存在，则删除图层，不再加载
        //如果执行请求current函数后，图层名称没有变化，则不进行下面的加载图层代码执行
        var templayerNameArray=[];
        for(var mapConfig of mapConfigArray) {
            templayerNameArray.push(mapConfig.id);
        }
        var targetLayerColle=targetTypeMap.getLayers();
        var targetLayers=targetLayerColle.getArray();
        for(var i=0;i< targetLayers.length;i++) {
            var layer=targetLayers[i];
            var layerid=layer.get('id');
            if(templayerNameArray.indexOf(layerid)>=0) {
                continue;
            }else {
                targetLayerColle.remove(layer);
                i--;
                this.layerArray=_.without(this.layerArray, layerid);
            }
        }
        //建立图层
        var layerArray = [];
        var layerCount = mapConfigArray.length;
        for (let i = 0; i < layerCount; i++) {
            var mapConfig = mapConfigArray[i];
            // 排除18到20级,直接用省级
            if(mapConfig.min==18&&mapConfig.max==20){
                continue;
            }

            //如果存在同名图层，不再加载，避免了函数遍历
            if (this.layerArray.indexOf(mapConfig.id)>=0) {
                continue;
            }
            var url=mapConfig.url
            if (url.indexOf('{s}') >= 0) {
                url=url.replace('{s}', '{0-6}');
            }
            //判断加载的图层
            var tagsFlag = -1;
            switch (maptype) {
                case 'img':
                    tagsFlag = mapConfig.tags.search(/img(?!.)|(?:img,label)/);
                    break;
                case 'img_2000':
                    tagsFlag = mapConfig.tags.search(/img_2000/);
                    break;
                case 'img_70':
                    tagsFlag = mapConfig.tags.search(/img_70/);
                    break;
                case 'img_60':
                    tagsFlag = mapConfig.tags.search(/img_60/);
                    break;
                default:
                    tagsFlag = mapConfig.tags.search(/road(?!.)|(?:road,label)/);
                    break;
            }
            if (tagsFlag >= 0) {
                //var minR = mapConfig.max; //最小分辨率
                //var maxR = mapConfig.min-1; //最大分辨率
                var source= new ol.source.WMTS({
                    url: url,
                    id:mapConfig.id,
                    style: mapConfig.style,
                    format: mapConfig.format,
                    layer: mapConfig.layer,
                    matrixSet: mapConfig.wmts_tile_matrixset,
                    projection:projection,
                    tileGrid: new ol.tilegrid.WMTS({
                        origin: this.origin,
                        resolutions: this.resolutions,
                        matrixIds: this.matrixIds
                    })
                });
                //绑定瓦片加载失败时事件
                source.on('tileloaderror', function(event) {
                    // console.log(event)
                    //let tile=event.tile
                    //let img=tile.getImage();
                    //img.src=require('../assets/images/zjbg.png');
                });
                // source.on("tileloadend",function (eve) {
                //     console.log(eve);
                // })
                var newlayer = new ol.layer.Tile({
                    name: mapConfig.name,
                    id:mapConfig.id,
                    group: maptype,
                    isBaseLayers: mapConfig.baselayer,
                    source:source,
                    //minResolution: this.resolutions[minR],
                    //maxResolution: this.resolutions[maxR],
                    zIndex: mapConfig.zindex ? mapConfig.zindex : 0
                });
                layerArray.push(newlayer);
                //在地图上绘制自定义内容
                newlayer.on("postcompose",function (event) {
                    var context=event.context;
                    context.save();
                    context.rotate(-45*Math.PI/180);

                    // 设置字体
                    context.font = "30px bold 黑体";
                    // 设置颜色
                    context.fillStyle = "#aaaaaa87";
                    // 设置水平对齐方式
                    context.textAlign = "center";
                    var width=context.canvas.width;
                    var height=context.canvas.height;
                    context.translate(-width,-height);
                    // 设置垂直对齐方式
                    context.textBaseline = "middle";
                    var text="bibichuan";
                    var drawCount=25;
                    // x方向循环绘制
                    for(var i=0;i<drawCount+2;i++){
                        var x=500*i;
                        for(var j=0;j<=drawCount+5;j++){
                            var y=300*j;
                            // 绘制文字（参数：要写的字，x坐标，y坐标）
                            context.fillText(text, x, y);
                        }
                    }
                    context.restore();
                })
                //存储图层名称
                this.layerArray.push(mapConfig.id);
            }
        }
        //加入图层组
        targetTypeMap.getLayers().extend(layerArray);

        this.maptype = maptype;
        if (!this.events['moveend']) {
            this.events['moveend'] = this.on('moveend', _.debounce((event) => {
                let view=this.getView();
                this.setOnlineMapType(this.getMapType(), view.getCenter(), view.getZoom());
            }, 500));
        }
        return targetTypeMap;
    },
    //根据图层名称获取图层
    getLayersByName:function(name) {
        var mapColle = this.getLayers().getArray();
        for (var i = 0; i < mapColle.length; i++) {
            if (mapColle[i].get('name') === name) {
                return mapColle[i];
            }
        }
        return null;
    },
    //根据编号获取图层分辨率
    getResolution:function (zoom) {
        return this.resolutions[zoom];
    }
});
