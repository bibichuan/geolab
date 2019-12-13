//var utcNow =new Date( myView.datetime.getTime())
//utcNow.setHours(myView.time)
//utcNow = new Date(utcNow.getTime()-8*60*60*1000)
var imguv = new Image();
imguv.crossOrigin = "anonymous";
imguv.src="./img/06.jpg"
//imguv.src =myView.dataSource+"/GFS/win/"+utcNow.Format("yyyy/MM/dd/hh")+".jpg"; // "http://www.meteowise.msns.cn:28083/GFS/win/2017/05/01/01.jpg";//"getImageForecastData?path="+utcNow.Format("yyyy/MM/dd")+"/icon/whole_world/hour_"+utcNow.Format("hh")+"/icon_vitr_u_10_m_"+utcNow.Format("yyyyMMdd_hh")+".jpg"

imguv.onerror= function(){
    if(myView.modalSelect==="gfs"){
        myView.$Notice.error({ title: '未找到该时次数据',desc:"可能是时间超出范围，也有可能是网络错误"})
    }
};
var winspeed = [];
imguv.onload = function() {
	var canvas = document.createElement('canvas');
    canvas.width = this.width;
    canvas.height = this.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(this, 0, 0);
	var imageData = ctx.getImageData(0, 0, this.width, this.height).data;
	var field = VectorField.readImgArr(imageData);
	for (var i = 0; i < 720; i++) {
		for (var j = 0; j < 360; j++) {
			var vector = field.field[i][j];
			var speed = Math.sqrt (Math.pow(vector.x,2)+Math.pow(vector.y,2));
			winspeed[(j*720+i)*4] = speed;
			winspeed[(j*720+i)*4+1] = speed;
			winspeed[(j*720+i)*4+2] = speed;
			winspeed[(j*720+i)*4+3] = speed
		}
	}
	// // canvasLayer.setSource(new ol.source.ImageCanvas({
	// // 	canvasFunction : canvasFunction,
	// // 	ratio : 1,
	// // 	projection : "epsg:3857"
	// // }))
	display.field = field;
	if (display.first) {
		display.start();
        monitorMap.on('movestart', function(){
			display.state ="startMove";
		});
        monitorMap.on('moveend', function() {
            display.state ="animate";
        });
        //monitorMap.on('pointermove',pointmove)
        display.first=false;
	}
	setTimeout(function() {
		display.state ="animate"
	}, 100);
};