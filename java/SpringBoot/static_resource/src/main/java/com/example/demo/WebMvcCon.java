package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcCon implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
//        registry.addResourceHandler("/**").addResourceLocations("classpath:/META-INF/resources/",
//                "classpath:/resources/static/css/", "/static/css", "/public","/static");

        registry.addResourceHandler("/css/**").addResourceLocations("classpath:/META-INF/resources/").addResourceLocations("classpath:/resources/")
                .addResourceLocations("classpath:/static/css/").addResourceLocations("classpath:/public/");
    }
}
