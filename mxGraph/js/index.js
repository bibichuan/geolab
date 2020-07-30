/**
 * 扩展mxStencilRegistry,加载模型
 */
(function(){
    // 扩展mxStencilRegistry加载模型
    mxStencilRegistry.packages = [];
    // Extends the default stencil registry to add dynamic loading
    mxStencilRegistry.getStencil = function(name)
    {
        var result = mxStencilRegistry.stencils[name];
        if (result == null)
        {
            var basename = mxStencilRegistry.getBasenameForStencil(name);
            if (basename != null)
            {
                mxStencilRegistry.loadStencilSet('xml/stencils/' + basename + '.xml', null);
                result = mxStencilRegistry.stencils[name];
            }
        }

        return result;
    };

    mxStencilRegistry.getBasenameForStencil = function(name)
    {
        var parts = name.split('.');
        var tmp = null;
        if (parts.length > 0 && parts[0] == 'mxgraph')
        {
            tmp = parts[1];

            for (var i = 2; i < parts.length - 1; i++)
            {
                tmp += '/' + parts[i];
            }
        }

        return tmp;
    };

    // Loads the given stencil set
    mxStencilRegistry.loadStencilSet = function(stencilFile, postStencilLoad, force)
    {
        force = (force != null) ? force : false;

        // Uses additional cache for detecting previous load attempts
        var installed = mxStencilRegistry.packages[stencilFile] != null;

        if (force || !installed)
        {
            mxStencilRegistry.packages[stencilFile] = 1;
            var req = mxUtils.load(stencilFile);
            mxStencilRegistry.parseStencilSet(req.getXml(), postStencilLoad, !installed);
        }
    };

    // Parses the given stencil set
    mxStencilRegistry.parseStencilSet = function(xmlDocument, postStencilLoad, install)
    {
        install = (install != null) ? install : true;
        var root = xmlDocument.documentElement;
        var shape = root.firstChild;
        var packageName = '';
        var name = root.getAttribute('name');

        if (name != null)
        {
            packageName = name + '.';
        }

        while (shape != null)
        {
            if (shape.nodeType == mxConstants.NODETYPE_ELEMENT)
            {
                name = shape.getAttribute('name');

                if (name != null)
                {
                    var w = shape.getAttribute('w');
                    var h = shape.getAttribute('h');

                    w = (w == null) ? 80 : parseInt(w, 10);
                    h = (h == null) ? 80 : parseInt(h, 10);

                    packageName = packageName.toLowerCase();
                    var stencilName = name.replace(/ /g,"_");

                    if (install)
                    {
                        mxStencilRegistry.addStencil(packageName + stencilName.toLowerCase(), new mxStencil(shape));
                    }

                    if (postStencilLoad != null)
                    {
                        postStencilLoad(packageName, stencilName, name, w, h);
                    }
                }
            }

            shape = shape.nextSibling;
        }
    };
})();

GIS={
    objList:null, // 流程图对象列表
    initMxGraph:function(id){ // 初始化应用程序
        // 检查浏览器是否支持 
        if (!mxClient.isBrowserSupported())
        {
            // 如果不支持显示错误信息
            mxUtils.error('Browser is not supported!', 200, false);
        }
        // 初始化graph
        var container=document.getElementById(id);

        var model = new mxGraphModel();
        var graph = new mxGraph(container, model);
    
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

        // 返回绘图对象
        return graph;
    },
    refresh:function(data){

    },
    
};

/**
 * 主函数
 */
(function(){
    var graph = GIS.initMxGraph('graphContainer');
    

    // 得到默认的parent用于插入cell。这通常是root的第一个孩子。
    var parent = graph.getDefaultParent();

    // 加载样式
    var node = mxUtils.load('./xml/default.xml').getDocumentElement();   //STYLE_PATH = styles
    var dec = new mxCodec(node.ownerDocument);
    dec.decode(node, graph.getStylesheet());

    // 加载预定义图形
    mxStencilRegistry.loadStencilSet('./xml/general.xml');  //STENCIL_PATH = stencils


    // 加载数据
    var req = mxUtils.load('./xml/xiasha.xml');   //XML_PATH = xml
    doc = req.getDocumentElement().ownerDocument;
    var codec = new mxCodec(doc);
    codec.decode(doc.documentElement, graph.getModel());
    
})()