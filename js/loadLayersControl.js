var layer = new Array(); //map中的图层数组
var layerName = new Array(); //图层名称数组
var layerVisibility = new Array(); //图层可见属性数组

/**
 * 加载图层列表数据
 * @param {ol.Map} map 地图对象
 * @param {string} id 图层列表容器ID
 */
function loadLayersControl(map, id) {
    var treeContent = document.getElementById(id); //图层目录容器

    var layers = map.getLayers(); //获取地图中所有图层
    for (var i = 0; i < layers.getLength(); i++) {
        //获取每个图层的名称、是否可见属性
        layer[i] = layers.item(i);
        layerName[i] = layer[i].get('name');
        layerVisibility[i] = layer[i].getVisible();

        //新增li元素，用来承载图层项
        var elementLi = document.createElement('li');
        treeContent.appendChild(elementLi); // 添加子节点
        //创建复选框元素
        var elementInput = document.createElement('input');
        elementInput.type = "checkbox";
        elementInput.name = "layers";
        elementLi.appendChild(elementInput);
        //创建label元素
        var elementLable = document.createElement('label');
        elementLable.className = "layer";
        //设置图层名称
        setInnerText(elementLable, layerName[i]);
        elementLi.appendChild(elementLable);

        //设置图层默认显示状态
        if (layerVisibility[i]) {
            elementInput.checked = true;
        }
        addChangeEvent(elementInput, layer[i]); //为checkbox添加变更事件                                         
    }
}
/**
 * 为checkbox元素绑定变更事件
 * @param {input} element checkbox元素
 * @param {ol.layer.Layer} layer 图层对象
 */
function addChangeEvent(element, layer) {
    element.onclick = function() {
        if (element.checked) {
            layer.setVisible(true); //显示图层
        } else {
            layer.setVisible(false); //不显示图层
        }
    };
}
/**
 * 动态设置元素文本内容（兼容）
 */
function setInnerText(element, text) {
    if (typeof element.textContent == "string") {
        element.textContent = text;
    } else {
        element.innerText = text;
    }
}

function init() {
    //实例化Map对象加载地图
    var map = new ol.Map({
        target: 'map', //地图容器div的ID
        //地图容器中加载的图层
        layers: [
            //加载瓦片图层数据
            new ol.layer.Tile({
                source: new ol.source.OSM(),
                name: '世界地图(OSM瓦片)'
            }),

            new ol.layer.Vector({
                source: new ol.source.Vector({
                    url: 'data/geojson/countries.geojson',
                    format: new ol.format.GeoJSON()
                }),
                name: '国界(Json格式矢量图)'
            }),
            new ol.layer.Vector({
                source: new ol.source.Vector({
                    url: 'data/kml/2012-02-10.kml',
                    format: new ol.format.KML({
                        extractStyles: false
                    })
                }),
                name: '点(KML格式矢量图)'
            })
        ],
        //地图视图设置
        view: new ol.View({
            center: [0, 0], //地图初始中心点
            zoom: 2 //地图初始显示级别
        })
    });
    //实例化ZoomSlider控件并加载到地图容器中
    var zoomslider = new ol.control.ZoomSlider();
    map.addControl(zoomslider);
    //实例化zoomToExent控件并加载到地图容器中
    var zoomToExent = new ol.control.ZoomToExtent({
        extend: [13100000, 4290000,
            13200000, 5210000
        ]
    });
    map.addControl(zoomToExent);
    //加载图层列表数据
    loadLayersControl(map, "layerTree");
}