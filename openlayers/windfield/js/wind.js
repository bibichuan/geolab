/**
 *
 利用地图框架openlayer和canvas API实现了动画效果
 栅格数据后端定时处理，发布到服务器，跨域调用，前端提取渲染
 动画会耗费大量计算资源，为了达到流畅效果
 涉及到很多JavaScript性能调优，
 为了达到显示的美观，涉及到插值的算法
 风场图的粒子速度在不同缩放级别下的移动速度
 作者：崔叶孟( email: 2270172201@qq.com )
 */
var Vector = function(x, y) {
	this.x = x;
	this.y = y;
};
Vector.prototype.length = function() {
	return Math.sqrt(this.x * this.x + this.y * this.y);
};
Vector.prototype.setLength = function(length) {
	var current = this.length();
	if (current) {
		var scale = length / current;
		this.x *= scale;
		this.y *= scale;
	}
	return this;
};
var Particle = function(x, y, age) {
	this.x = x;
	this.y = y;
	this.oldX = -1;
	this.oldY = -1;
	this.age = age;
	this.rnd = Math.random();
};
/**
 * 
 * @param field
 *            2D array of Vectors
 * 
 * next params are corners of region.
 * @param x0
 * @param y0
 * @param x1
 * @param y1
 */
var VectorField = function(field, x0, y0, x1, y1) {
	this.x0 = x0;
	this.x1 = x1;
	this.y0 = y0;
	this.y1 = y1;
	this.field = field;
	this.w = field.length;
	this.h = field[0].length;
	this.maxLength = 0;
	var mx = 0;
	var my = 0;
	for (var i = 0; i < this.w; i++) {
	  for (var j = 0; j < this.h; j++) {
			if (field[i][j].length() > this.maxLength) {
				mx = i;
				my = j;
			}
			if(!isNaN(field[i][j].length())){
				this.maxLength = Math.max(this.maxLength, field[i][j].length());
			}
		}
	}
	mx = (mx / this.w) * (x1 - x0) + x0;
	my = (my / this.h) * (y1 - y0) + y0;
	
};
VectorField.read = function(data) {
	var field = [];
	var w = data[0].header.nx;
	var h = data[0].header.ny;
	var n = 2 * w * h;
	var i = 0;
	
	var total = 0;
	var weight = 0;
	for (var x = 0; x < w; x++) {
		field[x] = [];
		for (var y = 0; y < h; y++) {
			var vx = data[0].data[w*y+x];
			var vy = data[1].data[w*y+x];
			var v = new Vector(vx, vy);
			var ux = x / (w - 1); // 计算格网点所在位置比率
			var uy = y / (h - 1);
			var lon =  data[0].header.lo1 * (1 - ux) + data[0].header.lo2 * ux; // 计算向量点的经度
			var lat =  data[0].header.la1 * (1 - uy) + data[0].header.la2 * uy; // 计算向量点的纬度
			var m = Math.PI * lat / 180; // 将向量点的纬度转为弧度
			var length = v.length();
			if (length) {
			    total += length * m;
			    weight += m;
	    	}
			v.x /= Math.cos(m);
			v.setLength(length);
			field[x].push(v);
		}
	}
	var result = new VectorField(field, data[0].header.lo1, data[0].header.la1, data[0].header.lo2, data[0].header.la2);
  // window.console.log('total = ' + total);
	// window.console.log('weight = ' + weight);
  if (total && weight) {

	  result.averageLength = total / weight;
	}
	return result;
};


VectorField.readImg = function(datau,datav) {
	if (datav && datau) {
		var field = [];
		var w = 720;
		var h = 360;
		var n = 2 * w * h;
		var i = 0;
		
		var total = 0;
		var weight = 0;
		for (var x = 0; x < w; x++) {
			field[x] = [];
			for (var y = 0; y < h; y++) {
				var vx = (datau[(w*y+x)*4]-128)/1.6;
				var vy = (datav[(w*y+x)*4]-128)/1.6;
				var v = new Vector(vx, vy);
				var ux = x / (w - 1);
				var uy = y / (h - 1);
				var lon =  -179.5 * (1 - ux) + 179.5 * ux;
				var lat =  89.5 * (1 - uy) + -89.5 * uy;
				var m = Math.PI * lat / 180;
				var length = v.length();
				if (length) {
				    total += length * m;
				    weight += m;
				}
				v.x /= Math.cos(m);
				v.setLength(length);
				field[x].push(v);
			}
		}
		var result = new VectorField(field, -179.5, 89.5, 179.5, -89.5);
	  // window.console.log('total = ' + total);
		// window.console.log('weight = ' + weight);
	  if (total && weight) {

		  result.averageLength = total / weight;
		}
		return result;
	}
	
};

VectorField.readImgArr = function(imageArr) {
		console.log(imageArr);
		var field = [];
		var w = 720;
		var h = 360;
		var n = 2 * w * h;
		var i = 0;
		
		var total = 0;
		var weight = 0;
		for (var x = 0; x < w; x++) {
			field[x] = [];
			for (var y = 0; y < h; y++) {
				var vx = (imageArr[(w*y+x)*4+0]-128)/1.6;
				var vy = (imageArr[(w*y+x)*4+1]-128)/1.6;
				var v = new Vector(vx, vy);
				var ux = x / (w - 1);
				var uy = y / (h - 1);
				var lon =  -179.5 * (1 - ux) + 179.5 * ux;
				var lat =  89.5 * (1 - uy) + -89.5 * uy;
				var m = Math.PI * lat / 180;
				var length = v.length();
				if (length) {
				    total += length * m;
				    weight += m;
				}

				if(x==0){
					console.log(m,lat,lon,v.x,v.y,v.x /Math.cos(m),v.y);
				}
				v.x /= Math.cos(m);
				v.setLength(length);
				field[x].push(v);
			}
		}
		console.log(field);
		var result = new VectorField(field, -179.5, 89.5, 179.5, -89.5);
	  // window.console.log('total = ' + total);
		// window.console.log('weight = ' + weight);
	  if (total && weight) {

		  result.averageLength = total / weight;
		}
		return result;
	
};



VectorField.prototype.inBounds = function(x, y) {
	return x >= -1 && x < this.width && y >= -1 && y < this.height;
};


VectorField.prototype.bilinear = function(coord, a, b) {
	while (a<-360) {
		a += 720
	}
	while (a>360){
        a -= 720
	}
    while (b<-180) {
        a += 360
    }
    while (b>180){
        a -= 360
    }
  var na = Math.floor(a);
  var nb = Math.floor(b);
  var ma = Math.ceil(a);
  var mb = Math.ceil(b);
  var fa = a - na;
  var fb = b - nb;
  try {
	  var value= this.field[na+360][180-nb][coord] * (1 - fa) * (1 - fb) +
	   			 this.field[ma+360][180-nb][coord] * fa * (1 - fb) +
		    	 this.field[na+360][180-mb][coord] * (1 - fa) * fb +
		    	 this.field[ma+360][180-mb][coord] * fa * fb;
	  return value
} catch (e) {
	 // return ;
	// TODO: handle exception
}
};
function getValue(data, coord){
	var a = coord[0];
	var b = coord[1];
	var na = Math.floor(a)<-360?na+=720:Math.floor(a);
	var nb = Math.floor(b)<-180?nb+=360:Math.floor(b);
	var ma = Math.ceil(a)>360?ma-=720:Math.ceil(a);
	var mb = Math.ceil(b)>180?mb-=360:Math.ceil(b);
	var fa = a - na;
	var fb = b - nb;
	var index = ((90-nb)*2*720+(na+180)*2);
	var value= data[((90-nb)*2*720+(na+180)*2)] * (1 - fa) * (1 - fb) +
		data[((90-nb)*2*720+(ma+180)*2)] * fa * (1 - fb) +
		data[((90-mb)*2*720+(na+180)*2)] * (1 - fa) * fb +
		data[((90-mb)*2*720+(ma+180)*2)] * fa * fb;
	return value;
}

VectorField.prototype.getValue = function(x, y, opt_result) {
	var vx = this.bilinear('x', x*2, y*2);
	var vy = this.bilinear('y', x*2, y*2);
	if (opt_result) {
		opt_result.x = vx;
		opt_result.y = vy;
		return opt_result;
	}
	return new Vector(vx, vy);
};

var MotionDisplay = function(canvas, field, numParticles) {
	this.canvas = canvas;
    this.field = field;
	this.numParticles = numParticles||3224.55;
	this.first = true;
	this.maxLength = field.maxLength;
	this.speedScale = 1;
	this.renderState = 'normal';
	this.x0 = this.field.x0;
	this.x1 = this.field.x1;
	this.y0 = this.field.y0;
	this.y1 = this.field.y1;
	this.state = 'startMove';
	//this.makeNewParticles(null, true);
	this.colors = [];
	this.rgb = '40, 40, 40';
	this.background = 'rgb(' + this.rgb + ')';
	this.backgroundAlpha = 'rgba(' + this.rgb + ', 0.02)';
	this.outsideColor = '#fff';
	for (var i = 0; i < 256; i++) {
		this.colors[i] = 'rgb(' + i + ',' + i + ',' + i + ')';
	}
};
MotionDisplay.prototype.makeParticle = function() {
	var dx =  0;
	var dy =  0;
	var scale = 1;
	var safecount = 0;
	for (;;) {
		var a = Math.random();
		var b = Math.random();
/*
 * var x = a * this.x0 + (1 - a) * this.x1; var y = b * this.y0 + (1 - b) *
 * this.y1;
 */
        var x1 = this.field.x0+ (this.field.x1-this.field.x0)*a;
        var y1 =  this.field.y0+ (this.field.y1-this.field.y0)*b;
		var v = this.field.getValue(x1, y1);
		var m = v.length() / this.field.maxLength;
		// The random factor here is designed to ensure that
		// more particles are placed in slower areas; this makes the
		// overall distribution appear more even.
		if ((v.x || v.y) && (++safecount > 10 || Math.random() > m * .9)) {
			// var proj = this.projection.project(x, y);
			// var proj = map.getPixelFromCoordinate(new
			// ol.proj.fromLonLat([x,y]))
			var sx = x1 * scale + dx;
			var sy = y1 * scale + dy;
			return new Particle(x1, y1, 1 + 40 * Math.random());
			if (++safecount > 10 || !(sx < 0 || sy < 0 || sx > this.canvas.width || sy > this.canvas.height)) {
	     		 return new Particle(x1, y1, 1 + 40 * Math.random());
     		 }	
		}
	}
};
MotionDisplay.prototype.makeNewParticles = function() {
	this.particles = [];
	for (var i = 0; i < this.numParticles; i++) {
		this.particles.push(this.makeParticle());
	}
};
MotionDisplay.prototype.start = function() {
	monitorMap.updateSize();
	var self = this;
	function go() {
		self.loop();
        self.animationId = window.requestAnimationFrame(go);
	}
	go();
};

MotionDisplay.prototype.stop = function() {
    window.cancelAnimationFrame(this.animationId)
};
MotionDisplay.prototype.loop = function() {
	this[this.state].call(this, this)
};

MotionDisplay.prototype.animate = function() {
	this.moveThings();
  this.draw();
};

MotionDisplay.prototype.startMove  = function() {
    var mapSize = monitorMap.getSize();
	var width = mapSize[0];
	var height = mapSize[1];
    this.field.width = width;
    this.field.height = height;
	var zoom = monitorMap.getView().getZoom();
	this.numParticles = myView.modalSelect == "gfs"? 3224.55:0;
    this.numParticles >=5000? 5000:this.numParticles;
	var extent = monitorMap.getView().calculateExtent(mapSize);
    var ext2 = new ol.proj.transformExtent(extent,asideVue.projection, 'EPSG:4326' );
    this.field.x0 = Math.floor(ext2[0]);
    this.field.y0 = Math.floor(ext2[1]);
    this.field.x1 = Math.ceil(ext2[2]);
    this.field.y1 = Math.ceil(ext2[3]);
    this.x0 = Math.floor(ext2[0]);
    this.y0 = Math.floor(ext2[1]);
    this.x1 = Math.ceil(ext2[2]);
    this.y1 = Math.ceil(ext2[3]);
    this.canvas.width=width;
    this.canvas.height=height;
    this.fillColor =  "rgba(0, 0, 0, 0.92)";//默认0.92
    this.strokeStyle =  "#ededed";
    this.moveSpeed =75;
    this.windThick = 0.5;
	// canvas.getContext("2d").clearRect(0,0,width,height)
    this.makeNewParticles(null, true);
};
MotionDisplay.prototype.moveThings = function() {
    var resolution = monitorMap.getView().getResolution();
    var speed = this.moveSpeed*resolution/ 3E7;
	// console.log(this.state+">>"+this.particles.length)
	for (var i = 0; i < this.particles.length; i++) {
		var p = this.particles[i];
		if (p.age > 0 && this.field.inBounds(p.oldX, p.oldY)) {
		  var a = this.field.getValue(p.x, p.y);	
			p.x += speed * a.x;
			p.y += speed * a.y;
			p.age--;
		} else {
			this.particles[i] = this.makeParticle();
		}
	}
};
MotionDisplay.prototype.draw = function() {
	var g = this.canvas.getContext('2d');
	var w = this.canvas.width;
	var h = this.canvas.height;
	 g.fillStyle = this.fillColor;
		// g.fillStyle = this.backgroundAlpha;
	var dx = 0;
	var dy = 0;
	var scale = 1;

    // Fade existing particle trails.
    var prev = g.globalCompositeOperation;
    g.globalCompositeOperation = "destination-in";
    g.fillRect(dx, dy, w * scale,h * scale);
    g.globalCompositeOperation = prev;
    
	var proj = new Vector(0, 0);
	var val = new Vector(0, 0);
	g.lineWidth = this.windThick;
	// console.log(this.particles.length)
	for (var i = 0; i < this.particles.length; i++) {
		var p = this.particles[i];
		if (!this.field.inBounds(p.oldX, p.oldY)) {
			p.age = -2;
			continue;
		}
		// this.projection.project(p.x, p.y, proj);
		proj = monitorMap.getPixelFromCoordinate(new ol.proj.fromLonLat([p.x, p.y] ,asideVue.projection));
		proj[0] = Math.round(proj[0]) * scale + dx;
		proj[1] = Math.round(proj[1]) * scale + dy;
		if (proj[0] < 0 || proj[1] < 0 || proj[0] > w || proj[1] > h) {
			p.age = -2;
		}
		if (p.oldX !== -1) {
			var wind = this.field.getValue(p.x, p.y, val);
			g.strokeStyle = this.strokeStyle;
			g.beginPath();
			g.moveTo(p.oldX, p.oldY);
			g.lineTo(proj[0], proj[1]);
			g.stroke();
	  }
		p.oldX = proj[0];
		p.oldY = proj[1];
	}

};