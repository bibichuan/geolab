package com.proheng.gis.utils;

public class ApiResult {
    private Integer status=200;
    private String message="";
    private Object content=null;

    public ApiResult(int status,String message,Object content){
        this.status=status;
        this.message=message;
        this.content=content;
    }
    public ApiResult(int status,String message){
        this.status=status;
        this.message=message;
    }
    public ApiResult(int status,Object content){
        this.status=status;
        this.content=content;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getContent() {
        return content;
    }

    public void setContent(Object content) {
        this.content = content;
    }
}
