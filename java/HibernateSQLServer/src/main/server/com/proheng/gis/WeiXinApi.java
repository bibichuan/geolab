package com.proheng.gis;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.proheng.gis.utils.HttpClientUtils;
import com.proheng.gis.utils.RedisUtils;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/*
*  微信开发Api
* */
@RestController
@RequestMapping("weixinapi")
public class WeiXinApi {
    private final Logger logger= LoggerFactory.getLogger(WeiXinApi.class);

    @Value("${weixin.app_secret}")
    private String app_secret;
    @Value("${weixin.app_id}")
    private String app_id;

    @Autowired
    private RedisUtils redisUtils;

    //获取 access_token
    private String getAccess_token(){
        String access_token="";
        int expires_in=0;
        String url="https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid="+app_id+"&secret="+app_secret;
        try {
            String result= HttpClientUtils.sendHttpGet(url);
            JSONObject resultObj= JSON.parseObject(result);
            if(resultObj.getString("errcode")!=null){
                throw new Exception("获取access_token失败，"+result);
            }else {
                access_token=resultObj.getString("access_token");
                expires_in=resultObj.getInteger("expires_in");
                redisUtils.set("access_token",access_token,expires_in);
            }
        }catch (Exception e){
            logger.error("getAccess_token",e);
        }
        return access_token;
    }
    //获取 jsapi_ticket
    private String getJsapi_ticket(){
        String jsapi_ticket="";
        //获取 access_token,假定一定会获取到正确的acces_token
        String access_token=redisUtils.get("access_token");
        if(access_token==null){
            access_token=getAccess_token();
        }
        String url="https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+access_token+"&type=jsapi";
        try{
            String result=HttpClientUtils.sendHttpGet(url);
            JSONObject resultObj=JSON.parseObject(result);

            if(resultObj.getInteger("errcode")==0){ //jsapi_ticket获取成功
                jsapi_ticket=resultObj.getString("ticket");
                int expires_in=resultObj.getInteger("expires_in");
                redisUtils.set("jsapi_ticket",jsapi_ticket,expires_in);
            }else {
                throw new Exception("获取jsapi_ticket失败，"+result);
            }
        }catch (Exception e){
            logger.error("getJsapi_ticket",e);
        }
        return jsapi_ticket;
    }
    // 签名算法
    private String signature(){
        String signature="";


        return signature;
    }

    //返回前台签名信息
    @RequestMapping("getJsSDK")
    public JSONObject getJsSDK(HttpServletRequest request){
        JSONObject resultObj=new JSONObject();
        try {
            // 随机字符串
            String noncestr= RandomStringUtils.randomAlphanumeric(16);
            // 时间戳获取到秒数
            String timestamp=String.valueOf(System.currentTimeMillis()/1000);
            //jsapi_ticket
            String jsapi_ticket=redisUtils.get("jsapi_ticket");
            if(jsapi_ticket==null){
                jsapi_ticket=getJsapi_ticket();
            }
            // 当前请求url
            String url = request.getHeader("Referer");
            // 如果是直接输入的地址，或者不是从本网站访问的重定向到本网站的首页
            if (url == null) {
                url=request.getRequestURL().toString();
            }

            // 构造签名字符串
            String string1="jsapi_ticket="+jsapi_ticket+"&noncestr="+noncestr+"&timestamp="+timestamp+"&url="+url;

            String signatureStr= DigestUtils.sha1Hex(string1);

            resultObj.put("signature",signatureStr);
            resultObj.put("nonceStr",noncestr);
            resultObj.put("timestamp",timestamp);

        }catch (Exception e){
            logger.error("getJsSDK",e);
        }
        return resultObj;
    }

}
