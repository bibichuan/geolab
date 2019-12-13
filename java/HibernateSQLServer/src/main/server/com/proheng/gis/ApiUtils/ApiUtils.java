package com.proheng.gis.ApiUtils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class ApiUtils {
    private static final Logger loger= LoggerFactory.getLogger(ApiUtils.class);
    //读取文件内容
    public static String readFile(String fileName){
        StringBuilder stringBuilder=new StringBuilder();
        BufferedReader br=null;
        try {
            Resource resource = new ClassPathResource(fileName);
            br= new BufferedReader(new InputStreamReader(resource.getInputStream()));
            String temp = null;
            while ((temp = br.readLine()) != null) {
                stringBuilder.append(temp);
            }
        }catch (Exception e){
            loger.error("ApiUtils.readFile",e);
            return "";
        }finally {
            //关闭文件流
            if ( br != null) {
                try {
                    br.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
        return stringBuilder.toString();
    }
}
