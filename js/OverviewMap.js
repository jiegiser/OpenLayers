function init() {
    // 实例化鹰眼控件（OverviewMap），自定义其样式
    var overviewMapControl = new ol.control.OverviewMap({
        className: 'ol-overviewmap ol-custom-overviewmap', //鹰眼控件样式
        // 在鹰眼中加载相同坐标系下不同数据源的图层
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM({
                    'url': 'http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg'
                })
            })
        ],
        collapseLabel: '\u00BB', //鹰眼控件展开时功能按钮上的标识
        label: '\u00AB', //鹰眼控件折叠时功能按钮上的标识
        collapsed: false //初始为展开方式
    });
    // 实例化比例尺控件
    var scaleLineControl = new ol.control.ScaleLine({
        // 设置比例尺单位为degrees、imperial、us、nautical或metric（度量单位）
        units: "metric"
    });
    // 实例化map对象，用于加载地图
    var map = new ol.Map({
        target: 'map', //地图容器的div
        // 在地图容器中加载的图层
        layers: [
            new ol.layer.Tile({ //加载瓦片图层数据
                source: new ol.source.OSM() //加载OSM瓦片图层数据
            })
        ],
        // 地图视图设置
        view: new ol.View({
            center: [12000000, 4000000], //设置初始中心
            zoom: 8 //地图初始显示中心
        }),
        // 加载控件到地图容器中
        // 加载鹰眼控件
        // controls: ol.control.defaults().extend([overviewMapControl]),
        // controls: ol.control.defaults().extend([])
    });
    map.addControl(scaleLineControl);
    map.addControl(overviewMapControl);

}