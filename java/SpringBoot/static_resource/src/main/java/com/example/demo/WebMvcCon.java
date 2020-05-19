package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcCon implements WebMvcConfigurer {

  @Override
    public void addCorsMappings(CorsRegistry registry) {
//       registry.addMapping("/**")
//                .allowedOrigins("*")
//                .allowCredentials(true)
//                .allowedMethods("GET", "POST", "DELETE", "PUT","PATCH")
//                .maxAge(3600);
//        registry.addMapping("/**").allowCredentials(true);

    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        //registry.addResourceHandler("/upload/**").addResourceLocations("classpath:/upload/");
//        registry.addResourceHandler("/upload/**").addResourceLocations("file:"+uploadImgUrl+"/");
//        registry.addResourceHandler("/upload/**").addResourceLocations("file:"+signatureImgUrl+"/");
//
        registry.addResourceHandler("/css/**").addResourceLocations("classpath:/META-INF/resources/", "classpath:/static/css", "/static/css", "/public");
//
//        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
    }
}
