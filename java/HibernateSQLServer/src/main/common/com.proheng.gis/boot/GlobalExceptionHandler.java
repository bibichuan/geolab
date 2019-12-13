package com.proheng.gis.boot;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private final Logger logger= LoggerFactory.getLogger(GlobalExceptionHandler.class);
    /**
     * @author zlc
     * @date 2019-09-12
     * @param e     异常
     * @description 处理所有不可知的异常
     */
    @ExceptionHandler({Exception.class})    //申明捕获那个异常类
//    @ResponseStatus(HttpStatus)
    public String globalExceptionHandler(Exception e) {
        logger.error("全局错误",e);
        return "服务器错误";
    }
    // 路由不存在的异常
    @ExceptionHandler({NoHandlerFoundException.class})
    @ResponseBody
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public String noHandlerFoundException(Exception e) {
        logger.error("路由不存在");
        return "路由不存在";
    }
}
