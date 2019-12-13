package com.proheng.gis.ApiUtils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.regex.Pattern;

public class RGBCal {
    private int colorSize=7; //单色卡的颜色分段
    private int colorType=0; //单色卡的数据类型
    private float maxValue=0.0f; //单色卡的最大值
    private float minValue=0.0f; //单色卡的最小值

    private float reference=0.0f; //两段色卡的参考值
    private JSONArray colorBlock= JSON.parseArray("[{\n" +
            "                \"colorSection\": 5,\n" +
            "                \"colorType\":0,\n" +
            "                \"upperValue\": 300,  //最大值\n" +
            "                \"lowerValue\": 0,   //最小值\n" +
            "                \"rgbColors\":[] //色卡数组\n" +
            "            },{\n" +
            "                \"colorSection\": 6, //颜色分段\n" +
            "                \"colorType\":0,  //使用小数还是整数计算\n" +
            "                \"upperValue\": 0, ///最大值\n" +
            "                \"lowerValue\": -100, //最小值\n" +
            "                \"rgbColors\":[] //色卡数组\n" +
            "            }]"); //多色卡时的颜色数组
    private String[] rgbColors=null; //单色卡时的颜色数组

    private String[] rgbColors21=null; //双色卡时第一段的颜色数组
    private String[] rgbColors22=null; //双色卡时第二段的颜色数组

    private JSONObject currentColorSetting=null;


    public RGBCal(JSONObject currentColorSetting){
        this.currentColorSetting=currentColorSetting;

        JSONArray colorBlock=currentColorSetting.getJSONArray("colorBlock");
        //初始化单色卡
        JSONObject color1=colorBlock.getJSONObject(0);
        this.colorSize=color1.getInteger("colorSection");
        this.colorType=color1.getInteger("colorType");
        this.maxValue=color1.getFloat("upperValue");
        this.minValue=color1.getFloatValue("lowerValue");
        this.initSingleColor(this.colorSize,this.colorType,this.maxValue,this.minValue);
        //初始化双色卡
        if(colorBlock.size()>1){
            this.initDoubleColor(colorBlock);
        }
    }
    // 初始化单色色卡
    private void initSingleColor(int colorSize,int colorType,float maxValue,float minValue){
        this.colorSize=colorSize;
        this.colorType=colorType;

        this.maxValue=maxValue;
        this.minValue=minValue;

        //执行初始化
        this.rgbColors=this.getRGBColorsNew(this.colorSize);
    }
    // 初始化两段色卡
    public void initDoubleColor(JSONArray colorBlock){
        if(colorBlock!=null){
            this.colorBlock= colorBlock;
        }

        //计算基准值
        JSONObject colorSection1=this.colorBlock.getObject(0,JSONObject.class);
        JSONObject colorSection2=this.colorBlock.getObject(1,JSONObject.class);
        float upper=colorSection1.getFloat("upperValue");
        float lower=colorSection2.getFloat("lowerValue");
        if(lower>=upper){
            this.reference=upper;
        }else {
            this.reference=(upper+lower)/2;
        }

        //分段计算色卡
        List<String> color1=this.getRainbowColor2_own(Integer.valueOf(colorSection1.getString("colorSection")));

        //保存第一段的颜色数组
        this.rgbColors21=color1.toArray(new String[color1.size()]);

        colorSection1.put("rgbColors",JSON.toJSONString(color1));
        color1=this.getRainbowColor2_two(Integer.valueOf(colorSection2.getString("colorSection")));
        //保存第二段的颜色数组
        this.rgbColors22=color1.toArray(new String[color1.size()]);

        colorSection2.put("rgbColors",JSON.toJSONString(color1));
    }
    //获取当前值对应的色卡值
    public String getCurrentColor(float currentVal){
        // 判断当前设置是单色卡还是双色卡，然后调用对应的获取颜色值的函数获取颜色值
        String rgb="";
        if(currentColorSetting!=null){
            JSONArray colorBlock=currentColorSetting.getJSONArray("colorBlock");
            if(colorBlock.size()>1&&colorBlock.getObject(1,JSONObject.class).getInteger("colorSection")>0
                    &&currentColorSetting.getInteger("colorPiece")==2){
                //双色卡
                rgb=this.getCurrentColor2(currentVal);
            }else { //绘制单色卡
                rgb=this.getCurrentColor1(currentVal);
            }
        }else {
            // 单色卡
            rgb=this.getCurrentColor1(currentVal);
        }
        return rgb;
    }

    //获取一段色卡时当前数据对应RGB
    private String getCurrentColor1(float currentVal) {
        float maxValue=this.maxValue;
        float minValue=this.minValue;
        int colorLineType=this.colorType;
        if (currentVal - minValue <= 0) {
            return this.rgbColors[0];
        }
        int colorSize=this.colorSize;
        if (currentVal - maxValue >= 0) {
            return this.rgbColors[colorSize - 1];
        }

        float itemVal = (maxValue - minValue) / (colorSize - 2);
        int indexVal = (int)Math.floor((currentVal - minValue) / itemVal) + 1;

        return this.rgbColors[indexVal];
    }
    // 修改颜色分段、颜色类型、最大最小值
    public void setColorConfig(int colorSize,int colorType,float maxValue,float minValue){
        this.colorSize=colorSize;
        this.colorType=colorType;
        this.maxValue=maxValue;
        this.minValue=minValue;
        //重新计算色卡
        this.rgbColors=this.getRGBColorsNew(this.colorSize);
    }


    //获取双色卡时当前数据对应的RGB值
    private String getCurrentColor2(float currentVal) {
        //首先和基准值比较，确定落在哪个色卡内
        JSONObject colorblock=null;
        int colorLineType=0;
        String[] rgbColors=null;
        if(currentVal>=this.reference){ //落在第一个色卡内
            colorblock=this.colorBlock.getObject(0,JSONObject.class);
            rgbColors=this.rgbColors21;
        }else {  //否则落在第二个色卡内
            colorblock=this.colorBlock.getObject(1,JSONObject.class);
            rgbColors=this.rgbColors22;
        }
        // 设置计算方式

        float maxValue=colorblock.getFloat("upperValue");
        float minValue=colorblock.getFloat("lowerValue");
        if (currentVal - minValue <= 0) {
            return rgbColors[0];
        }
        int colorSize=colorblock.getInteger("colorSection");
        if (currentVal - maxValue >= 0) {
            return rgbColors[colorSize - 1];
        }
        int indexVal=0;

        float itemVal = (maxValue - minValue) / (colorSize - 2);
        indexVal = (int)Math.floor((currentVal - minValue) / itemVal) + 1;

        return rgbColors[indexVal];
    }

    // 一段色卡时获取颜色数组
    private String[] getRGBColorsNew(int colorSize) {
        List<String> colors = new ArrayList<>(colorSize);
        for (int i = 0; i < colorSize; i++) {
            double r = 0;
            double g = 0;
            double b = 0;
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
            colors.add("rgb(" + r + "," + g + ","+ b + ")");
        }
        Collections.reverse(colors);
        return colors.toArray(new String[colors.size()]);
    }


    // 两段色卡
    // 渐变色第一段，从绿色到红色
    private List<String> getRainbowColor2_own(int colorSize){
        List<String> color_list=new ArrayList<>(colorSize);
        if(colorSize<5){
            switch (colorSize) {
                case 1:
                    color_list.add("rgb(255，0，0)");
                    break;
                case 2:
                    color_list.add("rgb(255，0，0)");
                    color_list.add("rgb(255, 125, 0)");
                    break;
                case 3:
                    color_list.add("rgb(255，0，0)");
                    color_list.add("rgb(255, 125, 0)");
                    color_list.add("rgb(255，255，0)");
                    break;
                case 4:
                    color_list.add("rgb(255，0，0)");
                    color_list.add("rgb(255, 125, 0)");
                    color_list.add("rgb(255，255，0)");
                    color_list.add("rgb(0，255，0)");
                    break;
            }
        }else {
            int subColorSieze=(int) Math.floor(colorSize/4);
            int subRemainder=colorSize%4;
            String[] color=new String[]{"#FF0000","#FF7D00","#FFFF00","#00FF00","#00FFFF"};
            color_list=this.getSubColor(color,subColorSieze,subRemainder);
        }
        //反转数组
        Collections.reverse(color_list);
        return color_list;
    }
    // 渐变色第二段，从青色到紫色
    private List<String> getRainbowColor2_two(int colorSize){
        List<String> color_list=new ArrayList<>(colorSize);
        if(colorSize<4){
            switch (colorSize) {
                case 1:
                    color_list.add("rgb(0, 255, 255)");
                    break;
                case 2:
                    color_list.add("rgb(0, 255, 255)");
                    color_list.add("rgb(0，0，255)");
                    break;
                case 3:
                    color_list.add("rgb(0, 255, 255)");
                    color_list.add("rgb(0，0，255)");
                    color_list.add("rgb(255, 0, 255)");
                    break;
            }
        }else {
            int subColorSieze=(int)Math.floor(colorSize/2);
            int subRemainder=colorSize%2;
            String[] color=new String[]{"#00FFFF","#0000FF","#FF00FF"};
            color_list=this.getSubColor(color,subColorSieze,subRemainder);
        }
        Collections.reverse(color_list);
        return color_list;
    }
    // 获取两段色卡的子数组
    private List<String> getSubColor(String[] colorArray,int step,int remainder){
        int colorCount=colorArray.length;
        List<String> color_list=new ArrayList<>(colorCount);
        for(int i=0;i<colorCount-1;i++){
            int temp=0;
            if(remainder>0){
                temp=1;
            }
            String[] tempArray=this.gradientColor(colorArray[i],colorArray[i+1],step+temp);
            color_list.addAll(Arrays.asList(tempArray));
            remainder--;
        }
        return color_list;
    }
    /**
     *
     * @param startColor 指定起始颜色
     * @param endColor   指定结束颜色
     * @param step       划分渐变色区域数量
     * @returns {Array}  返回渐变色数组
     */
    private String[] gradientColor(String startColor, String endColor, int step) {
        Integer[] startRGB = this.colorRgb(startColor);//转换为rgb数组模式
        int startR = startRGB[0];
        int startG = startRGB[1];
        int startB = startRGB[2];

        Integer[] endRGB = this.colorRgb(endColor);
        int endR = endRGB[0];
        int endG = endRGB[1];
        int endB = endRGB[2];

        float sR = (endR - startR) / step;//总差值
        float sG = (endG - startG) / step;
        float sB = (endB - startB) / step;

        List<String> colorArr = new ArrayList<>();
        for (int i = 0; i < step; i++) {
            //计算每一步的rgb值
            String rgb = "rgb("+ (int)(sR * i + startR)+ ',' + (int)((sG * i + startG))+ ',' +
                    (int)((sB * i + startB)) + ')';
            colorArr.add(rgb);
        }
        return colorArr.toArray(new String[colorArr.size()]);
    }
    // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
    private Integer[] colorRgb (String sColor) {
        String reg = "^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$";
        sColor = sColor.toLowerCase();
        if (sColor!=null && Pattern.matches(reg,sColor)) {
            if (sColor.length() == 4) {
                String sColorNew = "#";
                for (int i = 1; i < 4; i += 1) {
                    sColorNew += sColor.substring(i, i + 1).concat(sColor.substring(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            List<Integer> sColorChange = new ArrayList<>();
            for (int i = 1; i < 7; i += 2) {
                sColorChange.add(Integer.parseInt(sColor.substring(i, i + 2),16));
            }
            return sColorChange.toArray(new Integer[sColorChange.size()]);
        } else {
            return new Integer[3];
        }
    }
}
