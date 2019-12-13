package com.proheng.gis.utils;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "urlconfig")
public class UrlConfig {
    private String baseUrl=""; // 网站的根路径地址
    private String staticUrl=""; // 静态文件的地址
    private String pipeline=""; //管线的坐标数据
    private String pipelineConfig=""; // 管线的配置信息
    private String pipelineTimeData=""; // 管线实时数据
    private String pipelineTimeDataBackups=""; //管线实时数据备用地址
    private String station=""; //站点的坐标数据
    private String stationConfig=""; //站点属性配置
    private String stationTimeData=""; //站点的实时数据
    private String factory=""; //厂区的坐标数据
    private String getUserFreeSetting=""; //获取用户配置信息
    private String setUserFreeSetting=""; //设置用户的配置信息
    private String drawConfig=""; // 颜色段的配置信息
    private String getSimulationValue=""; //获取管线的模拟数据地址
    private String getDbList=""; //获取数据库名称的地址

    @Override
    public String toString(){
        return "";
    }

    public String getBaseUrl() {
        return baseUrl;
    }

    public void setBaseUrl(String baseUrl) {
        this.baseUrl = baseUrl;
    }

    public String getStaticUrl() {
        return staticUrl;
    }

    public void setStaticUrl(String staticUrl) {
        this.staticUrl = staticUrl;
    }

    public String getPipeline() {
        return pipeline;
    }

    public void setPipeline(String pipeline) {
        this.pipeline = pipeline;
    }

    public String getPipelineConfig() {
        return pipelineConfig;
    }

    public void setPipelineConfig(String pipelineConfig) {
        this.pipelineConfig = pipelineConfig;
    }

    public String getPipelineTimeData() {
        return pipelineTimeData;
    }

    public void setPipelineTimeData(String pipelineTimeData) {
        this.pipelineTimeData = pipelineTimeData;
    }

    public String getPipelineTimeDataBackups() {
        return pipelineTimeDataBackups;
    }

    public void setPipelineTimeDataBackups(String pipelineTimeDataBackups) {
        this.pipelineTimeDataBackups = pipelineTimeDataBackups;
    }

    public String getStation() {
        return station;
    }

    public void setStation(String station) {
        this.station = station;
    }

    public String getStationConfig() {
        return stationConfig;
    }

    public void setStationConfig(String stationConfig) {
        this.stationConfig = stationConfig;
    }

    public String getStationTimeData() {
        return stationTimeData;
    }

    public void setStationTimeData(String stationTimeData) {
        this.stationTimeData = stationTimeData;
    }

    public String getFactory() {
        return factory;
    }

    public void setFactory(String factory) {
        this.factory = factory;
    }

    public String getGetUserFreeSetting() {
        return getUserFreeSetting;
    }

    public void setGetUserFreeSetting(String getUserFreeSetting) {
        this.getUserFreeSetting = getUserFreeSetting;
    }

    public String getSetUserFreeSetting() {
        return setUserFreeSetting;
    }

    public void setSetUserFreeSetting(String setUserFreeSetting) {
        this.setUserFreeSetting = setUserFreeSetting;
    }

    public String getDrawConfig() {
        return drawConfig;
    }

    public void setDrawConfig(String drawConfig) {
        this.drawConfig = drawConfig;
    }

    public String getGetSimulationValue() {
        return getSimulationValue;
    }

    public void setGetSimulationValue(String getSimulationValue) {
        this.getSimulationValue = getSimulationValue;
    }

    public String getGetDbList() {
        return getDbList;
    }

    public void setGetDbList(String getDbList) {
        this.getDbList = getDbList;
    }
}
