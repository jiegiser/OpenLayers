function init() {
    //实例化Map对象，用于加载地图
    var map = new ol.Map({
        target: 'map', //地图容器的div
        // 在地图容器中加载图层
        layers: [
            // 加载瓦片图层数据OSM
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        // 地图视图设置
        view: new ol.View({
            center: [12950000, 4860000], //地图显示中心设置
            zoom: 8, //地图初始显示级别
            minZoom: 6, //最小级别
            maxZoom: 12, //最大级别
            rotation: Math.PI / 6 //设置旋转角度
        })
    });
    // 地图视图的初始参数
    var view = map.getView();
    var zoom = view.getZoom();
    var center = view.getCenter();
    var rotation = view.getRotation();
    // 实现单击缩小按钮的功能
    document.getElementById('zoom-out').onclick = function() {
            var view = map.getView(); //获取当前地图视图
            var zoom = view.getZoom(); //获得当前缩放级别
            view.setZoom(zoom - 1); //地图缩小一级
        }
        // 实现单击放大的功能按钮
    document.getElementById('zoom-in').onclick = function() {
            var view = map.getView(); //获取当前地图视图
            var zoom = view.getZoom(); //获得当前缩放级别
            view.setZoom(zoom + 1); //地图放大一级
        }
        // 平移功能
    document.getElementById('panto').onclick = function() {
            var view = map.getView(); //获取当前地图视图
            var lz = ol.proj.fromLonLat([103.73333, 36.03333]);
            view.setCenter(lz); //平移地图
        }
        // 复位功能（复位到初始复位）
    document.getElementById('restore').onclick = function() {
            view.setCenter(center); //初始中心点
            view.setRotation(rotation); //初始旋转角度
            view.setZoom(zoom); //平移地图
        }
        // 为内置的缩放控件与旋转控件添加tooltip提示信息
    $('.ol-zoom-in,.ol-zoom-out').tooltip({
        placement: 'right' //tooltip在右侧显示
    });
    $('.ol-rotate-reset,.ol-attribution button[title]').tooltip({
        placement: 'left' //tooltip在右侧显示
    });
}