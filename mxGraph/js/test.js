
(function(){
    // 检查浏览器是否支持 
    if (!mxClient.isBrowserSupported())
    {
        // 如果不支持显示错误信息
        mxUtils.error('Browser is not supported!', 200, false);
    }
    var container=document.getElementById('graphContainer');

    var model = new mxGraphModel();
    var graph = new mxGraph(container, model);

    // 得到默认的parent用于插入cell。这通常是root的第一个孩子。
    var parent = graph.getDefaultParent();

    // 开始事务
    model.beginUpdate();

    // 绘制图形
    try{
        var v1 = graph.insertVertex(parent, 1, 'Hello,', 20, 20, 80, 30);
        var v2 = graph.insertVertex(parent, 2, 'World!', 200, 150, 80, 30);
        var e1 = graph.insertEdge(parent, 3, '', v1, v2);

        console.log(graph);

        // var d=graph.getElementById("1");
        // console.log(d);

    }finally{
        // 提交事务
        model.endUpdate();
    }
   

    // axios.get('./xml/xiasha.xml').then(res=>{
    //     var xmlString=res.data;
    //     var doc = mxUtils.parseXml(xmlString);
    //     var codec = new mxCodec(doc);
    //     codec.decode(doc.documentElement, graph.getModel());

    //     try{
    //         var v1 = graph.insertVertex(parent, null, 'Hello,', 20, 20, 80, 30);
    //         var v2 = graph.insertVertex(parent, null, 'World!', 200, 150, 80, 30);
    //         var e1 = graph.insertEdge(parent, null, '', v1, v2);
    //     }finally{
    //         // 提交事务
    //         model.endUpdate();
    //     }

    //     // return res;
    // });

    // 渲染的时候使用html标签
    graph.setHtmlLabels(true);

    // 移动 节点、连线 改变元素坐标
    graph.setEnabled(false); // true/false

    // 整体移动，不改变节点连线的坐标，类似于改变观看位置。
    // 鼠标拖拉，手机浏览器拖拉
    graph.setPanning(true);

    // 可能不支持部分包含web页面的控件

    // 如果不支持添加下面这个
    graph.panningHandler.useLeftButtonForPanning = false;
    mxPanningHandler.prototype.isPanningTrigger = function(me) {
        var evt = me.getEvent();
        return true;
    };

    // 重写鼠标滚轮事件
    mxEvent.addMouseWheelListener = function (funct) {
    
    }

    // 添加初次载入事件
    window.onload = function () {
        var element= document.getElementById('graphContainer');
        addScrollListener(element, wheelHandle);
    }

    function addScrollListener(element, wheelHandle) {
        if (typeof element != 'object') return;
        if (typeof wheelHandle != 'function') return;

        // 监測浏览器
        if (typeof arguments.callee.browser == 'undefined') {
            var user = navigator.userAgent;
            var b = {};
            b.opera = user.indexOf("Opera") > -1 && typeof window.opera == "object";
            b.khtml = (user.indexOf("KHTML") > -1 || user.indexOf("AppleWebKit") > -1 || user.indexOf("Konqueror") > -1) && !b.opera;
            b.ie = user.indexOf("MSIE") > -1 && !b.opera;
            b.gecko = user.indexOf("Gecko") > -1 && !b.khtml;
            arguments.callee.browser = b;
        }
        if (element == window)
            element = document;
        if (arguments.callee.browser.ie)
            element.attachEvent('onmousewheel', wheelHandle);
        else
            element.addEventListener(arguments.callee.browser.gecko ?'DOMMouseScroll' : 'mousewheel', wheelHandle, false);
    }

    function wheelHandle(e) {
        var upcheck;

        if (e.wheelDelta) {
            upcheck = e.wheelDelta > 0 ? 1 : 0;
        } else {
            upcheck = e.detail < 0 ? 1 : 0;
        }
        if (upcheck) {
            graph.zoomIn();
        }
        else {
            graph.zoomOut();
        }

        if (window.event) {
            e.returnValue = false;
            window.event.cancelBubble = true;
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
    }

})()