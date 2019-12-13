/** 颜色表算法
 *   colorSize 颜色分段，默认为6
 *   colorType 上限下限的数值类型，是整数，还是小数，整数为0，小数为1，默认为0
 *   maxValue  上限值，整数情况下默认为300，小数情况下默认为1.0
 *   minValue  下限值，整数情况下默认为100，小数情况下默认为0.2
*/
//function RGBCal(colorSize,colorType,maxValue,minValue){
function RGBCal(section,option){
    //执行单色卡初始化
    this.initSingleColor();
    //执行双色卡初始化
    this.initDoubleColor();
}
RGBCal.prototype={
    constructor:RGBCal,
    initSingleColor:function(colorSize,colorType,maxValue,minValue){
        this.colorSize=colorSize||7;
        this.colorType=colorType||0;
        if(this.colorType==0){
            this.maxValue=maxValue||300;
            this.minValue=minValue||100;
        }else {
            this.maxValue=maxValue||1.0;
            this.minValue=minValue||0.2;
        }
        //执行初始化
        this.rgbColors=this.getRGBColorsNew(this.colorSize);
    },
    initDoubleColor:function(colorBlock){
        if(!colorBlock){
            colorBlock= [{
                "colorSection": 5,
                "colorType":0,
                "upperValue": 300,  //最大值
                "lowerValue": 0,   //最小值
                "rgbColors":[] //色卡数组
            },{
                "colorSection": 6, //颜色分段
                "colorType":0,  //使用小数还是整数计算
                "upperValue": 0, ///最大值
                "lowerValue": -100, //最小值
                "rgbColors":[] //色卡数组
            }];
        }
        this.colorBlock= colorBlock;
        //计算基准值
        var upper=this.colorBlock[0].lowerValue;
        var lower=this.colorBlock[1].upperValue;
        if(lower>=upper){
            this.reference=upper;
        }else {
            this.reference=(parseFloat(upper)+parseFloat(lower))/2;
        }

        //分段计算色卡
        this.colorBlock[0].rgbColors=this.getRainbowColor2_own(this.colorBlock[0].colorSection);
        this.colorBlock[1].rgbColors=this.getRainbowColor2_two(this.colorBlock[1].colorSection);
    },
    //获取一段瑟克时当前数据对应RGB
    getCurrentColor:function (currentVal) {
        var maxValue=this.maxValue;
        var minValue=this.minValue;
        var colorLineType=this.colorType
        if (currentVal - minValue <= 0) {
            return this.rgbColors[0];
        }
        var colorSize=this.colorSize;
        if (currentVal - maxValue >= 0) {
            return this.rgbColors[colorSize - 1];
        }
        if (colorLineType === 0) { //温度
            var itemVal = (maxValue - minValue) / (colorSize - 2);
            var indexVal = Math.floor((currentVal - minValue) / itemVal) + 1;
        } else { //压力colorLineType === 1
            var itemVal = this.accDiv(this.accSub(maxValue, minValue), colorSize - 2);
            var indexVal = Math.floor(this.accDiv(this.accSub(currentVal, minValue), itemVal)) + 1;
        }
        return this.rgbColors[indexVal];
    },
    //RGB彩虹算法---标准
    getRGBColors:function (colorSize) {
        var colors = [];
        for (var i = 0; i < colorSize; i++) {
            var r = 0;
            var g = 0;
            var b = 0;
            if (i < colorSize / 3) {
                r = 255;
                g = Math.ceil(255 * 3 * i / colorSize);
                b = 0;
            } else if (i < colorSize / 2) {
                r = Math.ceil(750 - i * (250 * 6 / colorSize));
                g = 255;
                b = 0;
            } else if (i < colorSize * 2 / 3) {
                r = 0;
                g = 255;
                b = Math.ceil(i * (250 * 6 / colorSize) - 750);
            } else if (i < colorSize * 5 / 6) {
                r = 0;
                g = Math.ceil(1250 - i * (250 * 6 / colorSize));
                b = 255;
            } else {
                r = Math.ceil(150 * i * (6 / colorSize) - 750);
                g = 0;
                b = 255;
            }
            colors.push('rgb(' + r + ',' + g + ',' + b + ')');
        }
        colors.reverse(); //倒序
        return colors;
    },
    //RGB彩虹算法--去掉紫色
    getRGBColorsNew:function (colorSize) {
        var colors = [];
        for (var i = 0; i < colorSize; i++) {
            var r = 0;
            var g = 0;
            var b = 0;
            if (i < colorSize / 3) {
                r = 255;
                g = Math.ceil(255 * 3 * i / colorSize);
                b = 0;
            } else if (i < colorSize / 2) {
                r = Math.ceil(750 - i * (250 * 6 / colorSize));
                g = 255;
                b = 0;
            } else if (i < colorSize * 2 / 3) {
                r = 0;
                g = 255;
                b = Math.ceil(i * (250 * 6 / colorSize) - 750);
            } else {
                r = 0;
                g = Math.ceil(750 - i * (250 * 3 / colorSize));
                b = 255;
            }
            colors.push('rgb(' + r + ',' + g + ',' + b + ')');
        }
        colors.reverse();
        return colors;
    },
    // 修改颜色分段、颜色类型、最大最小值
    setColorConfig:function(colorSize,colorType,maxValue,minValue){
        this.colorSize=colorSize||this.colorSize;
        this.colorType=colorType||this.colorType;
        this.maxValue=maxValue||this.maxValue;
        this.minValue=minValue||this.minValue;
        //重新计算色卡
        //this.rgbColors=this.getRGBColors(this.colorSize);
        //去掉紫色
        this.rgbColors=this.getRGBColorsNew(this.colorSize);
    },
    //修改双色卡时的分段、颜色类型、最大最小值
    setColorConfig2:function(colorblock){
        colorblock=colorblock||this.colorBlock;
        //判断是否为空值
        colorblock[0].colorSection=colorblock[0].colorSection||this.colorBlock[0].colorSection;
        //如果第二段为空
        if(colorblock.length>1){
            colorblock[1].colorSection=colorblock[1].colorSection==""?this.colorBlock[1].colorSection:colorblock[1].colorSection;
        }
        this.colorBlock=colorblock;
        //重新计算基准值
        var upper=this.colorBlock[0].lowerValue;
        var lower=this.colorBlock[1].upperValue;
        if(lower>=upper){
            this.reference=upper;
        }else {
            this.reference=(parseFloat(upper)+parseFloat(lower))/2;
        }
        //分段计算色卡
        this.colorBlock[0].rgbColors=this.getRainbowColor2_own(this.colorBlock[0].colorSection);
        this.colorBlock[1].rgbColors=this.getRainbowColor2_two(this.colorBlock[1].colorSection);
    },
    //获取双色卡时当前数据对应的RGB值
    getCurrentColor2:function (currentVal) {
        //首先和基准值比较，确定落在哪个色卡内
        var colorblock=null;
        var colorLineType=0;
        if(currentVal>=this.reference){ //落在第一个色卡内
            colorblock=this.colorBlock[0];
        }else {  //否则落在第二个色卡内
            colorblock=this.colorBlock[1];
        }
        // 设置计算方式
        var colorLineType=colorblock.colorType;

        var maxValue=colorblock.upperValue;
        var minValue=colorblock.lowerValue;
        if (currentVal - minValue <= 0) {
            return colorblock.rgbColors[0];
        }
        var colorSize=colorblock.colorSection;
        if (currentVal - maxValue >= 0) {
            return colorblock.rgbColors[colorSize - 1];
        }

        if (colorLineType === 0) { //温度
            var itemVal = (maxValue - minValue) / (colorSize - 2);
            var indexVal = Math.floor((currentVal - minValue) / itemVal) + 1;
        } else { //压力colorLineType === 1
            var itemVal = this.accDiv(this.accSub(maxValue, minValue), colorSize - 2);
            var indexVal = Math.floor(this.accDiv(this.accSub(currentVal, minValue), itemVal)) + 1;
        }
        return colorblock.rgbColors[indexVal];
    },
    //除法
    accDiv:function (arg1, arg2) {
        var t1 = 0,
            t2 = 0,
            r1, r2;
        try {
            t1 = arg1.toString().split(".")[1].length
        } catch (e) {}
        try {
            t2 = arg2.toString().split(".")[1].length
        } catch (e) {}
        with(Math) {
            r1 = Number(arg1.toString().replace(".", ""))
            r2 = Number(arg2.toString().replace(".", ""))
            return (r1 / r2) * pow(10, t2 - t1);
        }
    },
    //乘法
    accMul:function (arg1, arg2) {
        var m = 0,
            s1 = arg1.toString(),
            s2 = arg2.toString();
        try {
            m += s1.split(".")[1].length
        } catch (e) {}
        try {
            m += s2.split(".")[1].length
        } catch (e) {}
        return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
    },
    //加法
    accAdd:function (arg1, arg2) {
        var r1, r2, m;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2))
        return (arg1 * m + arg2 * m) / m
    },
    //减法
    accSub:function (arg1, arg2) {
        var r1, r2, m, n;
        try {
            r1 = arg1.toString().split(".")[1].length
        } catch (e) {
            r1 = 0
        }
        try {
            r2 = arg2.toString().split(".")[1].length
        } catch (e) {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    //新的渐变算法，主要是分别定义红、橙、黄、绿、青、蓝、紫颜色值，渐变时，分从紫到蓝，蓝到青，青到绿，依此分段渐变，最后组成一个渐变色数组
    //形成整个渐变色,比如从绿色渐变到红色，应先从绿色渐变到黄色，然后从黄色渐变到橙色，然后从橙色渐变到红色
    //     红: #FF0000  255，0，0
    //     橙: #FF7D00  255, 125, 0
    //     黄: #FFFF00  255，255，0
    //     绿: #00FF00  0，255，0
    //     青: #00FFFF  0, 255, 255
    //     蓝: #0000FF  0，0，255
    //     紫: #FF00FF  255, 0, 255

    // 渐变色第一段，从紫色到红色
    getRainbowColor_one(colorSize){
        var color_list=[];
        if(colorSize<6){
            switch (colorSize) {
                case 1:
                    color_list=["rgb(255，0，0)"];
                    break;
                case 2:
                    color_list=["rgb(255，0，0)","rgb(255, 0, 255)"];
                    break;
                case 3:
                    color_list=["rgb(255，0，0)","rgb(0，255，0)","rgb(255, 0, 255)"];
                    break;
                case 4:
                    color_list=["rgb(255，0，0)","rgb(255，255，0)","rgb(0，255，0)","rgb(0,255, 255)","rgb(255, 0, 255)"];
                    break;
                case 5:
                    color_list=["rgb(255，0，0)","rgb(255，255，0)","rgb(0，255，0)","rgb(0,255, 255)","rgb(255, 0, 255)"];
                    break;
                case 6:
                    color_list=["rgb(255，0，0)","rgb(255，255，0)","rgb(0，255，0)","rgb(0,255, 255)","rgb(0，0，255)","rgb(255, 0, 255)"];
                    break;
                case 7:
                    color_list=["rgb(255，0，0)","rgb(255, 125, 0)","rgb(255，255，0)","rgb(0，255，0)","rgb(0,255, 255)","rgb(0，0，255)","rgb(255, 0, 255)"];
                    break;
            }
        }else {
            var subColorSieze=parseInt(colorSize/7);
            var subRemainder=colorSize%7;
            var color=["#FF0000","#FF7D00","#FFFF00","#00FF00","#00FFFF","#0000FF","#FF00FF","#FF0000"];
            color_list=this.getSubColor(color,subColorSieze,subRemainder);
        }
        return color_list.reverse();
    },
    // 渐变色第一段，从绿色到红色
    getRainbowColor2_own:function(colorSize){
        var color_list=[];
        if(colorSize<5){
            switch (colorSize) {
                case 1:
                    color_list=["rgb(255，0，0)"];
                    break;
                case 2:
                    color_list=["rgb(255，0，0)","rgb(255, 125, 0)"];
                    break;
                case 3:
                    color_list=["rgb(255，0，0)","rgb(255, 125, 0)","rgb(255，255，0)"];
                    break;
                case 4:
                    color_list=["rgb(255，0，0)","rgb(255, 125, 0)","rgb(255，255，0)","rgb(0，255，0)"];
                    break;
            }
        }else {
            var subColorSieze=parseInt(colorSize/4);
            var subRemainder=colorSize%4;
            var color=["#FF0000","#FF7D00","#FFFF00","#00FF00","#00FFFF"];
            color_list=this.getSubColor(color,subColorSieze,subRemainder);
        }
        return color_list.reverse();
    },
    // 渐变色第二段，从青色到紫色
    getRainbowColor2_two:function(colorSize){
        var color_list=[];
        if(colorSize<4){
            switch (colorSize) {
                case 1:
                    color_list=["rgb(0, 255, 255)"];
                    break;
                case 2:
                    color_list=["rgb(0, 255, 255)","rgb(0，0，255)"];
                    break;
                case 3:
                    color_list=["rgb(0, 255, 255)","rgb(0，0，255)","rgb(255, 0, 255)"];
                    break;
            }
        }else {
            var subColorSieze=parseInt(colorSize/2);
            var subRemainder=colorSize%2;
            var color=["#00FFFF","#0000FF","#FF00FF"];
            color_list=this.getSubColor(color,subColorSieze,subRemainder);
        }
        return color_list.reverse();
    },
    getSubColor:function(colorArray,step,remainder){
        var colorCount=colorArray.length;
        var color_list=[];
        for(var i=0;i<colorCount-1;i++){
            var temp=0;
            if(remainder>0){
                temp=1;
            }
            var tempArray=new gradientColor(colorArray[i],colorArray[i+1],step+temp);
            color_list.push.apply(color_list,tempArray);
            remainder--;
        }
        return color_list;
    }
}
/**
 *
 * @param startColor 指定起始颜色
 * @param endColor   指定结束颜色
 * @param step       划分渐变色区域数量
 * @returns {Array}  返回渐变色数组
 */
var  gradientColor = function (startColor, endColor, step) {
    let startRGB = this.colorRgb(startColor);//转换为rgb数组模式
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];

    let endRGB = this.colorRgb(endColor);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];

    let sR = (endR - startR) / step;//总差值
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;

    let colorArr = [];
    for (let i = 0; i < step; i++) {
        //计算每一步的hex值
        // let hex = this.colorHex('rgb('+ parseInt((sR * i + startR))+ ',' + parseInt((sG * i + startG))+ ',' +
        //     parseInt((sB * i + startB)) + ')');
        // colorArr.push(hex);
        let rgb = 'rgb('+ parseInt((sR * i + startR))+ ',' + parseInt((sG * i + startG))+ ',' +
            parseInt((sB * i + startB)) + ')';
        colorArr.push(rgb);
    }
    return colorArr;
};

// 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
gradientColor.prototype.colorRgb = function (sColor) {
    let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            let sColorNew = "#";
            for (let i = 1; i < 4; i += 1) {
                sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        let sColorChange = [];
        for (let i = 1; i < 7; i += 2) {
            sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
        }
        return sColorChange;
    } else {
        return sColor;
    }
};
// 将rgb表示方式转换为hex表示方式
gradientColor.prototype.colorHex = function (rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
        let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        let strHex = "#";
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            hex = hex < 10 ? 0 + '' + hex : hex;// 保证每个rgb的值为2位
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = _this;
        }
        return strHex;
    } else if (reg.test(_this)) {
        let aNum = _this.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return _this;
        } else if (aNum.length === 3) {
            let numHex = "#";
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += (aNum[i] + aNum[i]);
            }
            return numHex;
        }
    } else {
        return _this;
    }
};